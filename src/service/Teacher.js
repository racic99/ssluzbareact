import { request } from "./Request"

export const getTeacher = async (options) => {
  try {
    const path = `/teachers/${options.teacherID}`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getTeacherCourses = async (options) => {
  try {
    const path = `/teachers/${options.teacherID}/courses`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const getAllTeachers = async (options) => {
  try {
    const path = `/teachers/all`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const deleteTeacher = async (options) => {
  try {
    const path = `/teachers/${options.teacherID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const editTeacher = async (options) => {
  try {
    const path = `/teachers`
    const response = await request.put(path, { ...options.teacher }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const addTeacher = async (options) => {
  try {
    const path = `/user/registerTeacher/${options.username}/${options.password}/${options.firstName}/${options.lastName}/${options.teacherRank}`
    const response = await request.post(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}