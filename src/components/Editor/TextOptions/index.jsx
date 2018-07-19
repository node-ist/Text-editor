import React, { Component } from 'react'
import Select from 'react-select'
import reactCSS from 'reactcss'
import InputRange from 'react-input-range'
import { SketchPicker } from 'react-color'
import AlignButtonComponent from '../AlignButtonComponent'
import centerAlign from '../utils/central-align.png'
import leftAlign from '../utils/left-align.png'
import rightAlign from '../utils/right-align.png'

export default class TextOptionsComponent extends Component {
  state = {
    displayColorPicker: false
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  render () {
    const { textOptions, checkFontStyle } = this.props;
    const styles = reactCSS({
      'default': {
        color: {
          width: '100%',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ textOptions.color.r }, ${ textOptions.color.g }, ${ textOptions.color.b }, ${ textOptions.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'block',
          cursor: 'pointer',
          verticalAlign: 'middle',
          marginTop: '76px'
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    const textAlign = ['left','center','right']
    const textAlignImages = [leftAlign, centerAlign, rightAlign]

    return (
      <div className='textOptions cf'>
        <h2>Text options</h2>
        <div className='fontOptions'>
          <h3>Font Size</h3>
          <InputRange
            className='slider'
            onChange={e => this.props.changeRange(e, this.props.type)}
            value={textOptions.size}
            minValue={8}
            maxValue={48}/>
          <p className='fontStyle'>
            <a
              href=""
              onClick={(e) => {e.preventDefault();checkFontStyle(e,'normal','normal')}}
              className={textOptions.style === 'normal' && textOptions.weight === 'normal' ? 'active' : ''}>
              <span>regular</span>
            </a>
            <a
              href=""
              onClick={(e) => {e.preventDefault();checkFontStyle(e,'italic','normal')}}
              className={textOptions.style === 'italic' ? 'active' : ''}>
              <i>italic</i>
            </a>
            <a
              href=""
              onClick={(e) => {e.preventDefault();checkFontStyle(e,'normal','bold')}}
              className={textOptions.weight === 'bold' ? 'active' : ''}>
              <b>bold</b>
            </a>
          </p>
        </div>
        <div className='fontsList'>
          <h3>Handwriting</h3>
          <Select
            onChange={e => this.props.onChangeFamily(e)}
            className="el-select"
            options={[
              {value: 'Knewave', label: 'Knewave'},
              {value: 'Chela One', label: 'Chela One'},
              {value: 'Roboto Mono', label: 'Roboto Mono'}
            ]}
            simpleValue
            clearable={false}
            searchable={false}
            value={textOptions.family}
          />
          <div style={ styles.swatch } onClick={ this.handleClick }>
            <div style={ styles.color } />
          </div>
          { this.state.displayColorPicker ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={ textOptions.color } onChange={ this.props.changeColor } />
          </div> : null }
        </div>
        <div className={'cf'} />
        <div className="textAlignment alignment">
          {
            textAlign.map((el, i) => {
              return <AlignButtonComponent
                image={textAlignImages[i]}
                type={this.props.type}
                onChangeTextAlign={this.props.onChangeTextAlign}
                position={el}
                key={i}
              />
            })
          }
        </div>
      </div>
    )
  }
}
