/* eslint-disable import/named */
import { call, put } from "redux-saga/effects"
import { 
  getStudent,
  getStudentCourses,
  getStudentDocuments,
  getStudentFinishedExams,
  getStudentPayments,
  getStudentProcessingExams,
  getStudentUpcomingExams,
  getAllStudents,
  deleteStudent,
  editStudent,
  addStudent,
} from "../service/Student"
import { Types as StudentTypes } from "../store/Student"

const { 
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAILURE,
  GET_STUDENT_COURSES_SUCCESS,
  GET_STUDENT_COURSES_FAILURE,
  GET_STUDENT_DOCUMENTS_SUCCESS,
  GET_STUDENT_DOCUMENTS_FAILURE,
  GET_STUDENT_PAYMENTS_SUCCESS,
  GET_STUDENT_PAYMENTS_FAILURE,
  GET_STUDENT_FINISHED_EXAMS_SUCCESS,
  GET_STUDENT_FINISHED_EXAMS_FAILURE,
  GET_STUDENT_PROCESSING_EXAMS_SUCCESS,
  GET_STUDENT_PROCESSING_EXAMS_FAILURE,
  GET_STUDENT_UPCOMING_EXAMS_SUCCESS,
  GET_STUDENT_UPCOMING_EXAMS_FAILURE,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_STUDENTS_FAILURE,
} = StudentTypes

export function* fetchStudent({ studentID }) {
  try {
    const response = yield call(getStudent, {
      studentID,
    })
    if (response.ok) {
      yield put({ type: GET_STUDENT_SUCCESS, student: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_STUDENT_FAILURE, error: error.message })
  }
}

export function* fetchStudentCourses({ studentID }) {
  try {
    const response = yield call(getStudentCourses, {
      studentID,
    })
    if (response.ok) {
      yield put({ type: GET_STUDENT_COURSES_SUCCESS, studentCourses: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_STUDENT_COURSES_FAILURE, error: error.message })
  }
}

export function* fetchStudentDocuments({ studentID }) {
  try {
    const response = yield call(getStudentDocuments, {
      studentID,
    })
    if (response.ok) {
      yield put({ type: GET_STUDENT_DOCUMENTS_SUCCESS, studentDocuments: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_STUDENT_DOCUMENTS_FAILURE, error: error.message })
  }
}

export function* fetchStudentPayments({ studentID }) {
  try {
    const response = yield call(getStudentPayments, {
      studentID,
    })
    if (response.ok) {
      yield put({ type: GET_STUDENT_PAYMENTS_SUCCESS, studentPayments: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_STUDENT_PAYMENTS_FAILURE, error: error.message })
  }
}

export function* fetchStudentFinishedExams({ studentID }) {
  try {
    const response = yield call(getStudentFinishedExams, {
      studentID,
    })
    if (response.ok) {
      yield put({ type: GET_STUDENT_FINISHED_EXAMS_SUCCESS, studentFinishedExams: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_STUDENT_FINISHED_EXAMS_FAILURE, error: error.message })
  }
}

export function* fetchStudentProcessingExams({ studentID }) {
  try {
    const response = yield call(getStudentProcessingExams, {
      studentID,
    })
    if (response.ok) {
      yield put({ type: GET_STUDENT_PROCESSING_EXAMS_SUCCESS, studentProcessingExams: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_STUDENT_PROCESSING_EXAMS_FAILURE, error: error.message })
  }
}

export function* fetchStudentUpcomingExams({ studentID }) {
  try {
    const response = yield call(getStudentUpcomingExams, {
      studentID,
    })
    if (response.ok) {
      yield put({ type: GET_STUDENT_UPCOMING_EXAMS_SUCCESS, studentUpcomingExams: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_STUDENT_UPCOMING_EXAMS_FAILURE, error: error.message })
  }
}

export function* fetchAllStudents() {
  try {
    const response = yield call(getAllStudents)
    if (response.ok) {
      yield put({ type: GET_ALL_STUDENTS_SUCCESS, allStudents: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_ALL_STUDENTS_FAILURE, error: error.message })
  }
}

export function* removeStudent({ studentID }) {
  try {
    const response = yield call(deleteStudent, {
      studentID,
    })
    if (response.ok) {
      yield put({ type: DELETE_STUDENT_SUCCESS, studentID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: DELETE_STUDENT_FAILURE, error: error.message })
  }
}

export function* changeStudent({ student }) {
  try {
    const response = yield call(editStudent, {
      student,
    })
    if (response.ok) {
      yield put({ type: EDIT_STUDENT_SUCCESS, student })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: EDIT_STUDENT_FAILURE, error: error.message })
  }
}

export function* createStudent({ username, password, cardNumber, firstName, lastName }) {
  try {
    const response = yield call(addStudent, {
      username,
      password,
      cardNumber,
      firstName,
      lastName,
    })
    if (response.ok) {
      yield put({ type: ADD_STUDENT_SUCCESS, student: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: ADD_STUDENT_FAILURE, error: error.message })
  }
}