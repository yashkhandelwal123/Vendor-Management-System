import dbConnect from '@/lib/dbConnect';
import { PurchaseOrderModel } from '@/models/Vendor';
import { VendorModel } from '@/models/Vendor';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { poId: string } }) {
  await dbConnect();

  try {
    const { poId } = params;

    if (!ObjectId.isValid(poId)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid purchase order ID',
      }), { status: 400 });
    }

    const purchaseOrder = await PurchaseOrderModel.findById(poId).populate('vendor');

    if (!purchaseOrder) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Purchase order not found',
      }), { status: 404 });
    }

    return new Response(JSON.stringify({
      success: true,
      purchaseOrder,
    }), { status: 200 });
  } catch (error) {
    console.error('Error retrieving purchase order:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error retrieving purchase order',
    }), { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { poId: string } }) {
  await dbConnect();

  try {
    const { poId } = params;
    const data = await request.json();

    if (!ObjectId.isValid(poId)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid purchase order ID',
      }), { status: 400 });
    }

    if (data.vendor && !(await VendorModel.findById(data.vendor))) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid vendor reference',
      }), { status: 400 });
    }

    const updatedPurchaseOrder = await PurchaseOrderModel.findByIdAndUpdate(poId, data,
        { 
        new: true,
        runValidators: true
        }
    ).populate('vendor');

    if (!updatedPurchaseOrder) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Purchase order not found',
      }), { status: 404 });
    }

    return new Response(JSON.stringify({
      success: true,
      purchaseOrder: updatedPurchaseOrder,
    }), { status: 200 });
  } catch (error) {
    console.error('Error updating purchase order:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error updating purchase order',
    }), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { poId: string } }) {
    await dbConnect();
  
    try {
      const poId = params.poId;
  
    //   if (!ObjectId.isValid(poId)) {
    //     return new Response(JSON.stringify({
    //       success: false,
    //       message: 'Invalid Purchase Order ID',
    //     }), { status: 400 });
    //   }
  
      const deletedPurchaseOrder = await PurchaseOrderModel.findByIdAndDelete(poId);
  
      if (!deletedPurchaseOrder) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Purchase Order not found',
        }), { status: 404 });
      }
  
      return new Response(JSON.stringify({
        success: true,
        message: 'Purchase Order deleted successfully',
      }), { status: 200 });
    } catch (error) {
      console.error('Error deleting purchase order:', error);
      return new Response(JSON.stringify({
        success: false,
        message: 'Error deleting purchase order',
      }), { status: 500 });
    }
  }
