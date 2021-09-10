import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  getExamPeriodCourses: ["studentID", "examPeriodID"],
  getExamPeriodCoursesSuccess: ["examPeriodCourses"],
  getExamPeriodCoursesFailure: ["error"],

  getCourseStudents: ["courseID"],
  getCourseStudentsSuccess: ["courseStudents"],
  getCourseStudentsFailure: ["error"],

  getStudentCourseFinishedExams: ["courseID"],
  getStudentCourseFinishedExamsSuccess: ["studentCourseFinishedExams"],
  getStudentCourseFinishedExamsFailure: ["error"],

  getAllCourses: null,
  getAllCoursesSuccess: ["allCourses"],
  getAllCoursesFailure: ["error"],

  deleteCourse: ["courseID"],
  deleteCourseSuccess: ["courseID"],
  deleteCourseFailure: ["error"],

  editCourse: ["course"],
  editCourseSuccess: ["course"],
  editCourseFailure: ["error"],

  addCourse: ["course"],
  addCourseSuccess: ["course"],
  addCourseFailure: ["error"],

  addEnrollment: ["enrollment"],
  addEnrollmentSuccess: ["enrollment"],
  addEnrollmentFailure: ["error"],

  deleteEnrollment: ["enrollmentID"],
  deleteEnrollmentSuccess: ["enrollmentID"],
  deleteEnrollmentFailure: ["error"],

  removeError: null,
})

export { Types }
export { Creators }
