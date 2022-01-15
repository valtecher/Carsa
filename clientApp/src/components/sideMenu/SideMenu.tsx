import React, { useEffect, useState } from 'react';
import './SideMenu.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import PaymentsIcon from '@mui/icons-material/Payments';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
interface Tab {
    id: number,
    label:string, 
    field: string, 
    path: string,
    icon?: any,
    isSelected: boolean,
}
const tabs:Array<Tab> = [
  { id: 0, isSelected: false, label: 'Home', field: 'home', path:'/home', icon: "HomeIcon" },
  { id: 1, isSelected: true, label: 'Dashboard', field: 'dashBoard', path:'/dashboard', icon: "DashboardIcon" },
  { id: 2, isSelected: false, label: 'Orders', field: 'orders', path:'/dashboard/orders', icon: "AlignHorizontalLeftIcon" },
  { id: 3, isSelected: false,label: 'Payments', field: 'payments', path:'/dashboard/payments', icon: "PaymentsIcon"},
  { id: 4, isSelected: false, label: 'Cars', field: 'cars', path:'/dashboard/cars', icon: "CarRepairIcon" },
]

const SideMenu = () => {
  const history = useHistory();
  const [ tabsState, setTabsState ] = useState(tabs);
  const getIcon = (icon:string) => {
    switch(icon){
      case "DashboardIcon": 
        return (<DashboardIcon/>)
      case "AlignHorizontalLeftIcon":
        return (<AlignHorizontalLeftIcon/>)
      case "PaymentsIcon": 
        return (<PaymentsIcon/>)
      case "CarRepairIcon": 
        return (<CarRepairIcon/>)
      case "HomeIcon":
        return (<HomeIcon/>)
    }
  }

 

  useEffect(()=>{
    const currentPath = history.location.pathname;
      const updatedTabs = tabsState.map((tab:Tab)=>{
        if(tab.path != currentPath) {
          tab.isSelected = false;
        } else {
          tab.isSelected = true;
        }
        return tab
      })

      setTabsState(updatedTabs);
  }, [history.location.pathname])
 
  return(
    <div className='sideMenu-wrapper'>
      {tabsState.map((tab:Tab)=> {
        return (
          <div key={tab.id} className={`sideMenu-wrapper-tab ${tab.isSelected? 'selected' : ''}`}>
            <Link to={`${tab.path}`}>
              {getIcon(tab.icon)} {tab.label}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default SideMenu