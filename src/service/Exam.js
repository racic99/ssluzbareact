import { request } from "./Request"

export const deleteExam = async (options) => {
  try {
    const path = `/exams/${options.examID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const registerExam = async (options) => {
  try {
    const path = `/exams/${options.studentID}/${options.examPeriodID}/${options.courseID}/examRegistration`
    const response = await request.post(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const editExam = async (options) => {
  try {
    const path = `/exams`
    const response = await request.put(path, { ...options.exam }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getAllExams = async (options) => {
  try {
    const path = `/exams/all`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}