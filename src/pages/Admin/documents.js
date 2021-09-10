/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Header";
import OffcanvasComponent from "../../components/Offcanvas";
import Select from 'react-select'

import { Creators as DocumentCreators } from "../../store/Document";
import { Creators as StudentCreators } from "../../store/Student";

const { 
  deleteDocument,
  getAllDocuments,
  addDocument,
  editDocument,
} = DocumentCreators

const { 
  getAllStudents,
} = StudentCreators

const AdminDocumentsPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)

  const allDocuments = useSelector(({ document }) => document.allDocuments)
  const allStudents = useSelector(({ student }) => student.allStudents)

  const [documentModalInfo, setDocumentModalInfo] = useState({})

  const [documentModalName, setDocumentModalName] = useState("")
  const [documentModalStudent, setDocumentModalStudent] = useState(null)

  const [submittable, setSubmittable] = useState(false)

  const [documentModalError, setDocumentModalError] = useState("")

  const [studentsSelect, setStudentsSelect] = useState([])

  useEffect(() => {
    if (user === null) {
      history.push('/')
    }
    if (user !== null) {
      if (authority === "ADMIN") {
        dispatch(getAllDocuments())
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
    allStudents.forEach(student => {
      tempStudents.push({value: student, label: student.firstName + " " + student.lastName + " | " + student.cardNumber.toUpperCase()})
    });
    setStudentsSelect(tempStudents)
  }, [allStudents])

  const editDocumentModalInfo = (document) => {
    setSubmittable(false)
    setDocumentModalInfo(document)

    setDocumentModalName(document.naziv)
    setDocumentModalStudent(null)
  }

  const addDocumentModalInfo = () => {
    setSubmittable(false)
    setDocumentModalInfo(null)

    setDocumentModalName("")
    setDocumentModalStudent(null)
  }

  useEffect(() => {
    if (documentModalInfo === null) {
      if (documentModalName.trim() === "" || documentModalStudent === null) {
        setSubmittable(false)
        setDocumentModalError("Morate uneti ime dokumenta i izabrati studenta")
      } else if (!(documentModalName.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/))) {
        setSubmittable(false)
        setDocumentModalError("Dokument može sadržati isključivo slova")
      } else {
        setSubmittable(true)
        setDocumentModalError(null)
      }
    } else if (documentModalInfo !== null) {
      if (documentModalName.trim() === "") {
        setSubmittable(false)
        setDocumentModalError("Morate uneti ime dokumenta")
      } else if (!(documentModalName.match(/^[a-zA-ZšŠđĐžŽćĆčČ\s]+$/))) {
        setSubmittable(false)
        setDocumentModalError("Dokument može sadržati isključivo slova")
      } else {
        setSubmittable(true)
        setDocumentModalError(null)
      }
    }
  }, [documentModalName, documentModalStudent, documentModalInfo])

  const saveDocumentFunc = () => {
    if (documentModalInfo === null) {
      let tempDocument = {}
      tempDocument.naziv = documentModalName.trim()
      tempDocument.student = documentModalStudent.value
      dispatch(addDocument(tempDocument))
      return
    }
    if (documentModalInfo !== null) {
      documentModalInfo.naziv = documentModalName.trim()
      dispatch(editDocument(documentModalInfo))
      return
    }
  }

  return ( 
    <div>
      <Navbar />
      <OffcanvasComponent />
      <div className="container-md d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center text-altorange m-3 fw-bold">Dokumenti</h2>
        <div style={{width: "100%"}} className="table-responsive">
          <table className="table table-bordered text-light text-center align-middle">
            <thead className="align-middle">
                <tr className="bg-lightdark">
                  <th>Naziv Dokumenta</th>
                  <th>Student</th>
                  <th>Izmena</th>
                  <th>Brisanje</th>
                </tr>
            </thead>
            <tbody>
              { allDocuments && allDocuments.map((document) => (
                <tr key={document.id}>
                  <td>{ document.naziv }</td>
                  <td>{ document.student.firstName + " " + document.student.lastName + " | " + document.student.cardNumber.toUpperCase() }</td>
                  <td><button onClick={() => editDocumentModalInfo(document)} type="button" className="btn btn-altorange" data-bs-toggle="modal" data-bs-target="#documentModal">Izmeni</button></td>
                  <td><button onClick={() => dispatch(deleteDocument(document.id))} type="button" className="btn btn-danger" >Obrisi</button></td>
                </tr>
              )) }
            </tbody>
          </table>
          <button onClick={() => addDocumentModalInfo()} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#documentModal">Dodaj Dokument</button>
        </div>

        <div className="modal fade" id="documentModal" tabIndex="-1" aria-labelledby="documentModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="documentModalLabel">Podaci o Dokumentu</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="d-flex flex-column justify-content-center align-items-stretch"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="documentNameInput" className="form-label mt-1 mb-1 text-secondary">Ime Dokumenta:</label>
                    <input
                      type="text"
                      className="form-control input"
                      id="documentNameInput"
                      required
                      value={documentModalName}
                      onChange={(e) => setDocumentModalName(e.target.value)}
                    />
                    { documentModalInfo === null && (
                      <>
                        <label htmlFor="documentStudentSelect" className="form-label mt-1 mb-1 text-secondary">Student:</label>
                        <Select
                          defaultValue={''}
                          name="student"
                          id="documentStudentSelect"
                          options={studentsSelect}
                          className="basic-single select"
                          classNamePrefix="select"
                          isSearchable
                          isClearable
                          onChange={(e) => setDocumentModalStudent(e) }
                        />
                      </>
                    )}
                  </div>
                  { documentModalError && <p className="text-danger mb-0 mt-3">{ documentModalError }</p> }
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => saveDocumentFunc()} disabled={!submittable} data-bs-dismiss={submittable === false ? "" : "modal"} className="btn btn-success">Unesi</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
 
export default AdminDocumentsPage;