import './paper.scss';

interface IPaperProps {
  key?: any;
  className?: string,
  children?:any;
}

const Paper = (props:IPaperProps) => {

  return(
    <div key={props.key} className={`paper ${props.className}`}>
      { props.children }
    </div>
  )
}

export default Paper;