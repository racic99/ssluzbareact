/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import OffcanvasComponent from "../../components/Offcanvas";
import Select from 'react-select'

import { Creators as TeacherCreators } from "../../store/Teacher";

const { 
  addTeacher,
  deleteTeacher,
  editTeacher,
  getAllTeachers,
} = TeacherCreators

const AdminTeachersPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const allTeachers = useSelector(({ teacher }) => teacher.allTeachers)

  const [teacherModalInfo, setTeacherModalInfo] = useState(null)

  const [teacherModalFirstName, setTeacherModalFirstName] = useState("")
  const [teacherModalLastName, setTeacherModalLastName] = useState("")
  const [teacherModalUsername, setTeacherModalUsername] = useState("")
  const [teacherModalPassword, setTeacherModalPassword] = useState("")
  const [teacherModalRank, setTeacherModalRank] = useState(null)

  const [submittable, setSubmittable] = useState(false)

  const [teacherModalError, setTeacherModalError] = useState("")

  const selectTeacherRef = useRef();

  const teacherRankOptions = [
    { value: 'Profesor', label: 'Profesor' },
    { value: 'Asistent', label: 'Asistent' },
    { value: 'Demonstrator', label: 'Demonstrator' },
  ]

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        dispatch(getAllTeachers())
      } else if (authority === "NASTAVNIK") {
        history.push('/nastavnik')
      } else if (authority === "STUDENT") {
        history.push('/student')
      }
    }
  }, [dispatch, user, authority])

  const editTeacherModalInfo = (teacher) => {
    setSubmittable(false)
    setTeacherModalInfo(teacher)

    setTeacherModalFirstName(teacher.firstName)
    setTeacherModalLastName(teacher.lastName)
    setTeacherModalUsername("")
    setTeacherModalPassword("")
    setTeacherModalRank(teacher.teacherRank)
    teacherRankOptions.forEach(rank => {
      if (rank.value === teacher.teacherRank) {
        selectTeacherRef.current.select.setValue(rank)
      }
    });
  }

  const addTeacherModalInfo = () => {
    setSubmittable(false)
    setTeacherModalInfo(null)
    selectTeacherRef.current.select.clearValue()

    setTeacherModalFirstName("")
    setTeacherModalLastName("")
    setTeacherModalUsername("")
    setTeacherModalPassword("")
    setTeacherModalRank(null)
  }

  useEffect(() => {
    if (teacherModalFirstName.trim() === "" || teacherModalLastName.trim() === "" || teacherModalRank === null || (teacherModalInfo === null && (teacherModalUsername.trim() === "" || teacherModalPassword.trim() === ""))) {
      setSubmittable(false)
      setTeacherModalError("Morate uneti sve vrednosti")
    } else if (!(teacherModalFirstName.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/) && teacherModalLastName.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/))) {
      setSubmittable(false)
      setTeacherModalError("Ime i Prezime mogu sadržati isključivo slova")
    } else if (teacherModalInfo === null && !teacherModalUsername.match(/^[a-zA-Z0-9]+$/)) {
      setSubmittable(false)
      setTeacherModalError("Korisničko ime može sadržati samo ošišana slova i brojeve, bez razmaka")
    } else if (teacherModalInfo === null && teacherModalUsername.length < 3) {
      setSubmittable(false)
      setTeacherModalError("Korisničko ime mora sadržati 3 ili više karaktera")
    } else if (teacherModalInfo === null && teacherModalPassword.length < 8) {
      setSubmittable(false)
      setTeacherModalError("Lozinka mora sadržati 8 ili više karaktera")
    } else {
      setSubmittable(true)
      setTeacherModalError(null)
    }
  }, [teacherModalFirstName, teacherModalLastName, teacherModalRank, teacherModalUsername, teacherModalPassword])

  const saveTeacherFunc = () => {
    if (teacherModalInfo === null) {
      const firstName = teacherModalFirstName.trim()
      const lastName = teacherModalLastName.trim()
      const teacherRank = teacherModalRank.value
      const username = teacherModalUsername.trim()
      const password = teacherModalPassword.trim()
      dispatch(addTeacher(username, password, firstName, lastName, teacherRank))
      return
    }
    if (teacherModalInfo !== null) {
      teacherModalInfo.firstName = teacherModalFirstName.trim()
      teacherModalInfo.lastName = teacherModalLastName.trim()
      teacherModalInfo.teacherRank = teacherModalRank.value
      dispatch(editTeacher(teacherModalInfo))
      return
    }
  }

  return ( 
    <div>
      <Navbar />
      <OffcanvasComponent />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center text-altorange m-3 fw-bold">Nastavnici</h2>
        <div style={{width: "100%"}} className="table-responsive">
          <table className="table table-bordered text-light text-center align-middle">
            <thead className="align-middle">
                <tr className="bg-lightdark">
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Uloga</th>
                  <th>Izmena</th>
                  <th>Brisanje</th>
                </tr>
            </thead>
            <tbody>
              { allTeachers && allTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{ teacher.firstName }</td>
                  <td>{ teacher.lastName }</td>
                  <td>{ teacher.teacherRank }</td>
                  <td><button onClick={() => editTeacherModalInfo(teacher)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#teacherModal">Izmeni</button></td>
                  <td><button onClick={() => dispatch(deleteTeacher(teacher.id))} type="button" className="btn btn-danger" >Obrisi</button></td>
                </tr>
              )) }
            </tbody>
          </table>
          <button onClick={() => addTeacherModalInfo()} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#teacherModal">Dodaj Nastavnika</button>
        </div>

        <div className="modal fade" id="teacherModal" tabIndex="-1" aria-labelledby="teacherModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="teacherModalLabel">Podaci o Nastavniku</h5>
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
                      value={teacherModalFirstName}
                      onChange={(e) => setTeacherModalFirstName(e.target.value)}
                    />
                    <label htmlFor="lastNameInput" className="form-label mt-1 mb-1 text-secondary">Prezime:</label>
                    <input
                      type="text"
                      className="form-control input"
                      id="lastNameInput"
                      required
                      value={teacherModalLastName}
                      onChange={(e) => setTeacherModalLastName(e.target.value)}
                    />
                    { teacherModalInfo === null && (
                      <>
                        <label htmlFor="usernameInput" className="form-label mt-1 mb-1 text-secondary">Korisničko Ime:</label>
                        <input
                          type="text"
                          className="form-control input"
                          id="usernameInput"
                          required
                          value={teacherModalUsername}
                          onChange={(e) => setTeacherModalUsername(e.target.value)}
                        />
                        <label htmlFor="passwordInput" className="form-label mt-1 mb-1 text-secondary">Lozinka:</label>
                        <input
                          type="password"
                          className="form-control input"
                          id="passwordInput"
                          required
                          value={teacherModalPassword}
                          onChange={(e) => setTeacherModalPassword(e.target.value)}
                        />
                      </>
                    )}
                    <label htmlFor="teacherRankSelect" className="form-label mt-1 mb-1 text-secondary">Uloga Nastavnika:</label>
                    <Select
                      defaultValue={''}
                      name="student"
                      id="teacherRankSelect"
                      options={teacherRankOptions}
                      className="basic-single select"
                      classNamePrefix="select"
                      isSearchable
                      isClearable
                      onChange={(e) => setTeacherModalRank(e)}
                      ref={selectTeacherRef}
                    />
                  </div>
                  { teacherModalError && <p className="text-danger mb-0 mt-3">{ teacherModalError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => saveTeacherFunc()} disabled={!submittable} data-bs-dismiss={submittable === false ? "" : "modal"} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
 
export default AdminTeachersPage;