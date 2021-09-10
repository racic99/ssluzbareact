/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { Types as PaymentTypes } from "./index"

const {
  ADD_PAYMENT,
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAILURE,
  DELETE_PAYMENT,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAILURE,
  EDIT_PAYMENT,
  EDIT_PAYMENT_SUCCESS,
  EDIT_PAYMENT_FAILURE,
  GET_ALL_PAYMENTS,
  GET_ALL_PAYMENTS_SUCCESS,
  GET_ALL_PAYMENTS_FAILURE,
  REMOVE_ERROR,
} = PaymentTypes

const initialState = {
  loading: false,
  error: null,
  allPayments: [],
}

const getAllPayments = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getAllPaymentsSuccess = (state, { allPayments }) => ({
  ...state,
  loading: false,
  error: null,
  allPayments,
})
const getAllPaymentsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  allPayments: [],
  error
})

const deletePayment = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const deletePaymentSuccess = (state, { paymentID }) => ({
  ...state,
  loading: false,
  error: null,
  allPayments: state.allPayments.filter((payment) => payment.id !== paymentID)
})
const deletePaymentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const editPayment = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const editPaymentSuccess = (state, { payment }) => ({
  ...state,
  loading: false,
  error: null,
  allPayments: state.allPayments.map((payment, i) => i === payment.id ? {...payment, payment} : payment
)
})
const editPaymentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const addPayment = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const addPaymentSuccess = (state, { payment }) => ({
  ...state,
  loading: false,
  error: null,
  allPayments: [...state.allPayments, payment],
})
const addPaymentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const removeError = (state) => ({
  ...state,
  error: null,
})

const PaymentReducer = createReducer(initialState, {
  [GET_ALL_PAYMENTS]: getAllPayments,
  [GET_ALL_PAYMENTS_SUCCESS]: getAllPaymentsSuccess,
  [GET_ALL_PAYMENTS_FAILURE]: getAllPaymentsFailure,

  [DELETE_PAYMENT]: deletePayment,
  [DELETE_PAYMENT_SUCCESS]: deletePaymentSuccess,
  [DELETE_PAYMENT_FAILURE]: deletePaymentFailure,
  
  [EDIT_PAYMENT]: editPayment,
  [EDIT_PAYMENT_SUCCESS]: editPaymentSuccess,
  [EDIT_PAYMENT_FAILURE]: editPaymentFailure,

  [ADD_PAYMENT]: addPayment,
  [ADD_PAYMENT_SUCCESS]: addPaymentSuccess,
  [ADD_PAYMENT_FAILURE]: addPaymentFailure,

  [REMOVE_ERROR]: removeError,
})

export default PaymentReducer
