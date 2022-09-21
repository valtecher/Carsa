export interface OrderType {
  id: string;
  type: string;
  status: string;
  client_id: string;
  selector_id: string;
  date: Date;
  sum: number;
}
