import dbConnect from '@/lib/dbConnect';
import { VendorModel } from '@/models/Vendor';
import { ObjectId } from 'mongodb';
export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();

    const newVendor = new VendorModel(data);
    await newVendor.save();

    return new Response(JSON.stringify({
      success: true,
      vendor: newVendor,
    }), { status: 201 });
  } catch (error) {
    console.error('Error creating vendor:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error creating vendor',
    }), { status: 500 });
  }
}

export async function GET(request: Request) {
  await dbConnect();

  try {
    const vendors = await VendorModel.find({});
    return new Response(JSON.stringify({
      success: true,
      vendors,
    }), { status: 200 });
  } catch (error) {
    console.error('Error listing vendors:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error listing vendors',
    }), { status: 500 });
  }
}
// export async function GET(request: Request, { params }: { params: { vendorId: string } }) {
//   await dbConnect();

//   try {
//     const vendorId = params.vendorId;

//     if (!ObjectId.isValid(vendorId)) {
//       return new Response(JSON.stringify({
//         success: false,
//         message: 'Invalid vendor ID',
//       }), { status: 400 });
//     }

//     const vendor = await VendorModel.findById(vendorId);

//     if (!vendor) {
//       return new Response(JSON.stringify({
//         success: false,
//         message: 'Vendor not found',
//       }), { status: 404 });
//     }

//     return new Response(JSON.stringify({
//       success: true,
//       vendor,
//     }), { status: 200 });
//   } catch (error) {
//     console.error('Error retrieving vendor:', error);
//     return new Response(JSON.stringify({
//       success: false,
//       message: 'Error retrieving vendor',
//     }), { status: 500 });
//   }
// }
