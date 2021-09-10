/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import OffcanvasComponent from "../../components/Offcanvas";

import { Creators as StudentCreators } from "../../store/Student";

const { 
  addStudent,
  getAllStudents,
  deleteStudent,
  editStudent,
} = StudentCreators

const AdminPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const allStudents = useSelector(({ student }) => student.allStudents)

  const [studentModalInfo, setStudentModalInfo] = useState(null)

  const [studentModalFirstName, setStudentModalFirstName] = useState("")
  const [studentModalLastName, setStudentModalLastName] = useState("")
  const [studentModalCardNumber, setStudentModalCardNumber] = useState("")
  const [studentModalUsername, setStudentModalUsername] = useState("")
  const [studentModalPassword, setStudentModalPassword] = useState("")

  const [submittable, setSubmittable] = useState(false)

  const [studentModalError, setStudentModalError] = useState("")

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        dispatch(getAllStudents())
      } else if (authority === "NASTAVNIK") {
        history.push('/nastavnik')
      } else if (authority === "STUDENT") {
        history.push('/student')
      }
    }
  }, [dispatch, user, authority])

  const editStudentModalInfo = (student) => {
    setSubmittable(false)
    setStudentModalInfo(student)

    setStudentModalFirstName(student.firstName)
    setStudentModalLastName(student.lastName)
    setStudentModalCardNumber(student.cardNumber)
    setStudentModalUsername("")
    setStudentModalPassword("")
  }

  const addStudentModalInfo = () => {
    setSubmittable(false)
    setStudentModalInfo(null)

    setStudentModalFirstName("")
    setStudentModalLastName("")
    setStudentModalCardNumber("")
    setStudentModalUsername("")
    setStudentModalPassword("")
  }

  useEffect(() => {
    if (studentModalFirstName.trim() === "" || studentModalLastName.trim() === "" || studentModalCardNumber.trim() === "" || (studentModalInfo === null && (studentModalUsername.trim() === "" || studentModalPassword.trim() === ""))) {
      setSubmittable(false)
      setStudentModalError("Morate uneti sve vrednosti")
    } else if (!(studentModalFirstName.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/) && studentModalLastName.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/))) {
      setSubmittable(false)
      setStudentModalError("Ime i Prezime mogu sadržati isključivo slova")
    } else if (studentModalInfo === null && !studentModalUsername.match(/^[a-zA-Z0-9]+$/)) {
      setSubmittable(false)
      setStudentModalError("Korisničko ime može sadržati samo ošišana slova i brojeve, bez razmaka")
    } else if (studentModalInfo === null && studentModalUsername.length < 3) {
      setSubmittable(false)
      setStudentModalError("Korisničko ime mora sadržati 3 ili više karaktera")
    } else if (studentModalInfo === null && studentModalPassword.length < 8) {
      setSubmittable(false)
      setStudentModalError("Lozinka mora sadržati 8 ili više karaktera")
    } else {
      setSubmittable(true)
      setStudentModalError(null)
    }
  }, [studentModalFirstName, studentModalLastName, studentModalCardNumber, studentModalUsername, studentModalPassword])

  const saveStudentFunc = () => {
    if (studentModalInfo === null) {
      const firstName = studentModalFirstName.trim()
      const lastName = studentModalLastName.trim()
      const cardNumber = studentModalCardNumber.trim()
      const username = studentModalUsername.trim()
      const password = studentModalPassword.trim()
      dispatch(addStudent(username, password, cardNumber, firstName, lastName))
      return
    }
    if (studentModalInfo !== null) {
      studentModalInfo.firstName = studentModalFirstName.trim()
      studentModalInfo.lastName = studentModalLastName.trim()
      studentModalInfo.cardNumber = studentModalCardNumber.trim()
      dispatch(editStudent(studentModalInfo))
      return
    }
  }

  return ( 
    <div>
      <Navbar />
      <OffcanvasComponent />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center text-altorange m-3 fw-bold">Studenti</h2>
        <div style={{width: "100%"}} className="table-responsive">
          <table className="table table-bordered text-light text-center align-middle">
            <thead className="align-middle">
                <tr className="bg-lightdark">
                  <th>Broj Indeksa</th>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Izmena</th>
                  <th>Brisanje</th>
                </tr>
            </thead>
            <tbody>
              { allStudents && allStudents.map((student) => (
                <tr key={student.id}>
                  <td>{ student.cardNumber.toUpperCase() }</td>
                  <td>{ student.firstName }</td>
                  <td>{ student.lastName }</td>
                  <td><button onClick={() => editStudentModalInfo(student)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#studentModal">Izmeni</button></td>
                  <td><button onClick={() => dispatch(deleteStudent(student.id))} className="btn btn-danger">Obrisi</button></td>
                </tr>
              )) }
            </tbody>
          </table>
          <button onClick={() => addStudentModalInfo()} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#studentModal">Dodaj Studenta</button>
        </div>

        <div className="modal fade" id="studentModal" tabIndex="-1" aria-labelledby="studentModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="studentModalLabel">Podaci o Studentu</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="firstNameInput" className="form-label mt-1 mb-1 text-secondary">Ime:</label>
                    <input
                      type="text"
                      className="form-control input"
                      id="firstNameInput"
                      required
                      value={studentModalFirstName}
                      onChange={(e) => setStudentModalFirstName(e.target.value)}
                    />
                    <label htmlFor="lastNameInput" className="form-label mt-1 mb-1 text-secondary">Prezime:</label>
                    <input
                      type="text"
                      className="form-control input"
                      id="lastNameInput"
                      required
                      value={studentModalLastName}
                      onChange={(e) => setStudentModalLastName(e.target.value)}
                    />
                    <label htmlFor="cardNumberInput" className="form-label mt-1 mb-1 text-secondary">Broj Indeksa:</label>
                    <input
                      type="text"
                      className="form-control input"
                      id="cardNumberInput"
                      required
                      value={studentModalCardNumber}
                      onChange={(e) => setStudentModalCardNumber(e.target.value)}
                    />
                    { studentModalInfo === null && (
                      <>
                        <label htmlFor="usernameInput" className="form-label mt-1 mb-1 text-secondary">Korisničko Ime:</label>
                        <input
                          type="text"
                          className="form-control input"
                          id="usernameInput"
                          required
                          value={studentModalUsername}
                          onChange={(e) => setStudentModalUsername(e.target.value)}
                        />
                        <label htmlFor="passwordInput" className="form-label mt-1 mb-1 text-secondary">Lozinka:</label>
                        <input
                          type="password"
                          className="form-control input"
                          id="passwordInput"
                          required
                          value={studentModalPassword}
                          onChange={(e) => setStudentModalPassword(e.target.value)}
                        />
                      </>
                    )}
                  </div>
                  { studentModalError && <p className="text-danger mb-0 mt-3">{ studentModalError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => saveStudentFunc()} disabled={!submittable} data-bs-dismiss={submittable === false ? "" : "modal"} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
 
export default AdminPage;