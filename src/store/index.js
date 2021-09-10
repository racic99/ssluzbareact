import { combineReducers } from "redux"

import rootSaga from "../saga"
import AccountReducer from "./Auth/Reducer"
import configureStore from "./CreateStore"
import StudentReducer from "./Student/Reducer"
import ExamPeriodReducer from "./ExamPeriod/Reducer"
import ExamReducer from "./Exam/Reducer"
import CourseReducer from "./Course/Reducer"
import TeacherReducer from "./Teacher/Reducer"
import DocumentReducer from "./Document/Reducer"
import PaymentReducer from "./Payment/Reducer"

const createStore = () => {
  const rootReducer = combineReducers({
    auth: AccountReducer,
    student: StudentReducer,
    examPeriod: ExamPeriodReducer,
    exam: ExamReducer,
    course: CourseReducer,
    teacher: TeacherReducer,
    document: DocumentReducer,
    payment: PaymentReducer,
  })

  return configureStore(rootReducer, rootSaga)
}

export default createStore
