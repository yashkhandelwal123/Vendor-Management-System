import dbConnect from '@/lib/dbConnect';
import { v4 as uuidv4 } from 'uuid';
import { VendorModel } from '@/models/Vendor';
import { ObjectId } from 'mongodb';
export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();
    const { name, contactDetails, address } = data;

    if (!name || !contactDetails || !address) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing required fields: name, contactDetails, or address',
      }), { status: 400 });
    }

    
    const vendorCode = uuidv4();
    const onTimeDeliveryRate = 100; 
    const qualityRatingAvg = 5;
    const averageResponseTime = 0; 
    const fulfillmentRate = 100;

    const newVendor = new VendorModel({
      name,
      contactDetails,
      address,
      vendorCode,
      onTimeDeliveryRate,
      qualityRatingAvg,
      averageResponseTime,
      fulfillmentRate
    });
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

