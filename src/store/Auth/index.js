import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  getAccount: ["username","password"],
  getAccountSuccess: ["data"],
  getAccountFailure: ["error"],

  addAdmin: ["username", "password"],
  addAdminSuccess: [null],
  addAdminFailure: ["error"],

  signOut: null,
})

export { Types }
export { Creators }
