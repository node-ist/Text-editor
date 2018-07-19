import React from 'react';
import InputRange from 'react-input-range';
import centerAlign from '../utils/central-align.png'
import leftAlign from '../utils/left-align.png'
import rightAlign from '../utils/right-align.png'
import AlignButtonComponent from '../AlignButtonComponent'

const imageAlign = ['left','center','right']
const imageAlignImages = [leftAlign, centerAlign, rightAlign]

const LogoComponent = ({ onChangeTextAlign, changeRange, infoLogo, type }) => (
  <div className='logo'>
    <div className="imageAlignment alignment">
    {
      imageAlign.map((el, i) => {
        return <AlignButtonComponent
          image={imageAlignImages[i]}
          type={type}
          onChangeTextAlign={onChangeTextAlign}
          position={el}
          key={i}
        />
      })
    }
    </div>
    <InputRange
      className='slider'
      onChange={e => changeRange(e, type)}
      value={infoLogo.size}
      minValue={1}
      maxValue={500} />
  </div>
)

export default LogoComponent