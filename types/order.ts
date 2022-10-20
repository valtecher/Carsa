import { IConfiguration } from "../client_app/src/utils/models/OrderWithConfiguration";
import { CarType } from "./car";

export interface OrderType {
  id: string;
  type: string;
  status: string;
  client_id: string;
  selector_id: string;
  date: Date;
  sum: number;
  Car?:CarType;
  Configuration?: IConfiguration;
}
