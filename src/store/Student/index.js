import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  getStudent: ["studentID"],
  getStudentSuccess: ["student"],
  getStudentFailure: ["error"],
  
  getStudentCourses: ["studentID"],
  getStudentCoursesSuccess: ["studentCourses"],
  getStudentCoursesFailure: ["error"],

  getStudentDocuments: ["studentID"],
  getStudentDocumentsSuccess: ["studentDocuments"],
  getStudentDocumentsFailure: ["error"],

  getStudentPayments: ["studentID"],
  getStudentPaymentsSuccess: ["studentPayments"],
  getStudentPaymentsFailure: ["error"],

  getStudentFinishedExams: ["studentID"],
  getStudentFinishedExamsSuccess: ["studentFinishedExams"],
  getStudentFinishedExamsFailure: ["error"],

  getStudentProcessingExams: ["studentID"],
  getStudentProcessingExamsSuccess: ["studentProcessingExams"],
  getStudentProcessingExamsFailure: ["error"],

  getStudentUpcomingExams: ["studentID"],
  getStudentUpcomingExamsSuccess: ["studentUpcomingExams"],
  getStudentUpcomingExamsFailure: ["error"],

  getAllStudents: null,
  getAllStudentsSuccess: ["allStudents"],
  getAllStudentsFailure: ["error"],

  deleteStudent: ["studentID"],
  deleteStudentSuccess: ["studentID"],
  deleteStudentFailure: ["error"],

  editStudent: ["student"],
  editStudentSuccess: ["student"],
  editStudentFailure: ["error"],

  addStudent: ["username", "password", "cardNumber", "firstName", "lastName"],
  addStudentSuccess: ["student"],
  addStudentFailure: ["error"],

  removeError: null,
})

export { Types }
export { Creators }
