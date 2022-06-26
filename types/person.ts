export interface PersonType {
  id: string;
  first_name: string;
  last_name: string;
  roles: Array<string>;
}

export enum PersonRoles {
  CLIENT,
  SELECTOR,
  TECHNICIAN
}
