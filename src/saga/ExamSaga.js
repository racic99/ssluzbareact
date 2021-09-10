/* eslint-disable import/named */
import { call, put } from "redux-saga/effects"
import { 
  registerExam,
  deleteExam,
  editExam,
  getAllExams,
} from "../service/Exam"
import { Types as ExamTypes } from "../store/Exam"

const { 
  REGISTER_EXAM_SUCCESS,
  REGISTER_EXAM_FAILURE,
  DELETE_EXAM_SUCCESS,
  DELETE_EXAM_FAILURE,
  EDIT_EXAM_SUCCESS,
  EDIT_EXAM_FAILURE,
  GET_ALL_EXAMS_SUCCESS,
  GET_ALL_EXAMS_FAILURE,
} = ExamTypes

export function* removeExam({ examID }) {
  try {
    const response = yield call(deleteExam, {
      examID,
    })
    if (response.ok) {
      yield put({ type: DELETE_EXAM_SUCCESS, examID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: DELETE_EXAM_FAILURE, error: error.message })
  }
}

export function* registerNewExam({ studentID, examPeriodID, courseID }) {
  try {
    const response = yield call(registerExam, {
      studentID,
      examPeriodID,
      courseID,
    })
    if (response.ok) {
      yield put({ type: REGISTER_EXAM_SUCCESS, studentID, examPeriodID, courseID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: REGISTER_EXAM_FAILURE, error: error.message })
  }
}

export function* changeExam({ exam }) {
  try {
    const response = yield call(editExam, {
      exam,
    })
    if (response.ok) {
      yield put({ type: EDIT_EXAM_SUCCESS, exam: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: EDIT_EXAM_FAILURE, error: error.message })
  }
}

export function* fetchAllExams() {
  try {
    const response = yield call(getAllExams)
    if (response.ok) {
      yield put({ type: GET_ALL_EXAMS_SUCCESS, allExams: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_ALL_EXAMS_FAILURE, error: error.message })
  }
}