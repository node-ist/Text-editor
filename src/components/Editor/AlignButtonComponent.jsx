import React  from 'react'

const AlignButtonComponent  = ({onChangeTextAlign, position, type, image}) => (
    <button onClick={() => onChangeTextAlign(position, type)}>
      <img src={image} alt=""/>
    </button>
)

export default AlignButtonComponent