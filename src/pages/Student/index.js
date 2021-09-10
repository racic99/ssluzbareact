/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import 'moment/locale/sr'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";

import { Creators as StudentCreators } from "../../store/Student";
import { Creators as ExamPeriodCreators } from "../../store/ExamPeriod";
import { Creators as ExamCreators } from "../../store/Exam";
import { Creators as CourseCreators } from "../../store/Course";

const { 
  getStudent,
  getStudentCourses,
  getStudentDocuments,
  getStudentPayments,
  removeError,
  getStudentFinishedExams,
  getStudentProcessingExams,
  getStudentUpcomingExams,
} = StudentCreators

const { 
  getNextExamPeriods,
} = ExamPeriodCreators

const { 
  getExamPeriodCourses,
} = CourseCreators

const { 
  registerExam,
  deleteExam,
} = ExamCreators

const StudentPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const loading = useSelector(({ student }) => student.loading)
  const error = useSelector(({ student }) => student.error)

  const student = useSelector(({ student }) => student.student)
  const studentCourses = useSelector(({ student }) => student.studentCourses)
  const studentDocuments = useSelector(({ student }) => student.studentDocuments)
  const studentPayments = useSelector(({ student }) => student.studentPayments)
  const studentFinishedExams = useSelector(({ student }) => student.studentFinishedExams)
  const studentProcessingExams = useSelector(({ student }) => student.studentProcessingExams)
  const studentUpcomingExams = useSelector(({ student }) => student.studentUpcomingExams)

  const nextExamPeriods = useSelector(({ examPeriod }) => examPeriod.nextExamPeriods)

  const examPeriodCourses = useSelector(({ course }) => course.examPeriodCourses)

  const [sum, setSum] = useState(0)

  const [examPeriodRegisterExam, setExamPeriodRegisterExam] = useState(null)

  const [registerExamSelectedCourse, setRegisterExamSelectedCourse] = useState("")

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        history.push('/admin/students')
      } else if (authority === "NASTAVNIK") {
        history.push('/teacher')
      } else if (authority === "STUDENT") {
        dispatch(getStudent(user.studentid))
        dispatch(getStudentCourses(user.studentid))
        dispatch(getStudentDocuments(user.studentid))
        dispatch(getStudentPayments(user.studentid))
        dispatch(getStudentFinishedExams(user.studentid))
        dispatch(getStudentProcessingExams(user.studentid))
        dispatch(getStudentUpcomingExams(user.studentid))
        dispatch(getNextExamPeriods())
        setTimeout(() => {
          dispatch(removeError())
        }, 3000);
      }
    }
  }, [dispatch, user, authority])

  useEffect(() => {
    if (studentPayments !== null && studentPayments !== undefined) {
        let sumTemp = 0
        studentPayments.forEach(payment => {
          sumTemp += payment.vrednostUplate
        })
        setSum(sumTemp)
    }
  }, [studentPayments])

  const getOcena = (points) => {
    switch(true) {
      case points >= 91:
        return 10;
      case points >= 81:
        return 9;
      case points >= 71:
        return 8;
      case points >= 61:
        return 7;
      case points >= 51:
        return 6;
      default:
        return 5;
    }
  }

  const cancelExam = (examID) => {
    dispatch(deleteExam(examID))
    setTimeout(() => {
      dispatch(getStudentUpcomingExams(user.studentid))
    }, 1000);
  }

  const registerExamModalInfo = (examPeriod) => {
    document.getElementById("course-input").value = "DEFAULT"
    setExamPeriodRegisterExam(examPeriod)
    dispatch(getExamPeriodCourses(student.id, examPeriod.id))
  }

  const registerExamFunc = (e) => {
    e.preventDefault()

    if (registerExamSelectedCourse !== "") {
      dispatch(registerExam(student.id, examPeriodRegisterExam.id, registerExamSelectedCourse ))
      setTimeout(() => {
        dispatch(getStudentUpcomingExams(user.studentid))
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
          { student &&
            <div className="d-flex flex-column align-items-center justify-content-center my-4 col-12 col-lg-4">
              <h2 className="text-center text-altorange mt-3 fw-bold">Student</h2>
              <ul className="list-group list-group-flush">
                <li style={{width: "300px"}} className="list-group-item bg-altdark text-light border-bottom border-altorange d-flex justify-content-between align-items-center">
                  <p className="m-0">Index</p>
                  <p className="m-0">{ student.cardNumber }</p>
                </li>
                <li style={{width: "300px"}} className="list-group-item bg-altdark text-light border-bottom border-altorange d-flex justify-content-between align-items-center">
                  <p className="m-0">Ime</p>
                  <p className="m-0">{ student.firstName }</p>
                </li>
                <li style={{width: "300px"}} className="list-group-item bg-altdark text-light border-bottom border-altorange d-flex justify-content-between align-items-center">
                  <p className="m-0">Prezime</p>
                  <p className="m-0">{ student.lastName }</p>
                </li>
              </ul>
            </div>
          }
          
          <div className="d-flex flex-column align-items-center justify-content-center my-4 col-12 col-lg-4">
            <h2 className="text-center text-altorange mt-3 fw-bold">Kursevi</h2>
            <ul className="list-group list-group-flush">
              { studentCourses && studentCourses.map((course) => (
                <li key={course.course.id} style={{width: "300px"}} className="list-group-item bg-altdark text-light border-bottom border-altorange d-flex justify-content-center align-items-center">
                  <p className="m-0">{ course.course.name }</p>
                </li>
              ))
              }
            </ul>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center my-4 col-12 col-lg-4">
            <h2 className="text-center text-altorange mt-3 fw-bold">Dokumenti</h2>
            <ul className="list-group list-group-flush">
              { studentDocuments && studentDocuments.map((document) => (
                <li key={document.id} style={{width: "300px"}} className="list-group-item bg-altdark text-light border-bottom border-altorange d-flex justify-content-center align-items-center">
                  <p className="m-0">{ document.naziv }</p>
                </li>
              ))
              }
            </ul>
          </div>
        </div>

        <h2 className="text-center text-altorange m-3 fw-bold">Ispiti</h2>

        <div className="accordion align-self-stretch" id="accordionStudentExams">
          <div className="accordion-item bg-altdark border-light">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button className="accordion-button bg-altdark text-altorange fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Prijava Ispita
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show border-light" aria-labelledby="panelsStayOpen-headingOne">
              <div className="accordion-body">
                <div className="d-flex flex-column align-items-center justify-content-center my-4">
                  <div style={{width: "100%"}} className="table-responsive">
                    <table className="table table-bordered text-light text-center align-middle">
                      <thead className="align-middle">
                          <tr className="bg-lightdark">
                            <th>Ispitni Rok</th>
                            <th>Početak Ispitnog Roka</th>
                            <th>Kraj Ispitnog Roka</th>
                            <th>Prijava</th>
                          </tr>
                      </thead>
                      <tbody>
                        { nextExamPeriods && nextExamPeriods.sort(function(a, b){return new Date(a.endDate) - new Date(b.endDate)}).map((examPeriod) => (
                          <tr key={examPeriod.id}>
                            <td>{ examPeriod.name }</td>
                            <td>{ moment(examPeriod.startDate).format("DD/MM/YYYY") }</td>
                            <td>{ moment(examPeriod.endDate).format("DD/MM/YYYY") }</td>
                            <td><button onClick={() => registerExamModalInfo(examPeriod)} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#registerExam" >Prijavi Ispit u Ovom Roku</button></td>
                          </tr>
                        )) }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item bg-altdark border-light">
            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
              <button className="accordion-button collapsed bg-altdark text-altorange fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Obrada Ispita
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
              <div className="accordion-body">
                <div className="d-flex flex-column align-items-center justify-content-center my-4">
                  <div style={{width: "100%"}} className="table-responsive">
                    <table className="table table-bordered text-light text-center align-middle">
                      <thead className="align-middle">
                          <tr className="bg-lightdark">
                            <th>Naziv Predmeta</th>
                            <th>Ispitni Rok</th>
                            <th>Datum Odrzavanja</th>
                          </tr>
                      </thead>
                      <tbody>
                        { studentProcessingExams && studentProcessingExams.sort(function(a, b){return new Date(a.date) - new Date(b.date)}).map((exam) => (
                          <tr key={exam.id}>
                            <td>{ exam.course.name }</td>
                            <td>{ exam.examPeriod.name }</td>
                            <td>{ moment(exam.date).format("DD/MM/YYYY") }</td>
                          </tr>
                        )) }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item bg-altdark border-light">
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
              <button className="accordion-button collapsed bg-altdark text-altorange fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                Predstojeći Prijavljeni Ispiti
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
              <div className="accordion-body">
                <div className="d-flex flex-column align-items-center justify-content-center my-4">
                  <div style={{width: "100%"}} className="table-responsive">
                    <table className="table table-bordered text-light text-center align-middle">
                      <thead className="align-middle">
                          <tr className="bg-lightdark">
                            <th>Naziv Predmeta</th>
                            <th>Ispitni Rok</th>
                            <th>Datum Odrzavanja</th>
                            <th>Odjava Ispita</th>
                          </tr>
                      </thead>
                      <tbody>
                        { studentUpcomingExams && studentUpcomingExams.sort(function(a, b){return new Date(a.date) - new Date(b.date)}).map((exam) => (
                          <tr key={exam.id}>
                            <td>{ exam.course.name }</td>
                            <td>{ exam.examPeriod.name }</td>
                            <td>{ exam.date === null ? "Biće Određeno" : moment(exam.date).format("DD/MM/YYYY HH:mm") }</td>
                            <td><button className="btn btn-danger" onClick={() => cancelExam(exam.id)}>Odjavi Ispit</button></td>
                          </tr>
                        )) }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item bg-altdark border-light">
            <h2 className="accordion-header" id="panelsStayOpen-headingFour">
              <button className="accordion-button collapsed bg-altdark text-altorange fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                Istorija Polaganja
              </button>
            </h2>
            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
              <div className="accordion-body">
                <div className="d-flex flex-column align-items-center justify-content-center my-4">
                  <div style={{width: "100%"}} className="table-responsive">
                    <table className="table table-bordered text-light text-center align-middle">
                      <thead className="align-middle">
                          <tr className="bg-lightdark">
                            <th>Naziv Predmeta</th>
                            <th>Ispitni Rok</th>
                            <th>Datum Odrzavanja</th>
                            <th>Bodovi sa Vezbi</th>
                            <th>Bodovi sa Ispita</th>
                            <th>Ocena</th>
                          </tr>
                      </thead>
                      <tbody>
                        { studentFinishedExams && studentFinishedExams.sort(function(a, b){return new Date(a.date) - new Date(b.date)}).map((exam) => (
                          <tr key={exam.id}>
                            <td>{ exam.course.name }</td>
                            <td>{ exam.examPeriod.name }</td>
                            <td>{ moment(exam.date).format("DD/MM/YYYY") }</td>
                            <td>{ exam.labPoints }</td>
                            <td>{ exam.examPoints }</td>
                            <td className={ exam.labPoints + exam.examPoints < 51 ? "bg-danger text-light" : "bg-success text-light" }>{ getOcena(exam.labPoints + exam.examPoints) }</td>
                          </tr>
                        )) }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center my-4 align-self-stretch">
          <div style={{width: "100%"}} className="table-responsive">
            <h2 className="text-center text-altorange mt-3 fw-bold">Uplate</h2>
            <table className="table table-bordered text-light text-center align-middle">
              <thead className="align-middle">
                  <tr className="bg-lightdark">
                    <th>Svrha Uplate</th>
                    <th>Vrednost Uplate</th>
                    <th>Datum Uplate</th>
                  </tr>
              </thead>
              <tbody>
                { studentPayments && studentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{ payment.svrhaUplate }</td>
                    <td>{ payment.vrednostUplate }</td>
                    <td>{ moment(payment.date).format("DD/MM/YYYY, HH:mm") }</td>
                  </tr>
                )) }
                { studentPayments && 
                  <tr>
                    <td>Ukupno</td>
                    <td>{ sum }</td>
                    <td></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="modal fade" id="registerExam" tabIndex="-1" aria-labelledby="registerExamLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="registerExamLabel">Prijava Ispita za Rok - { examPeriodRegisterExam && examPeriodRegisterExam.name }</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="courseInput" className="form-label mt-1 mb-1 text-secondary">Predmet:</label>
                    <select
                      id="course-input"
                      type="text"
                      className="form-select"
                      required
                      defaultValue={'DEFAULT'}
                      onChange={(e) => setRegisterExamSelectedCourse(e.target.value)}
                      >
                        <option disabled value="DEFAULT"> Izaberi Predmet </option>
                        {examPeriodCourses &&
                            examPeriodCourses.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={registerExamFunc} data-bs-dismiss={registerExamSelectedCourse === "" ? "" : "modal"} className="btn btn-success">Prijavi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default StudentPage;