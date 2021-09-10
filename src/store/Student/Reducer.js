/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { Types as StudentTypes } from "./index"

const { 
  ADD_STUDENT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  DELETE_STUDENT,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  EDIT_STUDENT,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE,
  GET_STUDENT,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAILURE,
  GET_STUDENT_COURSES,
  GET_STUDENT_COURSES_SUCCESS,
  GET_STUDENT_COURSES_FAILURE,
  GET_STUDENT_DOCUMENTS,
  GET_STUDENT_DOCUMENTS_SUCCESS,
  GET_STUDENT_DOCUMENTS_FAILURE,
  GET_STUDENT_PAYMENTS,
  GET_STUDENT_PAYMENTS_SUCCESS,
  GET_STUDENT_PAYMENTS_FAILURE,
  GET_STUDENT_FINISHED_EXAMS,
  GET_STUDENT_FINISHED_EXAMS_SUCCESS,
  GET_STUDENT_FINISHED_EXAMS_FAILURE,
  GET_STUDENT_PROCESSING_EXAMS,
  GET_STUDENT_PROCESSING_EXAMS_SUCCESS,
  GET_STUDENT_PROCESSING_EXAMS_FAILURE,
  GET_STUDENT_UPCOMING_EXAMS,
  GET_STUDENT_UPCOMING_EXAMS_SUCCESS,
  GET_STUDENT_UPCOMING_EXAMS_FAILURE,
  GET_ALL_STUDENTS,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_STUDENTS_FAILURE,
  REMOVE_ERROR,
} = StudentTypes

const initialState = {
  loading: false,
  error: null,
  student: null,
  studentCourses: [],
  studentDocuments: [],
  studentPayments: [],
  studentFinishedExams: [],
  studentProcessingExams: [],
  studentUpcomingExams: [],
  allStudents: [],
}

const getStudent = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getStudentSuccess = (state, { student }) => ({
  ...state,
  loading: false,
  error: null,
  student,
})
const getStudentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  student: null,
  error
})

const getStudentCourses = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getStudentCoursesSuccess = (state, { studentCourses }) => ({
  ...state,
  loading: false,
  error: null,
  studentCourses,
})
const getStudentCoursesFailure = (state, { error }) => ({
  ...state,
  loading: false,
  studentCourses: [],
  error
})

const getStudentDocuments = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getStudentDocumentsSuccess = (state, { studentDocuments }) => ({
  ...state,
  loading: false,
  error: null,
  studentDocuments,
})
const getStudentDocumentsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  studentDocuments: [],
  error
})

const getStudentPayments = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getStudentPaymentsSuccess = (state, { studentPayments }) => ({
  ...state,
  loading: false,
  error: null,
  studentPayments,
})
const getStudentPaymentsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  studentPayments: [],
  error
})

const getStudentFinishedExams = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getStudentFinishedExamsSuccess = (state, { studentFinishedExams }) => ({
  ...state,
  loading: false,
  error: null,
  studentFinishedExams,
})
const getStudentFinishedExamsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  studentFinishedExams: [],
  error
})

const getStudentProcessingExams = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getStudentProcessingExamsSuccess = (state, { studentProcessingExams }) => ({
  ...state,
  loading: false,
  error: null,
  studentProcessingExams,
})
const getStudentProcessingExamsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  studentProcessingExams: [],
  error
})

const getStudentUpcomingExams = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getStudentUpcomingExamsSuccess = (state, { studentUpcomingExams }) => ({
  ...state,
  loading: false,
  error: null,
  studentUpcomingExams,
})
const getStudentUpcomingExamsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  studentUpcomingExams: [],
  error
})

const getAllStudents = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getAllStudentsSuccess = (state, { allStudents }) => ({
  ...state,
  loading: false,
  error: null,
  allStudents,
})
const getAllStudentsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  allStudents: [],
  error
})

const deleteStudent = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const deleteStudentSuccess = (state, { studentID }) => ({
  ...state,
  loading: false,
  error: null,
  allStudents: state.allStudents.filter((student) => student.id !== studentID)
})
const deleteStudentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const editStudent = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const editStudentSuccess = (state, { student }) => ({
  ...state,
  loading: false,
  error: null,
  allStudents: state.allStudents.map((student, i) => i === student.id ? {...student, student} : student
)
})
const editStudentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const addStudent = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const addStudentSuccess = (state, { student }) => ({
  ...state,
  loading: false,
  error: null,
  allStudents: [...state.allStudents, student],
})
const addStudentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const removeError = (state) => ({
  ...state,
  error: null,
})

const StudentReducer = createReducer(initialState, {
  [GET_STUDENT]: getStudent,
  [GET_STUDENT_SUCCESS]: getStudentSuccess,
  [GET_STUDENT_FAILURE]: getStudentFailure,

  [GET_STUDENT_COURSES]: getStudentCourses,
  [GET_STUDENT_COURSES_SUCCESS]: getStudentCoursesSuccess,
  [GET_STUDENT_COURSES_FAILURE]: getStudentCoursesFailure,

  [GET_STUDENT_DOCUMENTS]: getStudentDocuments,
  [GET_STUDENT_DOCUMENTS_SUCCESS]: getStudentDocumentsSuccess,
  [GET_STUDENT_DOCUMENTS_FAILURE]: getStudentDocumentsFailure,

  [GET_STUDENT_PAYMENTS]: getStudentPayments,
  [GET_STUDENT_PAYMENTS_SUCCESS]: getStudentPaymentsSuccess,
  [GET_STUDENT_PAYMENTS_FAILURE]: getStudentPaymentsFailure,

  [GET_STUDENT_FINISHED_EXAMS]: getStudentFinishedExams,
  [GET_STUDENT_FINISHED_EXAMS_SUCCESS]: getStudentFinishedExamsSuccess,
  [GET_STUDENT_FINISHED_EXAMS_FAILURE]: getStudentFinishedExamsFailure,

  [GET_STUDENT_PROCESSING_EXAMS]: getStudentProcessingExams,
  [GET_STUDENT_PROCESSING_EXAMS_SUCCESS]: getStudentProcessingExamsSuccess,
  [GET_STUDENT_PROCESSING_EXAMS_FAILURE]: getStudentProcessingExamsFailure,

  [GET_STUDENT_UPCOMING_EXAMS]: getStudentUpcomingExams,
  [GET_STUDENT_UPCOMING_EXAMS_SUCCESS]: getStudentUpcomingExamsSuccess,
  [GET_STUDENT_UPCOMING_EXAMS_FAILURE]: getStudentUpcomingExamsFailure,

  [GET_ALL_STUDENTS]: getAllStudents,
  [GET_ALL_STUDENTS_SUCCESS]: getAllStudentsSuccess,
  [GET_ALL_STUDENTS_FAILURE]: getAllStudentsFailure,

  [DELETE_STUDENT]: deleteStudent,
  [DELETE_STUDENT_SUCCESS]: deleteStudentSuccess,
  [DELETE_STUDENT_FAILURE]: deleteStudentFailure,

  [EDIT_STUDENT]: editStudent,
  [EDIT_STUDENT_SUCCESS]: editStudentSuccess,
  [EDIT_STUDENT_FAILURE]: editStudentFailure,

  [ADD_STUDENT]: addStudent,
  [ADD_STUDENT_SUCCESS]: addStudentSuccess,
  [ADD_STUDENT_FAILURE]: addStudentFailure,

  [REMOVE_ERROR]: removeError,
})

export default StudentReducer
