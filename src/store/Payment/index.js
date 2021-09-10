import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  getAllPayments: null,
  getAllPaymentsSuccess: ["allPayments"],
  getAllPaymentsFailure: ["error"],

  deletePayment: ["paymentID"],
  deletePaymentSuccess: ["paymentID"],
  deletePaymentFailure: ["error"],

  editPayment: ["payment"],
  editPaymentSuccess: ["payment"],
  editPaymentFailure: ["error"],

  addPayment: ["payment"],
  addPaymentSuccess: ["payment"],
  addPaymentFailure: ["error"],

  removeError: null,
})

export { Types }
export { Creators }
