import './sideMenu.scss';
import BurgerIcon from '../../images/SideMenuIcons/Vectorburger.png';
import ArrowIcon from '../../images/SideMenuIcons/Vectorarrow.png';
import { useState } from 'react';
import { sideMenuItems } from './sideMenuItems';

const SideMenu = () => {
  
  const [ isOpened, setIsOpened ] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setIsOpened(!isOpened)
  }

  return(
    <div className={`sideMenu ${ isOpened ? 'menuExpanded' : '' }`}>
      <div  className={`sideMenu-burger expandedBurger `} onClick={handleMenuOpen}>
        <img src={ isOpened? ArrowIcon :  BurgerIcon }></img>
      </div>
      <div className='sideMenu-items'>
        
        { sideMenuItems.map((item) => {
          return(
            <div className='sideMenu-items-block' key={item.id}>
              <img src={  '../../images/SideMenuIcons/Vectorhome.png' }></img>
             { item.label }
            </div>
          )
        }) }
      </div>
    </div>
  )
}

export default SideMenu;