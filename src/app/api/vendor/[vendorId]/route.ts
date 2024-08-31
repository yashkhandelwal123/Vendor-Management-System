import dbConnect from '@/lib/dbConnect';
import { VendorModel } from '@/models/Vendor';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { vendorId: string } }) {
  await dbConnect();

  try {
    const vendorId = params.vendorId;

    if (!ObjectId.isValid(vendorId)) {
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

    return new Response(JSON.stringify({
      success: true,
      vendor,
    }), { status: 200 });
  } catch (error) {
    console.error('Error retrieving vendor:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error retrieving vendor',
    }), { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { vendorId: string } }) {
    await dbConnect();
  
    try {
      const vendorId = params.vendorId;
  
      if (!ObjectId.isValid(vendorId)) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Invalid vendor ID',
        }), { status: 400 });
      }
  
      const data = await request.json();
      const updatedVendor = await VendorModel.findByIdAndUpdate(vendorId, data, { new: true });
  
      if (!updatedVendor) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Vendor not found',
        }), { status: 404 });
      }
  
      return new Response(JSON.stringify({
        success: true,
        vendor: updatedVendor,
      }), { status: 200 });
    } catch (error) {
      console.error('Error updating vendor:', error);
      return new Response(JSON.stringify({
        success: false,
        message: 'Error updating vendor',
      }), { status: 500 });
    }
  }

  export async function DELETE(request: Request, { params }: { params: { vendorId: string } }) {
    await dbConnect();
  
    try {
      const vendorId = params.vendorId;
  
      if (!ObjectId.isValid(vendorId)) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Invalid vendor ID',
        }), { status: 400 });
      }
  
      const deletedVendor = await VendorModel.findByIdAndDelete(vendorId);
  
      if (!deletedVendor) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Vendor not found',
        }), { status: 404 });
      }
  
      return new Response(JSON.stringify({
        success: true,
        message: 'Vendor deleted successfully',
      }), { status: 200 });
    } catch (error) {
      console.error('Error deleting vendor:', error);
      return new Response(JSON.stringify({
        success: false,
        message: 'Error deleting vendor',
      }), { status: 500 });
    }
  }
