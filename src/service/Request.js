/* eslint-disable import/no-unresolved */
import { create } from "apisauce"

const baseURL = "http://localhost:8080/api"

export const request = create({
  baseURL,
  timeout: 5000,
})