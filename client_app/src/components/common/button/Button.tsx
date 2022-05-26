import './Button.scss'

export enum ButtonSize {
  NORMAL,
  SMALL,
}
interface IProps {
  outerFunction: any, 
  type: boolean,
  name: string,
  size?: ButtonSize
}

const Button = (props:IProps) => {
  const {name, type, outerFunction, size} = props

  const handleButtonSizes = (size:ButtonSize) => {
    switch(size){
      case ButtonSize.NORMAL: return {};
      case ButtonSize.SMALL: return  { height: 25, width: 80, lineHeight: '25px', fontSize: 12 };
    }
  }

  const handleClick = () => {
    outerFunction();
  } 

  console.log(size);

  return(
    <div style={ handleButtonSizes(size || ButtonSize.NORMAL)} className={`${type? 'button' : 'light_button'}`} onClick={handleClick}>
      {name}
    </div>
  )
}

export default Button;