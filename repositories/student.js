import Student from "../models/studentModel.js";

//GET ALL STUDENT

const getAllStudent = async () => {
    try {
    const students = await Student.find();
      if (!students) {
        return null; 
      }
      return students;
    } catch (error) {
      console.error(error);
      throw new Error("Get all students failed");
    }
  };

//GET STUDENT BY ID

const getStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student; 
  } catch (error) {
    console.error(error);
    throw new Error("Get student by ID failed");
  }
};
const getStudentByEmail = async (email) => {
    try {
      const existingStudent = await Student.findOne({ email });
      return existingStudent;
    } catch (error) {
      console.error(error);
      throw new Error("Get student by email failed");
    }
  };

  //CREATE NEW STUDENT
  
  const createStudent = async (studentData) => {
    try {
      const newStudent = new Student(studentData);
      await newStudent.save();
      return newStudent;
    } catch (error) {
      console.error(error);
      throw new Error("Create student failed");
    }
  };

//DELETE STUDENT

  const deleteStudent = async (id) => {
    try {
      const deletedStudent = await Student.findOneAndDelete({ _id: id });
  
      if (!deletedStudent) {
        return null; 
      }
      return deletedStudent;
    } catch (error) {
      console.error(error);
      throw new Error("Delete student failed");
    }
  };


  export default {
    getAllStudent,
    getStudentById,
    createStudent,
    getStudentByEmail,
    deleteStudent
}