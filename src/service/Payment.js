import { request } from "./Request"

export const getAllPayments = async (options) => {
  try {
    const path = `/payments/all`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const deletePayment = async (options) => {
  try {
    const path = `/payments/${options.paymentID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const editPayment = async (options) => {
  try {
    const path = `/payments`
    const response = await request.put(path, { ...options.payment }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const addPayment = async (options) => {
  try {
    const path = `/payments`
    const response = await request.post(path, { ...options.payment }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}