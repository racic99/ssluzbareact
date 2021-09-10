/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import { Creators as TeacherCreators } from "../../store/Teacher";
import { Creators as CourseCreators } from "../../store/Course";
import { Creators as ExamCreators } from "../../store/Exam";
import moment from "moment";
import { useState } from "react";

const {
  getTeacher,
  getTeacherCourses,
} = TeacherCreators

const {
  getCourseStudents,
  getStudentCourseFinishedExams,
} = CourseCreators

const {
  editExam,
} = ExamCreators

const TeacherPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const loading = useSelector(({ teacher }) => teacher.loading)
  const error = useSelector(({ teacher }) => teacher.error)

  const teacher = useSelector(({ teacher }) => teacher.teacher)
  const teacherCourses = useSelector(({ teacher }) => teacher.teacherCourses)
  const courseStudents = useSelector(({ course }) => course.courseStudents)
  const studentCourseFinishedExams = useSelector(({ course }) => course.studentCourseFinishedExams)

  const [labPoints, setLabPoints] = useState("0")
  const [examPoints, setExamPoints] = useState("0")
  const [submittable, setSubmittable] = useState(false)
  const [selectedExam, setSelectedExam] = useState({})

  const [editExamError, setEditExamError] = useState(null)

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        history.push('/admin/students')
      } else if (authority === "NASTAVNIK") {
        dispatch(getTeacher(user.teacherid))
        dispatch(getTeacherCourses(user.teacherid))
      } else if (authority === "STUDENT") {
        history.push('/student')
      }
    }
  }, [dispatch, user, authority])

  const courseInfo = (courseID) => {
    dispatch(getCourseStudents(courseID))
    dispatch(getStudentCourseFinishedExams(courseID))
  }

  const editExamModalInfo = (exam) => {
    if (labPoints !== "0") {
      setLabPoints("0")
    }
    if (examPoints !== "0") {
      setExamPoints("0")
    }
    setSubmittable(false)
    setSelectedExam(exam)
  }

  useEffect(() => {
    if (labPoints === "" || examPoints === "") {
      setSubmittable(false)
      setEditExamError("Morate uneti obe vrednosti")
    } else if (!(labPoints.match(/^[0-9]+$/) && examPoints.match(/^[0-9]+$/))) {
      setSubmittable(false)
      setEditExamError("Bodovi mogu da budu samo broj")
    } else if (Number(labPoints) + Number(examPoints) === 0) {
      setSubmittable(false)
      setEditExamError("Zbir bodova mora biti bar 1")
    } else if (Number(labPoints) + Number(examPoints) > 100) {
      setSubmittable(false)
      setEditExamError("Zbir bodova ne moze prelaziti 100")
    } else {
      setSubmittable(true)
      setEditExamError(null)
    }
  }, [labPoints, examPoints])

  const editExamFunc = () => {
    if (submittable) {
      selectedExam.labPoints = labPoints
      selectedExam.examPoints = examPoints
      dispatch(editExam(selectedExam))
      setTimeout(() => {
        dispatch(getStudentCourseFinishedExams(selectedExam.course.id))
        setSelectedExam({})
      }, 1000);
    }
  }
  return ( 
    <div>
      <Navbar />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        { loading && 
        <div className="spinner-border text-altorange mt-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        }
        { error && <div className="text-danger mt-3">{ error }</div> }
        <div className="row justify-content-center mb-3 align-items-start">
          { teacher &&
            <div className="d-flex flex-column align-items-center justify-content-center my-4 col-12 col-lg-4">
              <h2 className="text-center text-altorange mt-3 fw-bold">Nastavnik</h2>
              <ul className="list-group list-group-flush">
                <li style={{width: "300px"}} className="list-group-item bg-altdark text-light border-bottom border-altorange d-flex justify-content-between align-items-center">
                  <p className="m-0">Uloga</p>
                  <p className="m-0">{ teacher.teacherRank }</p>
                </li>
                <li style={{width: "300px"}} className="list-group-item bg-altdark text-light border-bottom border-altorange d-flex justify-content-between align-items-center">
                  <p className="m-0">Ime</p>
                  <p className="m-0">{ teacher.firstName }</p>
                </li>
                <li style={{width: "300px"}} className="list-group-item bg-altdark text-light border-bottom border-altorange d-flex justify-content-between align-items-center">
                  <p className="m-0">Prezime</p>
                  <p className="m-0">{ teacher.lastName }</p>
                </li>
              </ul>
            </div>
          }
        </div>

        <h2 className="text-center text-altorange m-3 fw-bold">Vaši Kursevi</h2>

        <div className="accordion align-self-stretch" id="teacherCoursesAccordion">
          { teacherCourses && teacherCourses.map((course, index) => (
            <div key={course.id} className="accordion-item bg-altdark border-light">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button onClick={() => courseInfo(course.id)} className="accordion-button collapsed bg-altdark text-altorange fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  {course.name}
                </button>
              </h2>
              <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#teacherCoursesAccordion">
                <div className="accordion-body">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h2 className="text-center text-altorange fw-bold">Studenti na Vašem Kursu</h2>
                    <div style={{width: "100%"}} className="table-responsive">
                      <table className="table table-bordered text-light text-center align-middle">
                        <thead className="align-middle">
                            <tr className="bg-lightdark">
                              <th>Ime i Prezime</th>
                              <th>Broj Indeksa</th>
                              <th>Pocetak Kursa</th>
                              <th>Zavrsetak Kursa</th>
                            </tr>
                        </thead>
                        <tbody>
                          { courseStudents && courseStudents.sort(function(a, b){return new Date(a.endDate) - new Date(b.endDate)}).map((student) => (
                            <tr key={student.id}>
                              <td>{ student.student.firstName + " " + student.student.lastName }</td>
                              <td>{ student.student.cardNumber.toUpperCase() }</td>
                              <td>{ moment(student.startDate).format("DD/MM/YYYY") }</td>
                              <td>{ moment(student.endDate).format("DD/MM/YYYY") }</td>
                            </tr>
                          )) }
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h2 className="text-center text-altorange mt-4 fw-bold">Ispiti za Ocenjivanje</h2>
                    <div style={{width: "100%"}} className="table-responsive">
                      <table className="table table-bordered text-light text-center align-middle">
                        <thead className="align-middle">
                            <tr className="bg-lightdark">
                              <th>Predmet</th>
                              <th>Datum Odrzavanja</th>
                              <th>Ime i Prezime</th>
                              <th>Broj Indeksa</th>
                              <th>Oceni Ispit</th>
                            </tr>
                        </thead>
                        <tbody>
                          { studentCourseFinishedExams && studentCourseFinishedExams.sort(function(a, b){return new Date(a.date) - new Date(b.date)}).map((exam) => (
                            <tr key={exam.id}>
                              <td>{ exam.course.name }</td>
                              <td>{ moment(exam.date).format("DD/MM/YYYY") }</td>
                              <td>{ exam.student.firstName + " " + exam.student.lastName }</td>
                              <td>{ exam.student.cardNumber.toUpperCase() }</td>
                              <td><button onClick={() => editExamModalInfo(exam)} type="button" data-bs-toggle="modal" data-bs-target="#editExamTeacher" className="btn btn-altorange">Oceni Ispit</button></td>
                            </tr>
                          )) }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal fade" id="editExamTeacher" tabIndex="-1" aria-labelledby="editExamTeacherLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editExamTeacherLabel">Unos Bodova sa Ispita</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="labPointsInput" className="form-label mt-1 mb-1 text-secondary">Bodovi sa Vezbi:</label>
                    <input
                      type="number"
                      className="form-control input"
                      id="labPointsInput"
                      required
                      max={100 - examPoints}
                      value={labPoints}
                      onChange={(e) => setLabPoints(e.target.value)}
                    />
                    <label htmlFor="examPointsInput" className="form-label mt-1 mb-1 text-secondary">Bodovi sa Ispita:</label>
                    <input
                      type="number"
                      className="form-control input"
                      id="examPointsInput"
                      required
                      max={100 - labPoints}
                      value={examPoints}
                      onChange={(e) => setExamPoints(e.target.value)}
                    />
                  </div>
                  { editExamError && <p className="text-danger mb-0 mt-3">{ editExamError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => editExamFunc()} disabled={!submittable} data-bs-dismiss={submittable === false ? "" : "modal"} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
 
export default TeacherPage;