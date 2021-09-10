import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  registerExam: ["studentID", "examPeriodID", "courseID"],
  registerExamSuccess: ["status"],
  registerExamFailure: ["error"],

  editExam: ["exam"],
  editExamSuccess: ["exam"],
  editExamFailure: ["error"],

  deleteExam: ["examID"],
  deleteExamSuccess: ["examID"],
  deleteExamFailure: ["error"],

  getAllExams: null,
  getAllExamsSuccess: ["allExams"],
  getAllExamsFailure: ["error"],

  removeError: null,
})

export { Types }
export { Creators }
