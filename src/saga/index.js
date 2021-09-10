/* eslint-disable import/named */
import { all, takeLatest } from "redux-saga/effects"
import { Types as AuthTypes } from "../store/Auth"
import { Types as StudentTypes } from "../store/Student"
import { Types as ExamPeriodTypes } from "../store/ExamPeriod"
import { Types as ExamTypes } from "../store/Exam"
import { Types as CourseTypes } from "../store/Course"
import { Types as TeacherTypes } from "../store/Teacher"
import { Types as DocumentTypes } from "../store/Document"
import { Types as PaymentTypes } from "../store/Payment"
import { createAdmin, login } from "./AuthSaga"
import { 
  changeStudent,
  createStudent,
  fetchAllStudents,
  fetchStudent,
  fetchStudentCourses,
  fetchStudentDocuments,
  fetchStudentFinishedExams,
  fetchStudentPayments,
  fetchStudentProcessingExams,
  fetchStudentUpcomingExams,
  removeStudent,
} from "./StudentSaga"

import { 
  changeExamPeriod,
  createExamPeriod,
  fetchAllExamPeriods,
  fetchNextExamPeriods,
  removeExamPeriod,
} from "./ExamPeriodSaga"

import { 
  changeCourse,
  createCourse,
  createEnrollment,
  fetchAllCourses,
  fetchCourseStudents,
  fetchExamPeriodCourses,
  fetchStudentCourseFinishedExams,
  removeCourse,
  removeEnrollment,
} from "./CourseSaga"

import { 
  removeExam,
  registerNewExam,
  changeExam,
  fetchAllExams,
} from "./ExamSaga"

import {
  changeTeacher,
  createTeacher,
  fetchAllTeachers,
  fetchTeacher,
  fetchTeacherCourses,
  removeTeacher,
} from "./TeacherSaga"

import {
  changeDocument,
  createDocument,
  fetchAllDocuments,
  removeDocument,
} from "./DocumentSaga"

import {
  changePayment,
  createPayment,
  fetchAllPayments,
  removePayment,
} from "./PaymentSaga"

const { GET_ACCOUNT, ADD_ADMIN } = AuthTypes

const { 
  ADD_STUDENT,
  DELETE_STUDENT,
  EDIT_STUDENT,
  GET_STUDENT,
  GET_STUDENT_COURSES,
  GET_STUDENT_DOCUMENTS,
  GET_STUDENT_PAYMENTS,
  GET_STUDENT_FINISHED_EXAMS,
  GET_STUDENT_PROCESSING_EXAMS,
  GET_STUDENT_UPCOMING_EXAMS,
  GET_ALL_STUDENTS,
} = StudentTypes

const { 
  ADD_EXAM_PERIOD,
  DELETE_EXAM_PERIOD,
  EDIT_EXAM_PERIOD,
  GET_NEXT_EXAM_PERIODS,
  GET_ALL_EXAM_PERIODS,
} = ExamPeriodTypes

const { 
  ADD_COURSE,
  ADD_ENROLLMENT,
  DELETE_COURSE,
  DELETE_ENROLLMENT,
  EDIT_COURSE,
  GET_COURSE_STUDENTS,
  GET_EXAM_PERIOD_COURSES,
  GET_STUDENT_COURSE_FINISHED_EXAMS,
  GET_ALL_COURSES,
} = CourseTypes

const { 
  REGISTER_EXAM,
  DELETE_EXAM,
  EDIT_EXAM,
  GET_ALL_EXAMS,
} = ExamTypes

const { 
  ADD_TEACHER,
  DELETE_TEACHER,
  GET_TEACHER,
  GET_TEACHER_COURSES,
  GET_ALL_TEACHERS,
  EDIT_TEACHER,
} = TeacherTypes

const { 
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  EDIT_DOCUMENT,
  GET_ALL_DOCUMENTS,
} = DocumentTypes

const { 
  ADD_PAYMENT,
  DELETE_PAYMENT,
  EDIT_PAYMENT,
  GET_ALL_PAYMENTS,
} = PaymentTypes

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(GET_ACCOUNT, login),
    takeLatest(GET_STUDENT, fetchStudent),
    takeLatest(GET_STUDENT_COURSES, fetchStudentCourses),
    takeLatest(GET_STUDENT_DOCUMENTS, fetchStudentDocuments),
    takeLatest(GET_STUDENT_PAYMENTS, fetchStudentPayments),
    takeLatest(GET_STUDENT_FINISHED_EXAMS, fetchStudentFinishedExams),
    takeLatest(GET_STUDENT_PROCESSING_EXAMS, fetchStudentProcessingExams),
    takeLatest(GET_STUDENT_UPCOMING_EXAMS, fetchStudentUpcomingExams),
    takeLatest(GET_NEXT_EXAM_PERIODS, fetchNextExamPeriods),
    takeLatest(DELETE_EXAM, removeExam),
    takeLatest(GET_EXAM_PERIOD_COURSES, fetchExamPeriodCourses),
    takeLatest(REGISTER_EXAM, registerNewExam),
    takeLatest(GET_TEACHER, fetchTeacher),
    takeLatest(GET_TEACHER_COURSES, fetchTeacherCourses),
    takeLatest(GET_COURSE_STUDENTS, fetchCourseStudents),
    takeLatest(GET_STUDENT_COURSE_FINISHED_EXAMS, fetchStudentCourseFinishedExams),
    takeLatest(EDIT_EXAM, changeExam),
    takeLatest(GET_ALL_STUDENTS, fetchAllStudents),
    takeLatest(GET_ALL_COURSES, fetchAllCourses),
    takeLatest(GET_ALL_TEACHERS, fetchAllTeachers),
    takeLatest(GET_ALL_EXAM_PERIODS, fetchAllExamPeriods),
    takeLatest(GET_ALL_DOCUMENTS, fetchAllDocuments),
    takeLatest(GET_ALL_PAYMENTS, fetchAllPayments),
    takeLatest(GET_ALL_EXAMS, fetchAllExams),
    takeLatest(DELETE_STUDENT, removeStudent),
    takeLatest(DELETE_COURSE, removeCourse),
    takeLatest(DELETE_TEACHER, removeTeacher),
    takeLatest(DELETE_EXAM_PERIOD, removeExamPeriod),
    takeLatest(DELETE_DOCUMENT, removeDocument),
    takeLatest(DELETE_PAYMENT, removePayment),
    takeLatest(EDIT_STUDENT, changeStudent),
    takeLatest(ADD_STUDENT, createStudent),
    takeLatest(ADD_COURSE, createCourse),
    takeLatest(EDIT_COURSE, changeCourse),
    takeLatest(ADD_DOCUMENT, createDocument),
    takeLatest(EDIT_DOCUMENT, changeDocument),
    takeLatest(ADD_PAYMENT, createPayment),
    takeLatest(EDIT_PAYMENT, changePayment),
    takeLatest(ADD_EXAM_PERIOD, createExamPeriod),
    takeLatest(EDIT_EXAM_PERIOD, changeExamPeriod),
    takeLatest(ADD_ENROLLMENT, createEnrollment),
    takeLatest(DELETE_ENROLLMENT, removeEnrollment),
    takeLatest(ADD_ADMIN, createAdmin),
    takeLatest(EDIT_TEACHER, changeTeacher),
    takeLatest(ADD_TEACHER, createTeacher),
  ])
}
