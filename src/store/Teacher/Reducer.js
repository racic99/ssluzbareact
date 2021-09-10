/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { Types as TeacherTypes } from "./index"

const { 
  ADD_TEACHER,
  ADD_TEACHER_SUCCESS,
  ADD_TEACHER_FAILURE,
  DELETE_TEACHER,
  DELETE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAILURE,
  EDIT_TEACHER,
  EDIT_TEACHER_SUCCESS,
  EDIT_TEACHER_FAILURE,
  GET_TEACHER,
  GET_TEACHER_SUCCESS,
  GET_TEACHER_FAILURE,
  GET_TEACHER_COURSES,
  GET_TEACHER_COURSES_SUCCESS,
  GET_TEACHER_COURSES_FAILURE,
  GET_ALL_TEACHERS,
  GET_ALL_TEACHERS_SUCCESS,
  GET_ALL_TEACHERS_FAILURE,
  REMOVE_ERROR,
} = TeacherTypes

const initialState = {
  loading: false,
  error: null,
  teacher: null,
  teacherCourses: [],
  allTeachers: [],
}

const getTeacher = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getTeacherSuccess = (state, { teacher }) => ({
  ...state,
  loading: false,
  error: null,
  teacher,
})
const getTeacherFailure = (state, { error }) => ({
  ...state,
  loading: false,
  teacher: null,
  error
})

const getTeacherCourses = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getTeacherCoursesSuccess = (state, { teacherCourses }) => ({
  ...state,
  loading: false,
  error: null,
  teacherCourses,
})
const getTeacherCoursesFailure = (state, { error }) => ({
  ...state,
  loading: false,
  teacherCourses: [],
  error
})

const getAllTeachers = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getAllTeachersSuccess = (state, { allTeachers }) => ({
  ...state,
  loading: false,
  error: null,
  allTeachers,
})
const getAllTeachersFailure = (state, { error }) => ({
  ...state,
  loading: false,
  allTeachers: [],
  error
})

const removeError = (state) => ({
  ...state,
  error: null,
})

const deleteTeacher = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const deleteTeacherSuccess = (state, { teacherID }) => ({
  ...state,
  loading: false,
  error: null,
  allTeachers: state.allTeachers.filter((teacher) => teacher.id !== teacherID)
})
const deleteTeacherFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const editTeacher = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const editTeacherSuccess = (state, { teacher }) => ({
  ...state,
  loading: false,
  error: null,
  allTeachers: state.allTeachers.map((teacher, i) => i === teacher.id ? {...teacher, teacher} : teacher
)
})
const editTeacherFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const addTeacher = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const addTeacherSuccess = (state, { teacher }) => ({
  ...state,
  loading: false,
  error: null,
  allTeachers: [...state.allTeachers, teacher],
})
const addTeacherFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const TeacherReducer = createReducer(initialState, {
  [GET_TEACHER]: getTeacher,
  [GET_TEACHER_SUCCESS]: getTeacherSuccess,
  [GET_TEACHER_FAILURE]: getTeacherFailure,

  [GET_TEACHER_COURSES]: getTeacherCourses,
  [GET_TEACHER_COURSES_SUCCESS]: getTeacherCoursesSuccess,
  [GET_TEACHER_COURSES_FAILURE]: getTeacherCoursesFailure,

  [GET_ALL_TEACHERS]: getAllTeachers,
  [GET_ALL_TEACHERS_SUCCESS]: getAllTeachersSuccess,
  [GET_ALL_TEACHERS_FAILURE]: getAllTeachersFailure,

  [DELETE_TEACHER]: deleteTeacher,
  [DELETE_TEACHER_SUCCESS]: deleteTeacherSuccess,
  [DELETE_TEACHER_FAILURE]: deleteTeacherFailure,

  [EDIT_TEACHER]: editTeacher,
  [EDIT_TEACHER_SUCCESS]: editTeacherSuccess,
  [EDIT_TEACHER_FAILURE]: editTeacherFailure,

  [ADD_TEACHER]: addTeacher,
  [ADD_TEACHER_SUCCESS]: addTeacherSuccess,
  [ADD_TEACHER_FAILURE]: addTeacherFailure,

  [REMOVE_ERROR]: removeError,
})

export default TeacherReducer
