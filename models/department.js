import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  slug:{ type : String}
}, { timestamps: true });

const Department = mongoose.models.departments || mongoose.model('departments', DepartmentSchema);

export default Department;
