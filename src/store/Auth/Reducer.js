/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { Types as AuthTypes } from "./index"

const {
  GET_ACCOUNT,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILURE,
  ADD_ADMIN,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_FAILURE,
  SIGN_OUT,
} = AuthTypes

const initialState = {
  loading: false,
  error: null,
  data: null,
  authority: null,
}

const getAccount = (state) => ({
  ...state,
  loading: true,
  error: null,
  authority: null,
})
const getAccountSuccess = (state, { data }) => ({
  ...state,
  loading: false,
  error: null,
  data,
  authority: data.authority.name,
})
const getAccountFailure = (state, { error }) => ({
  ...state,
  loading: false,
  data: null,
  authority: null,
  error
})

const addAdmin = (state) => ({
  ...state,
  loading: true,
  error: null,
})
const addAdminSuccess = (state) => ({
  ...state,
  loading: false,
  error: null,
})
const addAdminFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error
})

const signOut = (state) => ({
  ...state,
  data: null,
  authority: null,
  error: null,
})

const AccountReducer = createReducer(initialState, {
  [GET_ACCOUNT]: getAccount,
  [GET_ACCOUNT_SUCCESS]: getAccountSuccess,
  [GET_ACCOUNT_FAILURE]: getAccountFailure,

  [ADD_ADMIN]: addAdmin,
  [ADD_ADMIN_SUCCESS]: addAdminSuccess,
  [ADD_ADMIN_FAILURE]: addAdminFailure,

  [SIGN_OUT]: signOut,
})

export default AccountReducer
