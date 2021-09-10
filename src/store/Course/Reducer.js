/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { Types as CourseTypes } from "./index"

const { 
  ADD_COURSE,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  ADD_ENROLLMENT,
  ADD_ENROLLMENT_SUCCESS,
  ADD_ENROLLMENT_FAILURE,
  DELETE_COURSE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  DELETE_ENROLLMENT,
  DELETE_ENROLLMENT_SUCCESS,
  DELETE_ENROLLMENT_FAILURE,
  EDIT_COURSE,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_FAILURE,
  GET_EXAM_PERIOD_COURSES,
  GET_EXAM_PERIOD_COURSES_SUCCESS,
  GET_EXAM_PERIOD_COURSES_FAILURE,
  GET_COURSE_STUDENTS,
  GET_COURSE_STUDENTS_SUCCESS,
  GET_COURSE_STUDENTS_FAILURE,
  GET_STUDENT_COURSE_FINISHED_EXAMS,
  GET_STUDENT_COURSE_FINISHED_EXAMS_SUCCESS,
  GET_STUDENT_COURSE_FINISHED_EXAMS_FAILURE,
  GET_ALL_COURSES,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAILURE,
  REMOVE_ERROR,
} = CourseTypes

const initialState = {
  loading: false,
  error: null,
  examPeriodCourses: [],
  courseStudents: [],
  studentCourseFinishedExams: [],
  allCourses: [],
}

const getExamPeriodCourses = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getExamPeriodCoursesSuccess = (state, { examPeriodCourses }) => ({
  ...state,
  loading: false,
  error: null,
  examPeriodCourses,
})
const getExamPeriodCoursesFailure = (state, { error }) => ({
  ...state,
  loading: false,
  examPeriodCourses: [],
  error
})

const getCourseStudents = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getCourseStudentsSuccess = (state, { courseStudents }) => ({
  ...state,
  loading: false,
  error: null,
  courseStudents,
})
const getCourseStudentsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  courseStudents: [],
  error
})

const getStudentCourseFinishedExams = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getStudentCourseFinishedExamsSuccess = (state, { studentCourseFinishedExams }) => ({
  ...state,
  loading: false,
  error: null,
  studentCourseFinishedExams,
})
const getStudentCourseFinishedExamsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  studentCourseFinishedExams: [],
  error
})

const getAllCourses = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getAllCoursesSuccess = (state, { allCourses }) => ({
  ...state,
  loading: false,
  error: null,
  allCourses,
})
const getAllCoursesFailure = (state, { error }) => ({
  ...state,
  loading: false,
  allCourses: [],
  error
})

const deleteCourse = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const deleteCourseSuccess = (state, { courseID }) => ({
  ...state,
  loading: false,
  error: null,
  allCourses: state.allCourses.filter((course) => course.id !== courseID)
})
const deleteCourseFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const editCourse = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const editCourseSuccess = (state, { course }) => ({
  ...state,
  loading: false,
  error: null,
  allCourses: state.allCourses.map((course, i) => i === course.id ? {...course, course} : course
)
})
const editCourseFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const addCourse = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const addCourseSuccess = (state, { course }) => ({
  ...state,
  loading: false,
  error: null,
  allCourses: [...state.allCourses, course],
})
const addCourseFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const addEnrollment = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const addEnrollmentSuccess = (state, { enrollment }) => ({
  ...state,
  loading: false,
  error: null,
  courseStudents: [...state.courseStudents, enrollment],
})
const addEnrollmentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const deleteEnrollment = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const deleteEnrollmentSuccess = (state, { enrollmentID }) => ({
  ...state,
  loading: false,
  error: null,
  courseStudents: state.courseStudents.filter((enrollment) => enrollment.id !== enrollmentID)
})
const deleteEnrollmentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const removeError = (state) => ({
  ...state,
  error: null,
})

const CourseReducer = createReducer(initialState, {
  [GET_EXAM_PERIOD_COURSES]: getExamPeriodCourses,
  [GET_EXAM_PERIOD_COURSES_SUCCESS]: getExamPeriodCoursesSuccess,
  [GET_EXAM_PERIOD_COURSES_FAILURE]: getExamPeriodCoursesFailure,

  [GET_COURSE_STUDENTS]: getCourseStudents,
  [GET_COURSE_STUDENTS_SUCCESS]: getCourseStudentsSuccess,
  [GET_COURSE_STUDENTS_FAILURE]: getCourseStudentsFailure,

  [GET_STUDENT_COURSE_FINISHED_EXAMS]: getStudentCourseFinishedExams,
  [GET_STUDENT_COURSE_FINISHED_EXAMS_SUCCESS]: getStudentCourseFinishedExamsSuccess,
  [GET_STUDENT_COURSE_FINISHED_EXAMS_FAILURE]: getStudentCourseFinishedExamsFailure,

  [GET_ALL_COURSES]: getAllCourses,
  [GET_ALL_COURSES_SUCCESS]: getAllCoursesSuccess,
  [GET_ALL_COURSES_FAILURE]: getAllCoursesFailure,

  [DELETE_COURSE]: deleteCourse,
  [DELETE_COURSE_SUCCESS]: deleteCourseSuccess,
  [DELETE_COURSE_FAILURE]: deleteCourseFailure,

  [EDIT_COURSE]: editCourse,
  [EDIT_COURSE_SUCCESS]: editCourseSuccess,
  [EDIT_COURSE_FAILURE]: editCourseFailure,

  [ADD_COURSE]: addCourse,
  [ADD_COURSE_SUCCESS]: addCourseSuccess,
  [ADD_COURSE_FAILURE]: addCourseFailure,

  [ADD_ENROLLMENT]: addEnrollment,
  [ADD_ENROLLMENT_SUCCESS]: addEnrollmentSuccess,
  [ADD_ENROLLMENT_FAILURE]: addEnrollmentFailure,

  [DELETE_ENROLLMENT]: deleteEnrollment,
  [DELETE_ENROLLMENT_SUCCESS]: deleteEnrollmentSuccess,
  [DELETE_ENROLLMENT_FAILURE]: deleteEnrollmentFailure,

  [REMOVE_ERROR]: removeError,
})

export default CourseReducer
