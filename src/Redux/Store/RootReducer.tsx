import { combineReducers } from 'redux';
import { StateInterface, counter } from '../Reducers/Reducer';
export const rootReducer = combineReducers({

    count: counter

})

export type RootState = {
    count: StateInterface
};