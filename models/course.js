import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Course = mongoose.model("Course", courseSchema);

export default Course;
