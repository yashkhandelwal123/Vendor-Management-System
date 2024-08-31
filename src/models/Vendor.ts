import mongoose, { Schema, Document } from 'mongoose';

// Vendor Model
export interface Vendor extends Document {
  name: string;
  contactDetails: string;
  address: string;
  vendorCode: string;
  onTimeDeliveryRate: number;
  qualityRatingAvg: number;
  averageResponseTime: number;
  fulfillmentRate: number;
}

const VendorSchema: Schema<Vendor> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactDetails: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  vendorCode: {
    type: String,
    required: true,
    unique: true,
  },
  onTimeDeliveryRate: {
    type: Number,
    required: true,
    default: 0,
  },
  qualityRatingAvg: {
    type: Number,
    required: true,
    default: 0,
  },
  averageResponseTime: {
    type: Number,
    required: true,
    default: 0,
  },
  fulfillmentRate: {
    type: Number,
    required: true,
    default: 0,
  },
});

const VendorModel =
  (mongoose.models.Vendor as mongoose.Model<Vendor>) ||
  mongoose.model<Vendor>('Vendor', VendorSchema);

// Purchase Order (PO) Model
export interface PurchaseOrder extends Document {
  poNumber: string;
  vendor: mongoose.Types.ObjectId; // Reference to Vendor model
  orderDate: Date;
  deliveryDate: Date;
  items: { name: string; quantity: number }[];
  quantity: number;
  status: string;
  qualityRating?: number;
  issueDate: Date;
  acknowledgmentDate?: Date;
}

const PurchaseOrderSchema: Schema<PurchaseOrder> = new mongoose.Schema({
  poNumber: {
    type: String,
    required: true,
    unique: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  items: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'canceled'],
  },
  qualityRating: {
    type: Number,
    default: null,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  acknowledgmentDate: {
    type: Date,
    default: null,
  },
});

const PurchaseOrderModel =
  (mongoose.models.PurchaseOrder as mongoose.Model<PurchaseOrder>) ||
  mongoose.model<PurchaseOrder>('PurchaseOrder', PurchaseOrderSchema);

// Historical Performance Model
export interface HistoricalPerformance extends Document {
  vendor: mongoose.Types.ObjectId; // Reference to Vendor model
  date: Date;
  onTimeDeliveryRate: number;
  qualityRatingAvg: number;
  averageResponseTime: number;
  fulfillmentRate: number;
}

const HistoricalPerformanceSchema: Schema<HistoricalPerformance> = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  onTimeDeliveryRate: {
    type: Number,
    required: true,
  },
  qualityRatingAvg: {
    type: Number,
    required: true,
  },
  averageResponseTime: {
    type: Number,
    required: true,
  },
  fulfillmentRate: {
    type: Number,
    required: true,
  },
});

const HistoricalPerformanceModel =
  (mongoose.models.HistoricalPerformance as mongoose.Model<HistoricalPerformance>) ||
  mongoose.model<HistoricalPerformance>('HistoricalPerformance', HistoricalPerformanceSchema);

export { VendorModel, PurchaseOrderModel, HistoricalPerformanceModel };
