export const carOrderStatuses = ['Reserved', 'Expired'] as const;

export type CarOrderStatus = typeof carOrderStatuses;

export interface Car_OrderType {
  order_id: string;
  car_id: string;
  start_reservation: Date;
  status: CarOrderStatus;
}

export const isCarOrderStatus = (status): status is CarOrderStatus => carOrderStatuses.includes(status);
