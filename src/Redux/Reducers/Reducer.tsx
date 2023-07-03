interface Arr {
    id: number,
    Title: string,
    subTitle: string,
}

interface Action {
    type: string,
    payload: { name: string, password: string }

}
export interface StateInterface {
    name: string,
    password: string,
    arr: Arr[]
}




const initialState: StateInterface = {

    name: " ",
    password: " ",
    arr: []
}
export const counter = (state: StateInterface = initialState, action: Action) => {
    switch (action.type) {


        case 'ADD_USER_CREDENTIALS':
            return {
                ...state,
                name: action.payload.name,
                password: action.payload.password,

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