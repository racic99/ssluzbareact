import { request } from "./Request"

export const getStudent = async (options) => {
  try {
    const path = `/students/${options.studentID}`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getStudentCourses = async (options) => {
  try {
    const path = `/students/${options.studentID}/courses`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getStudentDocuments = async (options) => {
  try {
    const path = `/students/${options.studentID}/documents`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getStudentPayments = async (options) => {
  try {
    const path = `/students/${options.studentID}/payments`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getStudentFinishedExams = async (options) => {
  try {
    const path = `/students/${options.studentID}/examspass`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getStudentProcessingExams = async (options) => {
  try {
    const path = `/students/${options.studentID}/exams`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getStudentUpcomingExams = async (options) => {
  try {
    const path = `/students/${options.studentID}/nextexams`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getAllStudents = async (options) => {
  try {
    const path = `/students/all`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const deleteStudent = async (options) => {
  try {
    const path = `/students/${options.studentID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const editStudent = async (options) => {
  try {
    const path = `/students`
    const response = await request.put(path, { ...options.student }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const addStudent = async (options) => {
  try {
    const path = `/user/registerStudent/${options.username}/${options.password}/${options.cardNumber}/${options.firstName}/${options.lastName}`
    const response = await request.post(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}