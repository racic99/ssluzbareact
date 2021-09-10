/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import OffcanvasComponent from "../../components/Offcanvas";
import Datetime from 'react-datetime';
import "../../../node_modules/react-datetime/css/react-datetime.css";

import { Creators as ExamPeriodCreators } from "../../store/ExamPeriod";

const { 
  addExamPeriod,
  deleteExamPeriod,
  editExamPeriod,
  getAllExamPeriods,
} = ExamPeriodCreators

const AdminExamPeriodsPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const allExamPeriods = useSelector(({ examPeriod }) => examPeriod.allExamPeriods)

  const [examPeriodModalInfo, setExamPeriodModalInfo] = useState({})

  const [examPeriodModalName, setExamPeriodModalName] = useState("")
  const [examPeriodModalStartDate, setExamPeriodModalStartDate] = useState(new Date())
  const [examPeriodModalEndDate, setExamPeriodModalEndDate] = useState(new Date())

  const [submittable, setSubmittable] = useState(false)

  const [examPeriodModalError, setExamPeriodModalError] = useState("")

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        dispatch(getAllExamPeriods())
      } else if (authority === "NASTAVNIK") {
        history.push('/nastavnik')
      } else if (authority === "STUDENT") {
        history.push('/student')
      }
    }
  }, [dispatch, user, authority])

  const editExamPeriodModalInfo = (examPeriod) => {
    setSubmittable(false)
    setExamPeriodModalInfo(examPeriod)

    setExamPeriodModalName(examPeriod.name)
    setExamPeriodModalStartDate(new Date(examPeriod.startDate))
    setExamPeriodModalEndDate(new Date(examPeriod.endDate))
  }

  const addExamPeriodModalInfo = () => {
    setSubmittable(false)
    setExamPeriodModalInfo(null)

    setExamPeriodModalName("")
    setExamPeriodModalStartDate(new Date())
    setExamPeriodModalEndDate(new Date())
  }

  useEffect(() => {
    if (examPeriodModalName.trim() === "") {
      setSubmittable(false)
      setExamPeriodModalError("Morate uneti ime ispitnog roka")
    } else if (!(examPeriodModalName.match(/^[a-zA-ZšŠđĐžŽćĆčČ0-9\s]+$/))) {
      setSubmittable(false)
      setExamPeriodModalError("Ispitni rok može sadržati isključivo slova i brojeve")
    } else if (examPeriodModalStartDate >= examPeriodModalEndDate) {
      setSubmittable(false)
      setExamPeriodModalError("Datum početka ne može biti nakon datuma kraja ispitnog roka ili jednak tom datumu")
    } else if (examPeriodModalInfo === null && (examPeriodModalStartDate <= new Date() || examPeriodModalEndDate <= new Date())) {
      setSubmittable(false)
      setExamPeriodModalError("Datumi mogu da budu isključivo u budućnosti")
    } else {
      setSubmittable(true)
      setExamPeriodModalError(null)
    }
  }, [examPeriodModalName, examPeriodModalStartDate, examPeriodModalEndDate])

  const saveExamPeriodFunc = () => {

    const startDate = examPeriodModalStartDate
    const endDate = examPeriodModalEndDate

    startDate.setHours(0, 0, 0, 0);

    endDate.setHours(0, 0, 0, 0);

    if (examPeriodModalInfo === null) {
      let tempExamPeriod = {}
      tempExamPeriod.name = examPeriodModalName.trim()
      tempExamPeriod.startDate = startDate
      tempExamPeriod.endDate = endDate
      dispatch(addExamPeriod(tempExamPeriod))
      return
    }
    if (examPeriodModalInfo !== null) {
      examPeriodModalInfo.name = examPeriodModalName.trim()
      examPeriodModalInfo.startDate = startDate
      examPeriodModalInfo.endDate = endDate
      dispatch(editExamPeriod(examPeriodModalInfo))
      return
    }
  }

  return ( 
    <div>
      <Navbar />
      <OffcanvasComponent />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center text-altorange m-3 fw-bold">Ispitni Rokovi</h2>
        <div style={{width: "100%"}} className="table-responsive">
          <table className="table table-bordered text-light text-center align-middle">
            <thead className="align-middle">
                <tr className="bg-lightdark">
                  <th>Ispitni Rok</th>
                  <th>Datum Početka</th>
                  <th>Datum završetka</th>
                  <th>Izmena</th>
                  <th>Brisanje</th>
                </tr>
            </thead>
            <tbody>
              { allExamPeriods && allExamPeriods.sort(function(a, b){return new Date(a.endDate) - new Date(b.endDate)}).map((examPeriod) => (
                <tr key={examPeriod.id}>
                  <td>{ examPeriod.name }</td>
                  <td>{ moment(examPeriod.startDate).format("DD/MM/YYYY") }</td>
                  <td>{ moment(examPeriod.endDate).format("DD/MM/YYYY") }</td>
                  <td><button onClick={() => editExamPeriodModalInfo(examPeriod)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#examPeriodModal">Izmeni</button></td>
                  <td><button onClick={() => dispatch(deleteExamPeriod(examPeriod.id))} type="button" className="btn btn-danger" >Obrisi</button></td>
                </tr>
              )) }
            </tbody>
          </table>
          <button onClick={() => addExamPeriodModalInfo()} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#examPeriodModal">Dodaj Ispitni Rok</button>
        </div>

        <div className="modal fade" id="examPeriodModal" tabIndex="-1" aria-labelledby="examPeriodModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="examPeriodModalLabel">Podaci o Ispitnom Roku</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="examPeriodNameInput" className="form-label mt-1 mb-1 text-secondary">Ime Ispitnog Roka:</label>
                    <input
                      type="text"
                      className="form-control input"
                      id="examPeriodNameInput"
                      required
                      value={examPeriodModalName}
                      onChange={(e) => setExamPeriodModalName(e.target.value)}
                    />
                    <label htmlFor="examPeriodStartDateInput" className="form-label mt-1 mb-1 text-secondary">Datum Početka:</label>
                    <Datetime
                      dateFormat={moment(examPeriodModalStartDate).format("DD/MM/YYYY")}
                      timeFormat={false}
                      className="input"
                      id="examPeriodStartDateInput"
                      required
                      value={examPeriodModalStartDate}
                      onChange={(e) => setExamPeriodModalStartDate(e._d)}
                    />
                    <label htmlFor="examPeriodEndDateInput" className="form-label mt-1 mb-1 text-secondary">Datum Završetka:</label>
                    <Datetime
                      dateFormat={moment(examPeriodModalEndDate).format("DD/MM/YYYY")}
                      timeFormat={false}
                      className="input"
                      id="examPeriodEndDateInput"
                      required
                      value={examPeriodModalEndDate}
                      onChange={(e) => setExamPeriodModalEndDate(e._d)}
                    />
                  </div>
                  { examPeriodModalError && <p className="text-danger mb-0 mt-3">{ examPeriodModalError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => saveExamPeriodFunc()} disabled={!submittable} data-bs-dismiss={submittable === false ? "" : "modal"} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
 
export default AdminExamPeriodsPage;