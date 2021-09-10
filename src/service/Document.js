import { request } from "./Request"

export const getAllDocuments = async (options) => {
  try {
    const path = `/documents/all`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const deleteDocument = async (options) => {
  try {
    const path = `/documents/${options.documentID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const editDocument = async (options) => {
  try {
    const path = `/documents`
    const response = await request.put(path, { ...options.document }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}

export const addDocument = async (options) => {
  try {
    const path = `/documents`
    const response = await request.post(path, { ...options.document }, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}