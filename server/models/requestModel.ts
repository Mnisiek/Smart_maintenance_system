import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  tenantId: { type: String, required: true },
  message: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  analyzedFactors: { type: Object },
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

export default mongoose.model('Request', RequestSchema);
