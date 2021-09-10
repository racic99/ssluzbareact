/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import OffcanvasComponent from "../../components/Offcanvas";
import Datetime from 'react-datetime';
import "../../../node_modules/react-datetime/css/react-datetime.css";

import { Creators as ExamCreators } from "../../store/Exam";

const { 
  getAllExams,
  deleteExam,
  editExam,
} = ExamCreators

const AdminExamsPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const allExams = useSelector(({ exam }) => exam.allExams)

  const [examDateModalInfo, setExamDateModalInfo] = useState(null)

  const [examDateModal, setExamDateModal] = useState(new Date())

  const [submittable, setSubmittable] = useState(false)
  
  const [examDateModalError, setExamDateModalError] = useState("")

  const [labPoints, setLabPoints] = useState("0")
  const [examPoints, setExamPoints] = useState("0")
  const [examPointsModalInfo, setExamPointsModalInfo] = useState(null)

  const [editExamError, setEditExamError] = useState(null)

  const assignValue = val => {
    if(val === null){
       return new Date(8640000000000000);
    }
    else{
       return new Date(val);
    };
 };

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        dispatch(getAllExams())
      } else if (authority === "NASTAVNIK") {
        history.push('/nastavnik')
      } else if (authority === "STUDENT") {
        history.push('/student')
      }
    }
  }, [dispatch, user, authority])

  useEffect(() => {
    if (examDateModalInfo !== null) {
      if (examDateModal >= new Date(examDateModalInfo.examPeriod.endDate)) {
        setSubmittable(false)
        setExamDateModalError("Vreme početka ispita ne može biti isto kao vreme kraja ispitnog roka ili nakon kraja ispitnog roka")
      } else if (examDateModal < new Date(examDateModalInfo.examPeriod.startDate)) {
        setSubmittable(false)
        setExamDateModalError("Vreme početka ispita ne može biti pre početka ispitnog roka")
      } else if (examDateModal <= new Date()) {
        setSubmittable(false)
        setExamDateModalError("Datum može da bude isključivo u budućnosti")
      } else {
        setSubmittable(true)
        setExamDateModalError(null)
      }
    } else {
      setSubmittable(false)
      setExamDateModalError("Odaberi ispit")
    }
  }, [examDateModal])

  const addExamDateModalInfo = (exam) => {
    setSubmittable(false)
    setExamDateModalInfo(exam)

    setExamDateModal(new Date())
  }

  const saveExamDateFunc = () => {
    examDateModalInfo.date = new Date(examDateModal.setSeconds(0, 0))
    dispatch(editExam(examDateModalInfo))
  }

  const editExamPointsModalInfo = (exam) => {
    setLabPoints(String(exam.labPoints))
    setExamPoints(String(exam.examPoints))
    setSubmittable(false)
    setExamPointsModalInfo(exam)
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
    examPointsModalInfo.labPoints = labPoints
    examPointsModalInfo.examPoints = examPoints
    dispatch(editExam(examPointsModalInfo))
  }

  return ( 
    <div>
      <Navbar />
      <OffcanvasComponent />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center text-altorange m-3 fw-bold">Ispiti</h2>
        <div style={{width: "100%"}} className="table-responsive">
          <table className="table table-bordered text-light text-center align-middle">
            <thead className="align-middle">
                <tr className="bg-lightdark">
                  <th>Ispitni Rok</th>
                  <th>Predmet</th>
                  <th>Poeni sa Predispitnih Obaveza</th>
                  <th>Poeni sa Ispita</th>
                  <th>Vreme Održavanja Ispita</th>
                  <th>Student</th>
                  <th>Izmena</th>
                  <th>Brisanje</th>
                </tr>
            </thead>
            <tbody>
              { allExams && allExams.sort(function(a, b){return assignValue(b.date) - assignValue(a.date)}).map((exam) => (
                <tr key={exam.id}>
                  <td>{ exam.examPeriod.name }</td>
                  <td>{ exam.course.name }</td>
                  <td>{ exam.labPoints }</td>
                  <td>{ exam.examPoints }</td>
                  <td>{ exam.date ? moment(exam.date).format("DD/MM/YYYY HH:mm") : <button onClick={() => addExamDateModalInfo(exam)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#examDateModal">Unesi Datum</button> }</td>
                  <td>{ exam.student.firstName + " " + exam.student.lastName + " | " + exam.student.cardNumber.toUpperCase() }</td>
                  <td> { exam.date ? <button onClick={() => editExamPointsModalInfo(exam)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#examPointsModal">Izmena</button> : "Datum Mora Postojati" }</td>
                  <td><button type="button" className="btn btn-danger" onClick={() => dispatch(deleteExam(exam.id))} >Obrisi</button></td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>

        <div className="modal fade" id="examDateModal" tabIndex="-1" aria-labelledby="examDateModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="examDateModalLabel">Podesavanje Vremena Održavanja Ispita</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="examDateInput" className="form-label mt-1 mb-1 text-secondary">Vreme Održavanja Ispita:</label>
                    <Datetime
                      dateFormat={moment(examDateModal).format("DD/MM/YYYY")}
                      className="input"
                      id="examDateInput"
                      required
                      value={examDateModal}
                      onChange={(e) => setExamDateModal(e._d)}
                    />
                  </div>
                  { examDateModalError && <p className="text-danger mb-0 mt-3">{ examDateModalError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => saveExamDateFunc()} disabled={!submittable} data-bs-dismiss={submittable === false ? "" : "modal"} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="examPointsModal" tabIndex="-1" aria-labelledby="examPointsModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="examPointsModalLabel">Unos Bodova sa Ispita</h5>
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
 
export default AdminExamsPage;