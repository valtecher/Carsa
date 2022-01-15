import React from 'react'
import './pageLabel.scss'

interface Props {
  title: string,
}


const PageLabel = ({title} : Props) => {


  return(
    <div className='title'>
      <p>{title}</p>
    </div>
  )
}

export default PageLabel