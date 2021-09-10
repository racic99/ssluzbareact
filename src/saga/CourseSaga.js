/* eslint-disable import/named */
import { call, put } from "redux-saga/effects"
import { 
  addCourse,
  addEnrollment,
  deleteCourse,
  deleteEnrollment,
  editCourse,
  getAllCourses,
  getCourseStudents,
  getExamPeriodCourses,
  getStudentCourseFinishedExams,
} from "../service/Course"
import { Types as CourseTypes } from "../store/Course"

const { 
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  ADD_ENROLLMENT_SUCCESS,
  ADD_ENROLLMENT_FAILURE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  DELETE_ENROLLMENT_SUCCESS,
  DELETE_ENROLLMENT_FAILURE,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_FAILURE,
  GET_EXAM_PERIOD_COURSES_SUCCESS,
  GET_EXAM_PERIOD_COURSES_FAILURE,
  GET_COURSE_STUDENTS_SUCCESS,
  GET_COURSE_STUDENTS_FAILURE,
  GET_STUDENT_COURSE_FINISHED_EXAMS_SUCCESS,
  GET_STUDENT_COURSE_FINISHED_EXAMS_FAILURE,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAILURE,
} = CourseTypes

export function* fetchExamPeriodCourses({ studentID, examPeriodID }) {
  try {
    const response = yield call(getExamPeriodCourses, {
      studentID,
      examPeriodID,
    })
    if (response.ok) {
      yield put({ type: GET_EXAM_PERIOD_COURSES_SUCCESS, examPeriodCourses: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_EXAM_PERIOD_COURSES_FAILURE, error: error.message })
  }
}

export function* fetchCourseStudents({ courseID }) {
  try {
    const response = yield call(getCourseStudents, {
      courseID,
    })
    if (response.ok) {
      yield put({ type: GET_COURSE_STUDENTS_SUCCESS, courseStudents: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_COURSE_STUDENTS_FAILURE, error: error.message })
  }
}

export function* fetchStudentCourseFinishedExams({ courseID }) {
  try {
    const response = yield call(getStudentCourseFinishedExams, {
      courseID,
    })
    if (response.ok) {
      yield put({ type: GET_STUDENT_COURSE_FINISHED_EXAMS_SUCCESS, studentCourseFinishedExams: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_STUDENT_COURSE_FINISHED_EXAMS_FAILURE, error: error.message })
  }
}

export function* fetchAllCourses() {
  try {
    const response = yield call(getAllCourses)
    if (response.ok) {
      yield put({ type: GET_ALL_COURSES_SUCCESS, allCourses: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_ALL_COURSES_FAILURE, error: error.message })
  }
}

export function* removeCourse({ courseID }) {
  try {
    const response = yield call(deleteCourse, {
      courseID,
    })
    if (response.ok) {
      yield put({ type: DELETE_COURSE_SUCCESS, courseID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: DELETE_COURSE_FAILURE, error: error.message })
  }
}

export function* changeCourse({ course }) {
  try {
    const response = yield call(editCourse, {
      course,
    })
    if (response.ok) {
      yield put({ type: EDIT_COURSE_SUCCESS, course })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: EDIT_COURSE_FAILURE, error: error.message })
  }
}

export function* createCourse({ course }) {
  try {
    const response = yield call(addCourse, {
      course,
    })
    if (response.ok) {
      yield put({ type: ADD_COURSE_SUCCESS, course: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: ADD_COURSE_FAILURE, error: error.message })
  }
}

export function* createEnrollment({ enrollment }) {
  try {
    const response = yield call(addEnrollment, {
      enrollment,
    })
    if (response.ok) {
      yield put({ type: ADD_ENROLLMENT_SUCCESS, enrollment: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: ADD_ENROLLMENT_FAILURE, error: error.message })
  }
}

export function* removeEnrollment({ enrollmentID }) {
  try {
    const response = yield call(deleteEnrollment, {
      enrollmentID,
    })
    if (response.ok) {
      yield put({ type: DELETE_ENROLLMENT_SUCCESS, enrollmentID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: DELETE_ENROLLMENT_FAILURE, error: error.message })
  }
}