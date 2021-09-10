import { request } from "./Request"

export const getAccount = async (options) => {
  try {
    const path = `/user/login/${options.username}/${options.password}`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Wrong credentials!")
  } catch (error) {
    throw error
  }
}

export const addAdmin = async (options) => {
  try {
    const path = `/user/registerAdmin/${options.username}/${options.password}`
    const response = await request.post(path, null, options)
    if (response.ok) return response
    throw new Error("Something went wrong!")
  } catch (error) {
    throw error
  }
}