/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import OffcanvasComponent from "../../components/Offcanvas";
import Select from 'react-select'
import Datetime from 'react-datetime';
import "../../../node_modules/react-datetime/css/react-datetime.css";

import { Creators as CourseCreators } from "../../store/Course";
import { Creators as StudentCreators } from "../../store/Student";

const { 
  getAllCourses,
  deleteCourse,
  editCourse,
  addCourse,
  getCourseStudents,
  addEnrollment,
  deleteEnrollment,
} = CourseCreators

const { 
  getAllStudents,
} = StudentCreators

const AdminCoursesPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const allCourses = useSelector(({ course }) => course.allCourses)
  const courseStudents = useSelector(({ course }) => course.courseStudents)
  const allStudents = useSelector(({ student }) => student.allStudents)

  const [courseModalInfo, setCourseModalInfo] = useState({})

  const [courseModalName, setCourseModalName] = useState("")

  const [submittable, setSubmittable] = useState(false)

  const [courseModalError, setCourseModalError] = useState("")

  // Course Students

  const [selectedCourse, setSelectedCourse] = useState({})

  const [courseStudentsModalStudent, setCourseStudentsModalStudent] = useState(null)
  const [courseStudentsModalStartDate, setCourseStudentsModalStartDate] = useState(new Date())
  const [courseStudentsModalEndDate, setCourseStudentsModalEndDate] = useState(new Date())

  const [studentsSelect, setStudentsSelect] = useState([])

  const [courseStudentsModalError, setCourseStudentsModalError] = useState("")
  
  const [studentSubmittable, setStudentSubmittable] = useState(false)

  const selectStudentRef = useRef();

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        dispatch(getAllCourses())
        dispatch(getAllStudents())
      } else if (authority === "NASTAVNIK") {
        history.push('/nastavnik')
      } else if (authority === "STUDENT") {
        history.push('/student')
      }
    }
  }, [dispatch, user, authority])

  useEffect(() => {
    let tempStudents = []
    let courseStudentsIDs = []
    courseStudents.forEach(student => {
      courseStudentsIDs.push(student.student.id)
    })
    allStudents.forEach(student => {
      if (!courseStudentsIDs.includes(student.id)) {
        tempStudents.push({value: student, label: student.firstName + " " + student.lastName + " | " + student.cardNumber.toUpperCase()})
      }
    })
    setStudentsSelect(tempStudents)
  }, [courseStudents])

  const editCourseModalInfo = (course) => {
    setSubmittable(false)
    setCourseModalInfo(course)

    setCourseModalName(course.name)
  }

  const addCourseModalInfo = () => {
    setSubmittable(false)
    setCourseModalInfo(null)

    setCourseModalName("")
  }

  useEffect(() => {
    if (courseModalName.trim() === "") {
      setSubmittable(false)
      setCourseModalError("Morate uneti ime predmeta")
    } else if (!(courseModalName.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/))) {
      setSubmittable(false)
      setCourseModalError("Predmet može sadržati isključivo slova")
    } else {
      setSubmittable(true)
      setCourseModalError(null)
    }
  }, [courseModalName])

  const saveCourseFunc = () => {
    if (courseModalInfo === null) {
      let tempCourse = {}
      tempCourse.name = courseModalName.trim()
      dispatch(addCourse(tempCourse))
      return
    }
    if (courseModalInfo !== null) {
      courseModalInfo.name = courseModalName.trim()
      dispatch(editCourse(courseModalInfo))
      return
    }
  }

  const courseStudentsModalInfo = (course) => {
    selectStudentRef.current.select.clearValue()

    setSelectedCourse(course)

    dispatch(getCourseStudents(course.id))

    setStudentSubmittable(false)

    setCourseStudentsModalStudent(null)
    setCourseStudentsModalStartDate(new Date())
    setCourseStudentsModalEndDate(new Date())
  }

  useEffect(() => {
    if (courseStudentsModalStudent === null) {
      setStudentSubmittable(false)
      setCourseStudentsModalError("Morate izabrati studenta")
    } else if(courseStudentsModalStartDate >= courseStudentsModalEndDate) {
      setStudentSubmittable(false)
      setCourseStudentsModalError("Datum početka ne može biti nakon datuma kraja kursa ili jednak tom datumu")
    } else if(courseStudentsModalStartDate <= new Date(new Date().setHours(0, 0, 0, 0)) || courseStudentsModalEndDate <= new Date(new Date().setHours(0, 0, 0, 0))) {
      setStudentSubmittable(false)
      setCourseStudentsModalError("Datumi mogu da budu isključivo u budućnosti")
    } else {
      setStudentSubmittable(true)
      setCourseStudentsModalError(null)
    }
  }, [courseStudentsModalStudent, courseStudentsModalStartDate, courseStudentsModalEndDate])

  const saveCourseStudentFunc = () => {

    const startDate = courseStudentsModalStartDate
    const endDate = courseStudentsModalEndDate

    startDate.setHours(0, 0, 0, 0);

    endDate.setHours(0, 0, 0, 0);

    let tempEnrollment = {}
    tempEnrollment.student = courseStudentsModalStudent.value
    tempEnrollment.startDate = startDate
    tempEnrollment.endDate = endDate
    tempEnrollment.course = selectedCourse

    dispatch(addEnrollment(tempEnrollment))

    setCourseStudentsModalStudent(null)
    setCourseStudentsModalStartDate(new Date())
    setCourseStudentsModalEndDate(new Date())
    selectStudentRef.current.select.clearValue()
  }

  return ( 
    <div>
      <Navbar />
      <OffcanvasComponent />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center text-altorange m-3 fw-bold">Predmeti</h2>
        <div style={{width: "100%"}} className="table-responsive">
          <table className="table table-bordered text-light text-center align-middle">
            <thead className="align-middle">
                <tr className="bg-lightdark">
                  <th>Naziv Predmeta</th>
                  <th>Izmena</th>
                  <th>Brisanje</th>
                  <th>Studenti Na Kursu</th>
                </tr>
            </thead>
            <tbody>
              { allCourses && allCourses.map((course) => (
                <tr key={course.id}>
                  <td>{ course.name }</td>
                  <td><button onClick={() => editCourseModalInfo(course)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#courseModal">Izmeni</button></td>
                  <td><button onClick={() => dispatch(deleteCourse(course.id))} className="btn btn-danger" >Obrisi</button></td>
                  <td><button onClick={() => courseStudentsModalInfo(course)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#courseStudentsModal">Pogledaj Studente</button></td>
                </tr>
              )) }
            </tbody>
          </table>
          <button onClick={() => addCourseModalInfo()} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#courseModal">Dodaj Predmet</button>
        </div>

        <div className="modal fade" id="courseModal" tabIndex="-1" aria-labelledby="courseModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="courseModalLabel">Podaci o Predmetu</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="courseNameInput" className="form-label mt-1 mb-1 text-secondary">Ime Predmeta:</label>
                    <input
                      type="text"
                      className="form-control input"
                      id="courseNameInput"
                      required
                      value={courseModalName}
                      onChange={(e) => setCourseModalName(e.target.value)}
                    />
                  </div>
                  { courseModalError && <p className="text-danger mb-0 mt-3">{ courseModalError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => saveCourseFunc()} disabled={!submittable} data-bs-dismiss={submittable === false ? "" : "modal"} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="courseStudentsModal" tabIndex="-1" aria-labelledby="courseStudentsModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="courseStudentsModalLabel">Studenti Na Ovom Kursu</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div style={{width: "100%"}} className="table-responsive">
                  <table className="table table-bordered text-lightdark text-center align-middle">
                    <thead className="align-middle">
                        <tr className="bg-lightdark text-light">
                          <th>Student</th>
                          <th>Početak Kursa</th>
                          <th>Završetak Kursa</th>
                          <th>Obriši</th>
                        </tr>
                    </thead>
                    <tbody>
                      { courseStudents && courseStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{ student.student.firstName + " " + student.student.lastName + " " + student.student.cardNumber.toUpperCase() }</td>
                          <td>{ moment(student.startDate).format("DD/MM/YYYY") }</td>
                          <td>{ moment(student.endDate).format("DD/MM/YYYY") }</td>
                          <td><button onClick={() => dispatch(deleteEnrollment(student.id))} className="btn btn-danger" >Obrisi</button></td>
                        </tr>
                      )) }
                    </tbody>
                  </table>
                </div>
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="courseStudentSelect" className="form-label mt-1 mb-1 text-secondary">Student:</label>
                    <Select
                      defaultValue={''}
                      name="student"
                      id="courseStudentSelect"
                      options={studentsSelect}
                      className="basic-single select"
                      classNamePrefix="select"
                      isSearchable
                      isClearable
                      onChange={(e) => setCourseStudentsModalStudent(e) }
                      ref={selectStudentRef}
                    />
                    <label htmlFor="courseStudentsStartDate" className="form-label mt-1 mb-1 text-secondary">Datum Početka:</label>
                    <Datetime
                      dateFormat={moment(courseStudentsModalStartDate).format("DD/MM/YYYY")}
                      timeFormat={false}
                      className="input"
                      id="courseStudentsStartDate"
                      required
                      value={courseStudentsModalStartDate}
                      onChange={(e) => setCourseStudentsModalStartDate(e._d)}
                    />
                    <label htmlFor="courseStudentsEndDateInput" className="form-label mt-1 mb-1 text-secondary">Datum Završetka:</label>
                    <Datetime
                      dateFormat={moment(courseStudentsModalEndDate).format("DD/MM/YYYY")}
                      timeFormat={false}
                      className="input"
                      id="courseStudentsEndDateInput"
                      required
                      value={courseStudentsModalEndDate}
                      onChange={(e) => setCourseStudentsModalEndDate(e._d)}
                    />
                  </div>
                  { courseStudentsModalError && <p className="text-danger mb-0 mt-3">{ courseStudentsModalError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => saveCourseStudentFunc()} disabled={!studentSubmittable} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
 
export default AdminCoursesPage;