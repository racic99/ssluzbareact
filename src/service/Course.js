import { request } from "./Request"

export const getExamPeriodCourses = async (options) => {
  try {
    const path = `/courses/${options.studentID}/${options.examPeriodID}`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getCourseStudents = async (options) => {
  try {
    const path = `/courses/${options.courseID}/students`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getStudentCourseFinishedExams = async (options) => {
  try {
    const path = `/courses/${options.courseID}/examspasscourse`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getAllCourses = async (options) => {
  try {
    const path = `/courses`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const deleteCourse = async (options) => {
  try {
    const path = `/courses/${options.courseID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const editCourse = async (options) => {
  try {
    const path = `/courses`
    const response = await request.put(path, { ...options.course }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const addCourse = async (options) => {
  try {
    const path = `/courses`
    const response = await request.post(path, { ...options.course }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const addEnrollment = async (options) => {
  try {
    const path = `/enrollment`
    const response = await request.post(path, { ...options.enrollment }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const deleteEnrollment = async (options) => {
  try {
    const path = `/enrollment/${options.enrollmentID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}