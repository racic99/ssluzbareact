/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";

import { Creators } from "../../store/Auth";

const { getAccount, signOut } = Creators

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)
  const loading = useSelector(({ auth }) => auth.loading)
  const error = useSelector(({ auth }) => auth.error)

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(signOut())
      }, 3000);
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        history.push('/admin/students');
      } else if (authority === "STUDENT") {
        history.push('/student');
      } else if (authority === "NASTAVNIK") {
        history.push('/teacher');
      }
    }
  }, [dispatch, error, user, authority])

  const loginFunc = (e) => {
    e.preventDefault()
    dispatch(getAccount(username, password))
  }

  return ( 
    <div>
      <Navbar />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center text-altorange mt-4">Login</h2>
        <form className="d-flex flex-column justify-content-center align-items-center mt-4" 
          onSubmit={loginFunc}
        >
          <div>
            <label htmlFor="usernameInput" className="form-label mt-1 mb-1 text-secondary">Username:</label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="passwordInput" className="form-label mt-1 mb-1 text-secondary">Password:</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-altorange mt-3">Login</button>
          { loading && 
            <div className="spinner-border text-altorange mt-4" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
          }
          { error && <div className="text-danger mt-3">{ error }</div> }
        </form>
      </div>
    </div>
  )
}
 
export default Login;