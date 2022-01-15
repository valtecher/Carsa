export enum PackageType {
  SINGLE_CAR = 'SINGLE_CAR', PACKAGE = 'PACKAGE', EXTENDED_PACKAGE='EXTENDED_PACKAGE'
}

export interface Package {
  id: number; 
  header: string;
  type: PackageType;
  price: number, 
  icon: string,
}
