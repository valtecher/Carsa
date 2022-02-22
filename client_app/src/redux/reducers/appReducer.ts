
import {SET_OPENED_HEADER_LINK} from '../actions/AppActions'
interface appReducerInitialState{
  openedLink:string;

}

const initialState:appReducerInitialState = {
  openedLink: 'home',
}

const appReducer = (state = initialState, action:any) => {
  
  switch(action.type){
    case SET_OPENED_HEADER_LINK: 
      return {...state, openedLink: action.link}
    default: return state
  }

}

export default appReducer