export interface ISideMenuItem {
  id: number, 
  label: string, 
  link: string, 
  icon: string
}

export const sideMenuItems:Array<ISideMenuItem> = [
  { id: 1, label: 'Home', link: '/client/dashboard', icon: '../images/SideMenuIcons/Vectorhome.png' },
  // { id: 2, label: 'Cars', link: '/client/cars', icon: '../images/SideMenuIcons/Vectorcar.png' },
  { id: 2, label: 'Orders', link: '/client/orders', icon: '../images/SideMenuIcons/Vectorcart.png' },
  { id: 4, label: 'Payments', link: '/client/payments', icon: '../images/SideMenuIcons/Vectorcard.png' },
]