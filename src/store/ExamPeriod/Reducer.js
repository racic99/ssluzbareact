/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { Types as ExamPeriodTypes } from "./index"

const { 
  ADD_EXAM_PERIOD,
  ADD_EXAM_PERIOD_SUCCESS,
  ADD_EXAM_PERIOD_FAILURE,
  DELETE_EXAM_PERIOD,
  DELETE_EXAM_PERIOD_SUCCESS,
  DELETE_EXAM_PERIOD_FAILURE,
  EDIT_EXAM_PERIOD,
  EDIT_EXAM_PERIOD_SUCCESS,
  EDIT_EXAM_PERIOD_FAILURE,
  GET_NEXT_EXAM_PERIODS,
  GET_NEXT_EXAM_PERIODS_SUCCESS,
  GET_NEXT_EXAM_PERIODS_FAILURE,
  GET_ALL_EXAM_PERIODS,
  GET_ALL_EXAM_PERIODS_SUCCESS,
  GET_ALL_EXAM_PERIODS_FAILURE,
  REMOVE_ERROR,
} = ExamPeriodTypes

const initialState = {
  loading: false,
  error: null,
  nextExamPeriods: [],
  allExamPeriods: [],
}

const getNextExamPeriods = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getNextExamPeriodsSuccess = (state, { nextExamPeriods }) => ({
  ...state,
  loading: false,
  error: null,
  nextExamPeriods,
})
const getNextExamPeriodsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  nextExamPeriods: [],
  error
})

const getAllExamPeriods = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getAllExamPeriodsSuccess = (state, { allExamPeriods }) => ({
  ...state,
  loading: false,
  error: null,
  allExamPeriods,
})
const getAllExamPeriodsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  allExamPeriods: [],
  error
})

const deleteExamPeriod = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const deleteExamPeriodSuccess = (state, { examPeriodID }) => ({
  ...state,
  loading: false,
  error: null,
  allExamPeriods: state.allExamPeriods.filter((examPeriod) => examPeriod.id !== examPeriodID)
})
const deleteExamPeriodFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const editExamPeriod = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const editExamPeriodSuccess = (state, { examPeriod }) => ({
  ...state,
  loading: false,
  error: null,
  allExamPeriods: state.allExamPeriods.map((examPeriod, i) => i === examPeriod.id ? {...examPeriod, examPeriod} : examPeriod
)
})
const editExamPeriodFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const addExamPeriod = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const addExamPeriodSuccess = (state, { examPeriod }) => ({
  ...state,
  loading: false,
  error: null,
  allExamPeriods: [...state.allExamPeriods, examPeriod],
})
const addExamPeriodFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const removeError = (state) => ({
  ...state,
  error: null,
})

const ExamPeriodReducer = createReducer(initialState, {
  [GET_NEXT_EXAM_PERIODS]: getNextExamPeriods,
  [GET_NEXT_EXAM_PERIODS_SUCCESS]: getNextExamPeriodsSuccess,
  [GET_NEXT_EXAM_PERIODS_FAILURE]: getNextExamPeriodsFailure,

  [GET_ALL_EXAM_PERIODS]: getAllExamPeriods,
  [GET_ALL_EXAM_PERIODS_SUCCESS]: getAllExamPeriodsSuccess,
  [GET_ALL_EXAM_PERIODS_FAILURE]: getAllExamPeriodsFailure,

  [DELETE_EXAM_PERIOD]: deleteExamPeriod,
  [DELETE_EXAM_PERIOD_SUCCESS]: deleteExamPeriodSuccess,
  [DELETE_EXAM_PERIOD_FAILURE]: deleteExamPeriodFailure,

  [EDIT_EXAM_PERIOD]: editExamPeriod,
  [EDIT_EXAM_PERIOD_SUCCESS]: editExamPeriodSuccess,
  [EDIT_EXAM_PERIOD_FAILURE]: editExamPeriodFailure,

  [ADD_EXAM_PERIOD]: addExamPeriod,
  [ADD_EXAM_PERIOD_SUCCESS]: addExamPeriodSuccess,
  [ADD_EXAM_PERIOD_FAILURE]: addExamPeriodFailure,

  [REMOVE_ERROR]: removeError,
})

export default ExamPeriodReducer
