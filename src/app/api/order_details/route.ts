import dbConnect from '@/lib/dbConnect';
import { PurchaseOrderModel } from '@/models/Vendor';
import { VendorModel } from '@/models/Vendor';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();

    // Validate the vendor reference
    const vendorExists = await VendorModel.findById(data.vendor);
    if (!vendorExists) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Vendor not found',
      }), { status: 404 });
    }

    const newPurchaseOrder = new PurchaseOrderModel(data);
    await newPurchaseOrder.save();

    return new Response(JSON.stringify({
      success: true,
      purchaseOrder: newPurchaseOrder,
    }), { status: 201 });
  } catch (error) {
    console.error('Error creating purchase order:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error creating purchase order',
    }), { status: 500 });
  }
}


export async function GET(request: Request) {
    await dbConnect();
  
    try {
      const url = new URL(request.url);
      const vendorId = url.searchParams.get('vendor');
  
      let query = {};
      if (vendorId) {
        query = { vendor: vendorId };
      }
  
      const purchaseOrders = await PurchaseOrderModel.find(query).populate('vendor');
      return new Response(JSON.stringify({
        success: true,
        purchaseOrders,
      }), { status: 200 });
    } catch (error) {
      console.error('Error listing purchase orders:', error);
      return new Response(JSON.stringify({
        success: false,
        message: 'Error listing purchase orders',
      }), { status: 500 });
    }
  }