/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import OffcanvasComponent from "../../components/Offcanvas";

import { Creators } from "../../store/Auth";

const { addAdmin } = Creators

const NewAdminPage = () => {

  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const [adminUsername, setAdminUsername] = useState("")
  const [adminPassword, setAdminPassword] = useState("")

  const [submittable, setSubmittable] = useState(false)

  const [adminError, setAdminError] = useState("")

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        //
      } else if (authority === "NASTAVNIK") {
        history.push('/nastavnik')
      } else if (authority === "STUDENT") {
        history.push('/student')
      }
    }
  }, [dispatch, user, authority])

  useEffect(() => {
    if (adminUsername.trim() === "" || adminPassword.trim() === "") {
      setSubmittable(false)
      setAdminError("Morate uneti sve vrednosti")
    } else if (!adminUsername.match(/^[a-zA-Z0-9]+$/)) {
      setSubmittable(false)
      setAdminError("Korisničko ime može sadržati samo ošišana slova i brojeve, bez razmaka")
    } else if (adminUsername.length < 3) {
      setSubmittable(false)
      setAdminError("Korisničko ime mora sadržati 3 ili više karaktera")
    } else if (adminPassword.length < 8) {
      setSubmittable(false)
      setAdminError("Lozinka mora sadržati 8 ili više karaktera")
    } else {
      setSubmittable(true)
      setAdminError(null)
    }
  }, [adminUsername, adminPassword])

  const saveAdminFunc = (e) => {

    e.preventDefault()

    const username = adminUsername.trim()
    const password = adminPassword.trim()

    console.log(username)
    console.log(password)
    dispatch(addAdmin(username, password))
    history.goBack()
  }

  return (
    <div>
      <Navbar />
      <OffcanvasComponent />
      <div className="container-md d-flex flex-column justify-content-center align-items-stretch">
        <h2 className="text-center text-altorange m-3 fw-bold">Dodavanje Admina</h2>
        <form className="d-flex flex-column justify-content-center align-items-center row">
          <div className="d-flex flex-column justify-content-center align-items-stretch col-xl-4 col-lg-6 col-md-6 col-sm-8 col-10">
            <label htmlFor="usernameInput" className="form-label mt-1 mb-1 text-secondary">Korisničko Ime:</label>
            <input
              type="text"
              className="form-control input"
              id="usernameInput"
              required
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
            />
            <label htmlFor="passwordInput" className="form-label mt-1 mb-1 text-secondary">Lozinka:</label>
            <input
              type="password"
              className="form-control input"
              id="passwordInput"
              required
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button onClick={saveAdminFunc} disabled={!submittable} className="btn btn-altorange mt-3 center">Dodaj Admina</button>
            { adminError && <p className="text-danger mb-0 mt-3 text-center fw-bold">{ adminError }</p> }
          </div>
        </form>
      </div>
    </div>
  )
}
 
export default NewAdminPage;