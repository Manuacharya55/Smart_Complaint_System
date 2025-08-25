import React from 'react'
import { NavLink } from 'react-router-dom'

const QuickLinks = ({icon , text ,link}) => {
  return (
    <NavLink to={link}>
        <div id="links" className='background'>
        {icon}
        <p>{text}</p>
    </div>
    </NavLink>
  )
}

export default QuickLinks