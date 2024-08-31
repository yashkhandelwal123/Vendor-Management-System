import dbConnect from '@/lib/dbConnect';
import { PurchaseOrderModel, PurchaseOrder } from '@/models/Vendor';
import { VendorModel } from '@/models/Vendor';
import { ObjectId } from 'mongodb';

interface PurchaseOrderWithPromisedDate extends PurchaseOrder {
  promisedDate: Date;
  fulfilled: boolean;
}

export async function GET(request: Request) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const vendorId = url.searchParams.get('vendor');

    if (!vendorId || !ObjectId.isValid(vendorId)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid vendor ID',
      }), { status: 400 });
    }

    const vendor = await VendorModel.findById(vendorId);
    if (!vendor) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Vendor not found',
      }), { status: 404 });
    }

    const purchaseOrders: PurchaseOrderWithPromisedDate[] = await PurchaseOrderModel.find({ vendor: vendorId });
    
    if (purchaseOrders.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        metrics: {
          onTimeDeliveryRate: 0,
          qualityRatingAverage: 0,
          averageResponseTime: 0,
          fulfillmentRate: 0,
        },
      }), { status: 200 });
    }
    
    const totalOrders = purchaseOrders.length;
    let onTimeDeliveries = 0;
    let totalQualityRating = 0;
    let totalResponseTime = 0;
    let fulfilledOrders = 0;
    
    purchaseOrders.forEach((order: PurchaseOrderWithPromisedDate) => {
      if (order.deliveryDate <= order.promisedDate) onTimeDeliveries++;
      if (order.qualityRating) totalQualityRating += order.qualityRating;
      if (typeof order.acknowledgmentDate === 'string' && typeof order.orderDate === 'string') {
        totalResponseTime += Number(((new Date(order.acknowledgmentDate) as any) - (new Date(order.orderDate) as any)) / (1000 * 60 * 60)); // in hours
      }
      if (order.fulfilled) fulfilledOrders++;
    });

    const onTimeDeliveryRate = (onTimeDeliveries / totalOrders) * 100;
    const qualityRatingAverage = totalQualityRating / totalOrders;
    const averageResponseTime = totalResponseTime / totalOrders;
    const fulfillmentRate = (fulfilledOrders / totalOrders) * 100;

    return new Response(JSON.stringify({
      success: true,
      metrics: {
        onTimeDeliveryRate,
        qualityRatingAverage,
        averageResponseTime,
        fulfillmentRate,
      },
    }), { status: 200 });
  } catch (error) {
    console.error('Error retrieving vendor performance metrics:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error retrieving vendor performance metrics',
    }), { status: 500 });
  }
}


export async function POST(request: Request) {
    await dbConnect();
  
    try {
      const url = new URL(request.url);
      const poId = url.pathname.split('/').pop(); // Extract PO ID from URL
      const { acknowledgmentDate } = await request.json();
  
      if (!poId || !ObjectId.isValid(poId)) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Invalid purchase order ID',
        }), { status: 400 });
      }
  
      const purchaseOrder = await PurchaseOrderModel.findById(poId);
      if (!purchaseOrder) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Purchase order not found',
        }), { status: 404 });
      }
  
      purchaseOrder.acknowledgmentDate = acknowledgmentDate;
      await purchaseOrder.save();
      const vendor = await VendorModel.findById(purchaseOrder.vendor);
      if (vendor) {
        const purchaseOrders = await PurchaseOrderModel.find({ vendor: vendor._id });
        let totalResponseTime = 0;
        let totalOrders = 0;
  
        purchaseOrders.forEach(order => {
          if (order.acknowledgmentDate && order.orderDate) {
            totalResponseTime += ((new Date(order.acknowledgmentDate) as any) - (new Date(order.orderDate) as any)) / (1000 * 60 * 60); // in hours
            totalOrders++;
          }
        });
  
        const averageResponseTime = totalOrders ? totalResponseTime / totalOrders : 0;
        vendor.averageResponseTime = averageResponseTime;
        await vendor.save();
      }
  
      return new Response(JSON.stringify({
        success: true,
        message: 'Acknowledgment date updated successfully',
      }), { status: 200 });
    } catch (error) {
      console.error('Error updating acknowledgment date:', error);
      return new Response(JSON.stringify({
        success: false,
        message: 'Error updating acknowledgment date',
      }), { status: 500 });
    }
  }