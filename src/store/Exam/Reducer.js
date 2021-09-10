/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { Types as ExamTypes } from "./index"

const { 
  REGISTER_EXAM,
  REGISTER_EXAM_SUCCESS,
  REGISTER_EXAM_FAILURE,
  DELETE_EXAM,
  DELETE_EXAM_SUCCESS,
  DELETE_EXAM_FAILURE,
  EDIT_EXAM,
  EDIT_EXAM_SUCCESS,
  EDIT_EXAM_FAILURE,
  GET_ALL_EXAMS,
  GET_ALL_EXAMS_SUCCESS,
  GET_ALL_EXAMS_FAILURE,
  REMOVE_ERROR,
} = ExamTypes

const initialState = {
  loading: false,
  error: null,
  exam: null,
  allExams: [],
}

const registerExam = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const registerExamSuccess = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const registerExamFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const deleteExam = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const deleteExamSuccess = (state, { examID }) => ({
  ...state,
  loading: false,
  error: null,
  allExams: state.allExams.filter((exam) => exam.id !== examID)
})
const deleteExamFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const editExam = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const editExamSuccess = (state, { exam }) => ({
  ...state,
  loading: false,
  error: null,
  allExams: state.allExams.map((exam, i) => i === exam.id ? {...exam, exam} : exam)
})
const editExamFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const getAllExams = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getAllExamsSuccess = (state, { allExams }) => ({
  ...state,
  loading: false,
  error: null,
  allExams
})
const getAllExamsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  allExams: [],
})

const removeError = (state) => ({
  ...state,
  error: null,
})

const ExamReducer = createReducer(initialState, {
  [REGISTER_EXAM]: registerExam,
  [REGISTER_EXAM_SUCCESS]: registerExamSuccess,
  [REGISTER_EXAM_FAILURE]: registerExamFailure,

  [DELETE_EXAM]: deleteExam,
  [DELETE_EXAM_SUCCESS]: deleteExamSuccess,
  [DELETE_EXAM_FAILURE]: deleteExamFailure,

  [EDIT_EXAM]: editExam,
  [EDIT_EXAM_SUCCESS]: editExamSuccess,
  [EDIT_EXAM_FAILURE]: editExamFailure,

  [GET_ALL_EXAMS]: getAllExams,
  [GET_ALL_EXAMS_SUCCESS]: getAllExamsSuccess,
  [GET_ALL_EXAMS_FAILURE]: getAllExamsFailure,

  [REMOVE_ERROR]: removeError,
})

export default ExamReducer
