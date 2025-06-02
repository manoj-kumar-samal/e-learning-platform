import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  certificateNumber: {
    type: String,
    required: true,
    unique: true
  },
  pdfUrl: {
    type: String,
    required: true
  }
});

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;