/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import OffcanvasComponent from "../../components/Offcanvas";
import Select from 'react-select'
import Datetime from 'react-datetime';
import "../../../node_modules/react-datetime/css/react-datetime.css";

import { Creators as PaymentCreators } from "../../store/Payment";
import { Creators as StudentCreators } from "../../store/Student";

const { 
  addPayment,
  editPayment,
  deletePayment,
  getAllPayments,
} = PaymentCreators

const { 
  getAllStudents,
} = StudentCreators

const AdminPaymentsPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const allPayments = useSelector(({ payment }) => payment.allPayments)
  const allStudents = useSelector(({ student }) => student.allStudents)

  const [paymentModalInfo, setPaymentModalInfo] = useState({})

  const [paymentModalSvrha, setPaymentModalSvrha] = useState("")
  const [paymentModalVrednost, setPaymentModalVrednost] = useState(0)
  const [paymentModalDate, setPaymentModalDate] = useState(new Date())
  const [paymentModalStudent, setPaymentModalStudent] = useState(null)

  const [submittable, setSubmittable] = useState(false)

  const [paymentModalError, setPaymentModalError] = useState("")

  const [studentsSelect, setStudentsSelect] = useState([])

  const [sum, setSum] = useState(0)

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        dispatch(getAllPayments())
        dispatch(getAllStudents())
      } else if (authority === "NASTAVNIK") {
        history.push('/nastavnik')
      } else if (authority === "STUDENT") {
        history.push('/student')
      }
    }
  }, [dispatch, user, authority])

  useEffect(() => {
    if (allPayments !== null && allPayments !== undefined) {
        let sumTemp = 0
        allPayments.forEach(payment => {
          sumTemp += payment.vrednostUplate
        })
        setSum(sumTemp)
    }
  }, [allPayments])

  useEffect(() => {
    let tempStudents = []
    allStudents.forEach(student => {
      tempStudents.push({value: student, label: student.firstName + " " + student.lastName + " | " + student.cardNumber.toUpperCase()})
    });
    setStudentsSelect(tempStudents)
  }, [allStudents])

  const editPaymentModalInfo = (payment) => {
    setSubmittable(false)
    setPaymentModalInfo(payment)

    setPaymentModalSvrha(payment.svrhaUplate)
    setPaymentModalVrednost(payment.vrednostUplate)
    setPaymentModalDate(new Date(payment.date))
    setPaymentModalStudent(null)
  }

  const addPaymentModalInfo = () => {
    setSubmittable(false)
    setPaymentModalInfo(null)

    setPaymentModalSvrha("")
    setPaymentModalVrednost(0)
    setPaymentModalDate(new Date())
    setPaymentModalStudent(null)
  }

  useEffect(() => {
    if (paymentModalInfo === null) {
      if (paymentModalSvrha.trim() === "" || paymentModalVrednost === 0 || paymentModalStudent === null) {
        setSubmittable(false)
        setPaymentModalError("Morate uneti sve podatke")
      } else if(paymentModalDate >= new Date()) {
        setSubmittable(false)
        setPaymentModalError("Ne možete unositi datum koji je u budućnosti")
      } else if (!paymentModalVrednost.toString().match(/^[0-9]+$/)) {
        setSubmittable(false)
        setPaymentModalError("Vrednost uplate može biti samo broj")
      } else if (!(paymentModalSvrha.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/))) {
        setSubmittable(false)
        setPaymentModalError("Svrha uplate može sadržati isključivo slova")
      } else if (paymentModalVrednost <= 0) {
        setSubmittable(false)
        setPaymentModalError("Vrednost uplate može biti samo pozitivan broj")
      } else {
        setSubmittable(true)
        setPaymentModalError(null)
      }
    } else if (paymentModalInfo !== null) {
      if (paymentModalSvrha.trim() === "" || paymentModalVrednost === 0) {
        setSubmittable(false)
        setPaymentModalError("Morate uneti sve podatke")
      } else if(paymentModalDate >= new Date()) {
        setSubmittable(false)
        setPaymentModalError("Ne možete unositi datum koji je u budućnosti")
      } else if (!paymentModalVrednost.toString().match(/^[0-9]+$/)) {
        setSubmittable(false)
        setPaymentModalError("Vrednost uplate može biti samo broj")
      } else if (paymentModalVrednost <= 0) {
        setSubmittable(false)
        setPaymentModalError("Vrednost uplate može biti samo pozitivan broj")
      } else if (!(paymentModalSvrha.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/))) {
        setSubmittable(false)
        setPaymentModalError("Svrha uplate može sadržati isključivo slova")
      } else {
        setSubmittable(true)
        setPaymentModalError(null)
      }
    }
  }, [paymentModalSvrha, paymentModalVrednost, paymentModalDate, paymentModalStudent, paymentModalInfo])

  const savePaymentFunc = () => {
    if (paymentModalInfo === null) {
      let tempPayment = {}
      tempPayment.svrhaUplate = paymentModalSvrha.trim()
      tempPayment.vrednostUplate = parseInt(paymentModalVrednost)
      tempPayment.date = paymentModalDate
      tempPayment.student = paymentModalStudent.value
      dispatch(addPayment(tempPayment))
      return
    }
    if (paymentModalInfo !== null) {
      paymentModalInfo.svrhaUplate = paymentModalSvrha.trim()
      paymentModalInfo.vrednostUplate = parseInt(paymentModalVrednost)
      paymentModalInfo.date = paymentModalDate
      dispatch(editPayment(paymentModalInfo))
      return
    }
  }

  return ( 
    <div>
      <Navbar />
      <OffcanvasComponent />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center text-altorange m-3 fw-bold">Uplate</h2>
        <div style={{width: "100%"}} className="table-responsive">
          <table className="table table-bordered text-light text-center align-middle">
            <thead className="align-middle">
                <tr className="bg-lightdark">
                  <th>Svrha Uplate</th>
                  <th>Vrednost Uplate</th>
                  <th>Vreme Uplate</th>
                  <th>Student</th>
                  <th>Izmena</th>
                  <th>Brisanje</th>
                </tr>
            </thead>
            <tbody>
              { allPayments && allPayments.sort(function(a, b){return new Date(b.date) - new Date(a.date)}).map((payment) => (
                <tr key={payment.id}>
                  <td>{ payment.svrhaUplate }</td>
                  <td>{ payment.vrednostUplate }</td>
                  <td>{ moment(payment.date).format("DD/MM/YYYY HH:mm") }</td>
                  <td>{ payment.student.firstName + " " + payment.student.lastName + " | " + payment.student.cardNumber.toUpperCase() }</td>
                  <td><button onClick={() => editPaymentModalInfo(payment)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#paymentModal">Izmeni</button></td>
                  <td><button onClick={() => dispatch(deletePayment(payment.id))} type="button" className="btn btn-danger" >Obrisi</button></td>
                </tr>
              )) }
              { allPayments && 
                <tr>
                  <td>Ukupno</td>
                  <td>{ sum }</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              }
            </tbody>
          </table>
          <button onClick={() => addPaymentModalInfo()} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#paymentModal">Dodaj Uplatu</button>
        </div>

        <div className="modal fade" id="paymentModal" tabIndex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="paymentModalLabel">Podaci o Uplati</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="paymentSvrhaInput" className="form-label mt-1 mb-1 text-secondary">Svrha Uplate:</label>
                    <input
                      type="text"
                      className="form-control input"
                      id="paymentSvrhaInput"
                      required
                      value={paymentModalSvrha}
                      onChange={(e) => setPaymentModalSvrha(e.target.value)}
                    />
                    <label htmlFor="paymentVrednostInput" className="form-label mt-1 mb-1 text-secondary">Vrednost Uplate:</label>
                    <input
                      type="number"
                      className="form-control input"
                      id="paymentVrednostInput"
                      required
                      value={paymentModalVrednost}
                      onChange={(e) => setPaymentModalVrednost(e.target.value)}
                    />
                    <label htmlFor="paymentDateInput" className="form-label mt-1 mb-1 text-secondary">Datum i Vreme Uplate:</label>
                    <Datetime
                      dateFormat={moment(paymentModalDate).format("DD/MM/YYYY")}
                      className="input"
                      id="paymentDateInput"
                      required
                      value={paymentModalDate}
                      onChange={(e) => setPaymentModalDate(e._d)}
                    />
                    { paymentModalInfo === null && (
                      <>
                        <label htmlFor="paymentStudentSelect" className="form-label mt-1 mb-1 text-secondary">Student:</label>
                        <Select
                          defaultValue={''}
                          name="student"
                          id="paymentStudentSelect"
                          options={studentsSelect}
                          className="basic-single select"
                          classNamePrefix="select"
                          isSearchable
                          isClearable
                          onChange={(e) => setPaymentModalStudent(e) }
                        />
                      </>
                    )}
                  </div>
                  { paymentModalError && <p className="text-danger mb-0 mt-3">{ paymentModalError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => savePaymentFunc()} disabled={!submittable} data-bs-dismiss={submittable === false ? "" : "modal"} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
 
export default AdminPaymentsPage;