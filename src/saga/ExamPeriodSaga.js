/* eslint-disable import/named */
import { call, put } from "redux-saga/effects"
import { 
  addExamPeriod,
  deleteExamPeriod,
  editExamPeriod,
  getAllExamPeriods,
  getNextExamPeriods,
} from "../service/ExamPeriod"
import { Types as ExamPeriodTypes } from "../store/ExamPeriod"

const { 
  ADD_EXAM_PERIOD_SUCCESS,
  ADD_EXAM_PERIOD_FAILURE,
  DELETE_EXAM_PERIOD_SUCCESS,
  DELETE_EXAM_PERIOD_FAILURE,
  EDIT_EXAM_PERIOD_SUCCESS,
  EDIT_EXAM_PERIOD_FAILURE,
  GET_NEXT_EXAM_PERIODS_SUCCESS,
  GET_NEXT_EXAM_PERIODS_FAILURE,
  GET_ALL_EXAM_PERIODS_SUCCESS,
  GET_ALL_EXAM_PERIODS_FAILURE,
} = ExamPeriodTypes

export function* fetchNextExamPeriods() {
  try {
    const response = yield call(getNextExamPeriods)
    if (response.ok) {
      yield put({ type: GET_NEXT_EXAM_PERIODS_SUCCESS, nextExamPeriods: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_NEXT_EXAM_PERIODS_FAILURE, error: error.message })
  }
}

export function* fetchAllExamPeriods() {
  try {
    const response = yield call(getAllExamPeriods)
    if (response.ok) {
      yield put({ type: GET_ALL_EXAM_PERIODS_SUCCESS, allExamPeriods: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_ALL_EXAM_PERIODS_FAILURE, error: error.message })
  }
}

export function* removeExamPeriod({ examPeriodID }) {
  try {
    const response = yield call(deleteExamPeriod, {
      examPeriodID,
    })
    if (response.ok) {
      yield put({ type: DELETE_EXAM_PERIOD_SUCCESS, examPeriodID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: DELETE_EXAM_PERIOD_FAILURE, error: error.message })
  }
}

export function* changeExamPeriod({ examPeriod }) {
  try {
    const response = yield call(editExamPeriod, {
      examPeriod,
    })
    if (response.ok) {
      yield put({ type: EDIT_EXAM_PERIOD_SUCCESS, examPeriod })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: EDIT_EXAM_PERIOD_FAILURE, error: error.message })
  }
}

export function* createExamPeriod({ examPeriod }) {
  try {
    const response = yield call(addExamPeriod, {
      examPeriod,
    })
    if (response.ok) {
      yield put({ type: ADD_EXAM_PERIOD_SUCCESS, examPeriod: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: ADD_EXAM_PERIOD_FAILURE, error: error.message })
  }
}