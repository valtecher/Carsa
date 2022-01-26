import { SIDE_MENU_COLLAPSE, SIDE_MENU_EXPAND } from "../actions/appActions"

interface appReducerInitialState{
  isSideMenuCollapsed: boolean

}

const initialState:appReducerInitialState = {
  isSideMenuCollapsed: true,
}

const appReducer = (state = initialState, action:any) => {
  
  switch(action.type){
    case SIDE_MENU_EXPAND: 
      return { ...state, isSideMenuCollapsed: false }
    case SIDE_MENU_COLLAPSE: 
      return { ...state, isSideMenuCollapsed: true }
    default: return state
  }

}

export default appReducer