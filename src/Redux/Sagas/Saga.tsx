import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { AddEdit } from "../Actions/Action";
// import * as dotenv from "dotenv"
// dotenv.config()


interface ResponseData {
  id: number;
  Title: string;
  subTitle: string;
}

interface ActionAddData {
  type: string,
  payload: AddEdit

}
interface ActionDeleteData {
  type: string,
  payload: number
}

export function* worker() {
  try {
    const response: AxiosResponse<ResponseData> = yield call(
      axios.get,
      "http://localhost:3001/data"
    );

    console.log("api called here data:", process.env.REACT_APP_API_URL);
    yield put({ type: "SET-DATA", payload: response.data });
  } catch (error) {
    // Handle the error
  }
}

export function* addworker(action: ActionAddData) {

  try {

    const data = action.payload;

    yield call(
      axios.post,
      "http://localhost:3001/data",
      data
    );
    yield call(worker)
  } catch (error) {

  }

}

export function* editworker(action: ActionAddData) {

  try {
    const id = action.payload.id
    const data = action.payload
    yield call(
      axios.put,
      `http://localhost:3001/data/${id}`,
      data
    )
    yield call(worker)
    console.log("edit worker", data);

  } catch (error) {

  }
}

export function* deleteworker(action: ActionDeleteData) {

  try {
    const id = action.payload
    yield call(
      axios.delete,
      `http://localhost:3001/data/${id}`
    )
    yield call(worker)

  } catch (error) {

  }
}





export function* watcher() {
  yield takeLatest("GET_DATA", worker);
  yield takeLatest("ADD_DATA", addworker);
  yield takeLatest("DELETE_DATA", deleteworker);
  yield takeLatest("EDIT_DATA", editworker);
}
