import { Epic,  StateObservable } from "redux-observable"
import { from } from 'rxjs'
import { ofType} from "redux-observable"
import { pipeline } from "stream"
import { switchMap, map } from 'rxjs/operators'
import { loginSuccess, LOGOUT_SUCCESS, SAVE_USER } from "../actions/authActions"
import { useAuth0 } from "@auth0/auth0-react"



export const saveUser = (action$:any, state$:any) => action$.pipe(
  ofType(SAVE_USER),
  map(loginSuccess)
)