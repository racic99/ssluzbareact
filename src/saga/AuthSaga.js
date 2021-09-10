/* eslint-disable import/named */
import { call, put } from "redux-saga/effects"
import { addAdmin, getAccount } from "../service/Auth"
import { Types as AuthTypes } from "../store/Auth"

const {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILURE,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_FAILURE,
} = AuthTypes

export function* login({ username, password }) {
  try {
    const response = yield call(getAccount, {
      username,
      password,
    })
    if (response.ok) {
      yield put({ type: GET_ACCOUNT_SUCCESS, data: response.data })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: GET_ACCOUNT_FAILURE, error: error.message })
  }
}

export function* createAdmin({ username, password }) {
  try {
    const response = yield call(addAdmin, {
      username,
      password,
    })
    if (response.ok) {
      yield put({ type: ADD_ADMIN_SUCCESS })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: ADD_ADMIN_FAILURE, error: error.message })
  }
}