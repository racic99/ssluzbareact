import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  getAllDocuments: null,
  getAllDocumentsSuccess: ["allDocuments"],
  getAllDocumentsFailure: ["error"],

  deleteDocument: ["documentID"],
  deleteDocumentSuccess: ["documentID"],
  deleteDocumentFailure: ["error"],

  editDocument: ["document"],
  editDocumentSuccess: ["document"],
  editDocumentFailure: ["error"],

  addDocument: ["document"],
  addDocumentSuccess: ["document"],
  addDocumentFailure: ["error"],

  removeError: null,
})

export { Types }
export { Creators }
