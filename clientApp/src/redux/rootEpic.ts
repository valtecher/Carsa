import { combineEpics } from "redux-observable";
import { saveCarsEpic, getCarsEpic, getCarClient } from "./epics/carEpic";
import { saveUser } from "./epics/userEpic";
import { getOrderEpic, saveOrderEpic } from "./epics/orderEpic";
import { getPaymentsEpic, savePaymentsEpic } from "./epics/paymentsEpic";

export const rootEpic = combineEpics(
  saveCarsEpic, getCarsEpic, getCarClient, saveUser, getOrderEpic, saveOrderEpic, getPaymentsEpic, savePaymentsEpic
);

