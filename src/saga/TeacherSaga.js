/* eslint-disable import/named */
import { call, put } from "redux-saga/effects"
import { 
  addTeacher,
  deleteTeacher,
  editTeacher,
  getAllTeachers,
  getTeacher, 
  getTeacherCourses,
} from "../service/Teacher"
import { Types as TeacherTypes } from "../store/Teacher"

const { 
  ADD_TEACHER_SUCCESS,
  ADD_TEACHER_FAILURE,
  DELETE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAILURE,
  EDIT_TEACHER_SUCCESS,
  EDIT_TEACHER_FAILURE,
  GET_TEACHER_SUCCESS,
  GET_TEACHER_FAILURE,
  GET_TEACHER_COURSES_SUCCESS,
  GET_TEACHER_COURSES_FAILURE,
  GET_ALL_TEACHERS_SUCCESS,
  GET_ALL_TEACHERS_FAILURE,
} = TeacherTypes

export function* fetchTeacher({ teacherID }) {
  try {
    const response = yield call(getTeacher, {
      teacherID,
    })
    if (response.ok) {
      yield put({ type: GET_TEACHER_SUCCESS, teacher: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_TEACHER_FAILURE, error: error.message })
  }
}

export function* fetchTeacherCourses({ teacherID }) {
  try {
    const response = yield call(getTeacherCourses, {
      teacherID,
    })
    if (response.ok) {
      yield put({ type: GET_TEACHER_COURSES_SUCCESS, teacherCourses: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_TEACHER_COURSES_FAILURE, error: error.message })
  }
}

export function* fetchAllTeachers() {
  try {
    const response = yield call(getAllTeachers)
    if (response.ok) {
      yield put({ type: GET_ALL_TEACHERS_SUCCESS, allTeachers: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_ALL_TEACHERS_FAILURE, error: error.message })
  }
}

export function* removeTeacher({ teacherID }) {
  try {
    const response = yield call(deleteTeacher, {
      teacherID,
    })
    if (response.ok) {
      yield put({ type: DELETE_TEACHER_SUCCESS, teacherID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: DELETE_TEACHER_FAILURE, error: error.message })
  }
}

export function* changeTeacher({ teacher }) {
  try {
    const response = yield call(editTeacher, {
      teacher,
    })
    if (response.ok) {
      yield put({ type: EDIT_TEACHER_SUCCESS, teacher })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: EDIT_TEACHER_FAILURE, error: error.message })
  }
}

export function* createTeacher({ username, password, firstName, lastName, teacherRank }) {
  try {
    const response = yield call(addTeacher, {
      username,
      password,
      firstName,
      lastName,
      teacherRank,
    })
    if (response.ok) {
      yield put({ type: ADD_TEACHER_SUCCESS, teacher: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: ADD_TEACHER_FAILURE, error: error.message })
  }
}