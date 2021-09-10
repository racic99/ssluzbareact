/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { Types as DocumentTypes } from "./index"

const {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILURE,
  EDIT_DOCUMENT,
  EDIT_DOCUMENT_SUCCESS,
  EDIT_DOCUMENT_FAILURE,
  GET_ALL_DOCUMENTS,
  GET_ALL_DOCUMENTS_SUCCESS,
  GET_ALL_DOCUMENTS_FAILURE,
  REMOVE_ERROR,
} = DocumentTypes

const initialState = {
  loading: false,
  error: null,
  allDocuments: [],
}

const getAllDocuments = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const getAllDocumentsSuccess = (state, { allDocuments }) => ({
  ...state,
  loading: false,
  error: null,
  allDocuments,
})
const getAllDocumentsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  allDocuments: [],
  error
})

const deleteDocument = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const deleteDocumentSuccess = (state, { documentID }) => ({
  ...state,
  loading: false,
  error: null,
  allDocuments: state.allDocuments.filter((document) => document.id !== documentID)
})
const deleteDocumentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const editDocument = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const editDocumentSuccess = (state, { document }) => ({
  ...state,
  loading: false,
  error: null,
  allDocuments: state.allDocuments.map((document, i) => i === document.id ? {...document, document} : document
)
})
const editDocumentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const addDocument = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const addDocumentSuccess = (state, { document }) => ({
  ...state,
  loading: false,
  error: null,
  allDocuments: [...state.allDocuments, document],
})
const addDocumentFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const removeError = (state) => ({
  ...state,
  error: null,
})

const DocumentReducer = createReducer(initialState, {
  [GET_ALL_DOCUMENTS]: getAllDocuments,
  [GET_ALL_DOCUMENTS_SUCCESS]: getAllDocumentsSuccess,
  [GET_ALL_DOCUMENTS_FAILURE]: getAllDocumentsFailure,

  [DELETE_DOCUMENT]: deleteDocument,
  [DELETE_DOCUMENT_SUCCESS]: deleteDocumentSuccess,
  [DELETE_DOCUMENT_FAILURE]: deleteDocumentFailure,

  [EDIT_DOCUMENT]: editDocument,
  [EDIT_DOCUMENT_SUCCESS]: editDocumentSuccess,
  [EDIT_DOCUMENT_FAILURE]: editDocumentFailure,

  [ADD_DOCUMENT]: addDocument,
  [ADD_DOCUMENT_SUCCESS]: addDocumentSuccess,
  [ADD_DOCUMENT_FAILURE]: addDocumentFailure,

  [REMOVE_ERROR]: removeError,
})

export default DocumentReducer
