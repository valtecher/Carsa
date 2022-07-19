import './sideMenu.scss';
import { useState } from 'react';
import { sideMenuItems } from './sideMenuItems';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  
  const navigate = useNavigate();
  const [ isOpened, setIsOpened ] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setIsOpened(!isOpened)
  }

  return(
    <div className={`sideMenu ${ isOpened ? 'menuExpanded' : '' }`}>
      <div  className={`sideMenu-burger expandedBurger `} onClick={handleMenuOpen}>
        <img src={ !isOpened? '../images/SideMenuIcons/Vectorburger.png' : '../images/SideMenuIcons/Vectorarrow.png' }></img>
      </div>
      <div className='sideMenu-items'>
        
        { sideMenuItems.map((item) => {
          return(
            <div className='sideMenu-items-block' key={item.id} onClick={() => {navigate(item.link)}}>
              <img src={item.icon}/>
              { isOpened? item.label : '' }
            </div>
          )
        }) }
      </div>
    </div>
  )
}

export default SideMenu;