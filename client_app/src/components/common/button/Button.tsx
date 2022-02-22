import './Button.scss'

interface IProps {
  outerFunction: any, 
  type: boolean,
  name: string,
}

const Button = (props:IProps) => {
  const {name, type, outerFunction} = props

  const handleClick = () => {
    outerFunction();
  }

  return(
    <div className={`${type? 'button' : 'light_button'}`} onClick={handleClick}>
      {name}
    </div>
  )
}

export default Button;