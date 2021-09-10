/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import reduxStore from "./store"
import { PersistGate } from "redux-persist/lib/integration/react"
import StudentPage from './pages/Student';
import { Offcanvas } from 'bootstrap';
import TeacherPage from './pages/Teacher';
import AdminPage from './pages/Admin';
import AdminCoursesPage from './pages/Admin/courses';
import AdminTeachersPage from './pages/Admin/teachers';
import AdminExamPeriodsPage from './pages/Admin/exam-periods';
import AdminDocumentsPage from './pages/Admin/documents';
import AdminPaymentsPage from './pages/Admin/payments';
import AdminExamsPage from './pages/Admin/exams';
import NewAdminPage from './pages/Admin/new-admin';

const { persistor, store } = reduxStore()

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/student">
                <StudentPage />
              </Route>
              <Route exact path="/teacher">
                <TeacherPage />
              </Route>
              <Route exact path="/admin/students">
                <AdminPage />
              </Route>
              <Route exact path="/admin/courses">
                <AdminCoursesPage />
              </Route>
              <Route exact path="/admin/teachers">
                <AdminTeachersPage />
              </Route>
              <Route exact path="/admin/exam-periods">
                <AdminExamPeriodsPage />
              </Route>
              <Route exact path="/admin/documents">
                <AdminDocumentsPage />
              </Route>
              <Route exact path="/admin/payments">
                <AdminPaymentsPage />
              </Route>
              <Route exact path="/admin/exams">
                <AdminExamsPage />
              </Route>
              <Route exact path="/admin/new-admin">
                <NewAdminPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
