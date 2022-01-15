export interface OrderType {
    id?: string,
    status: string,
    client_id: string,
    manager_id: string,
    date: Date,
    sum: number
}