import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  getNextExamPeriods: null,
  getNextExamPeriodsSuccess: ["nextExamPeriods"],
  getNextExamPeriodsFailure: ["error"],

  getAllExamPeriods: null,
  getAllExamPeriodsSuccess: ["allExamPeriods"],
  getAllExamPeriodsFailure: ["error"],

  deleteExamPeriod: ["examPeriodID"],
  deleteExamPeriodSuccess: ["examPeriodID"],
  deleteExamPeriodFailure: ["error"],

  editExamPeriod: ["examPeriod"],
  editExamPeriodSuccess: ["examPeriod"],
  editExamPeriodFailure: ["error"],

  addExamPeriod: ["examPeriod"],
  addExamPeriodSuccess: ["examPeriod"],
  addExamPeriodFailure: ["error"],

  removeError: null,
})

export { Types }
export { Creators }
