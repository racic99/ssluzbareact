/* eslint-disable import/named */
import { call, put } from "redux-saga/effects"
import { 
  addPayment,
  deletePayment,
  editPayment,
  getAllPayments,
} from "../service/Payment"
import { Types as PaymentTypes } from "../store/Payment"

const {
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAILURE,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAILURE,
  EDIT_PAYMENT_SUCCESS,
  EDIT_PAYMENT_FAILURE,
  GET_ALL_PAYMENTS_SUCCESS,
  GET_ALL_PAYMENTS_FAILURE,
} = PaymentTypes

export function* fetchAllPayments() {
  try {
    const response = yield call(getAllPayments)
    if (response.ok) {
      yield put({ type: GET_ALL_PAYMENTS_SUCCESS, allPayments: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_ALL_PAYMENTS_FAILURE, error: error.message })
  }
}

export function* removePayment({ paymentID }) {
  try {
    const response = yield call(deletePayment, {
      paymentID,
    })
    if (response.ok) {
      yield put({ type: DELETE_PAYMENT_SUCCESS, paymentID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: DELETE_PAYMENT_FAILURE, error: error.message })
  }
}

export function* changePayment({ payment }) {
  try {
    const response = yield call(editPayment, {
      payment,
    })
    if (response.ok) {
      yield put({ type: EDIT_PAYMENT_SUCCESS, payment })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: EDIT_PAYMENT_FAILURE, error: error.message })
  }
}

export function* createPayment({ payment }) {
  try {
    const response = yield call(addPayment, {
      payment,
    })
    if (response.ok) {
      yield put({ type: ADD_PAYMENT_SUCCESS, payment: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: ADD_PAYMENT_FAILURE, error: error.message })
  }
}