import { validationResult } from "express-validator";
import { studentRepository } from "../repositories/index.js";

//GET ALL

const getAllStudents = async (req, res) => {
  try {
    const students = await studentRepository.getAllStudent(); 
    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }
    return res.status(200).json({ message: 'List all students:', data: students });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//GET BY ID

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await studentRepository.getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json({ message: 'Get student detail successfully:', data: student });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//CREATE NEW STUDENT

const createStudent = async (req, res) => {
    try {
      const { name, email, language, gender, phoneNumber, address } = req.body;
      const existingStudent = await studentRepository.getStudentByEmail(email);
      if (existingStudent) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const newStudent = await studentRepository.createStudent({
        name,
        email,
        language,
        gender,
        phoneNumber,
        address,
      });
      return res.status(201).json({ message: 'Student created', data: newStudent });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

//DELETE BY ID

  const deleteStudent = async (req, res) => {
    try {
      const studentId = req.params.id;
      const deletedStudent = await studentRepository.deleteStudent(studentId);
  
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  
export default { 
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent
};
