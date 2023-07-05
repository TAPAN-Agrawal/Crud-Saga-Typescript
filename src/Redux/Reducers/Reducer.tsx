
interface Action {
    type: string,
    payload: {
        name: string,
        password: string,
        date: string,
        gender: string,
        address: string,
    }
    
}
interface Arr {
    id: number,
    Title: string,
    subTitle: string,
    status?: string
}
export interface StateInterface {

    name: string,
    password: string,
    date: string,
    gender: string,
    address: string,
    arr: Arr[]
}




const initialState: StateInterface = {

        
    name: " ",
    password: " ",
    date: "",
    gender: "",
    address: "",
    arr: []
}
export const todos = (state: StateInterface = initialState, action: Action) => {
    switch (action.type) {


        case 'ADD_USER_CREDENTIALS':
            return {
                ...state,
                name: action.payload.name,
                password: action.payload.password,
                date: action.payload.date,
                gender: action.payload.gender,
                address: action.payload.address,

            }


        case 'SET-DATA':
            return {
                ...state,
                arr: action.payload
            }

            



        default:
            return state
    }
}