import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  userEmail: { type: String, required: true }, 
  projectAim: { type: String, required: true },
  departments: [{ type: String, required: true }],
  projectAbstract: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  pdf: { type: String },
  githubLink: { type: String },
  videoLink: { type: String },
  images: [{ type: String }],
  userImage: { type: String }, 
  name:{type:String},
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
