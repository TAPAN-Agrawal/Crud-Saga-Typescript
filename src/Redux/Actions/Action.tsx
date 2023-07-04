interface Cred {
  name: string,
  password: string,
  date: string,
  gender: string,
  address: string,
}

export interface AddEdit {
  id?: number,
  Title: string,
  subTitle: string,
 
}




export const addUserCredentials = (data: Cred) => {
  return {
    type: "ADD_USER_CREDENTIALS",
    payload: data,
  }
}

export const getData = () => {
  return {
    type: "GET_DATA",
  }
}


export const addData = (data: AddEdit) => {

  return {
    type: 'ADD_DATA',
    payload: data
  }
}

export const editData = (data: AddEdit) => {
  return {
    type: 'EDIT_DATA',
    payload: data
  }
}

export const deleteData = (id: number) => {
  return {
    type: 'DELETE_DATA',
    payload: id
  }
}