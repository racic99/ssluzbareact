import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  getTeacher: ["teacherID"],
  getTeacherSuccess: ["teacher"],
  getTeacherFailure: ["error"],

  getTeacherCourses: ["teacherID"],
  getTeacherCoursesSuccess: ["teacherCourses"],
  getTeacherCoursesFailure: ["error"],

  getAllTeachers: null,
  getAllTeachersSuccess: ["allTeachers"],
  getAllTeachersFailure: ["error"],

  deleteTeacher: ["teacherID"],
  deleteTeacherSuccess: ["teacherID"],
  deleteTeacherFailure: ["error"],

  editTeacher: ["teacher"],
  editTeacherSuccess: ["teacher"],
  editTeacherFailure: ["error"],

  addTeacher: ["username", "password", "firstName", "lastName", "teacherRank"],
  addTeacherSuccess: ["teacher"],
  addTeacherFailure: ["error"],

  removeError: null,
})

export { Types }
export { Creators }
