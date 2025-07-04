import React from 'react'

const Tile = ({name,count}) => {
  return (
    <div id="tile">
        <h1>{count}</h1>
        <p>{name}</p>
    </div>
  )
}

export default Tile