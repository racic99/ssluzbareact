import { request } from "./Request"

export const getNextExamPeriods = async (options) => {
  try {
    const path = `/examPeriods/nextExamPeriods`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getAllExamPeriods = async (options) => {
  try {
    const path = `/examPeriods/all`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const deleteExamPeriod = async (options) => {
  try {
    const path = `/examPeriods/${options.examPeriodID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const editExamPeriod = async (options) => {
  try {
    const path = `/examPeriods`
    const response = await request.put(path, { ...options.examPeriod }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const addExamPeriod = async (options) => {
  try {
    const path = `/examPeriods`
    const response = await request.post(path, { ...options.examPeriod }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}