/* eslint-disable import/named */
import { call, put } from "redux-saga/effects"
import { 
  addDocument,
  deleteDocument,
  editDocument,
  getAllDocuments,
} from "../service/Document"
import { Types as DocumentTypes } from "../store/Document"

const {
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILURE,
  EDIT_DOCUMENT_SUCCESS,
  EDIT_DOCUMENT_FAILURE,
  GET_ALL_DOCUMENTS_SUCCESS,
  GET_ALL_DOCUMENTS_FAILURE,
} = DocumentTypes

export function* fetchAllDocuments() {
  try {
    const response = yield call(getAllDocuments)
    if (response.ok) {
      yield put({ type: GET_ALL_DOCUMENTS_SUCCESS, allDocuments: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_ALL_DOCUMENTS_FAILURE, error: error.message })
  }
}

export function* removeDocument({ documentID }) {
  try {
    const response = yield call(deleteDocument, {
      documentID,
    })
    if (response.ok) {
      yield put({ type: DELETE_DOCUMENT_SUCCESS, documentID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: DELETE_DOCUMENT_FAILURE, error: error.message })
  }
}

export function* changeDocument({ document }) {
  try {
    const response = yield call(editDocument, {
      document,
    })
    if (response.ok) {
      yield put({ type: EDIT_DOCUMENT_SUCCESS, document })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: EDIT_DOCUMENT_FAILURE, error: error.message })
  }
}

export function* createDocument({ document }) {
  try {
    const response = yield call(addDocument, {
      document,
    })
    if (response.ok) {
      yield put({ type: ADD_DOCUMENT_SUCCESS, document: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: ADD_DOCUMENT_FAILURE, error: error.message })
  }
}