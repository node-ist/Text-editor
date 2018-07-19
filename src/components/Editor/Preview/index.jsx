import React from 'react';
import Dropzone from 'react-dropzone';

const PreviewComponent = ({ onImageDrop, text, headerLogo, footerLogo, textOptions }) => (
  <div className='preview'>
    <Dropzone
      className="dropzone-style headerDrop"
      multiple={false}
      accept="image/*"
      style={{display:headerLogo.visibleDropArea ? 'block' : 'none'}}
      onDrop={e => onImageDrop(e, 'headerLogo')}>
      <div>
        <span className="desc">Drag & drop your logo</span>
        <p>.jpg, .png</p>
      </div>
      {
        headerLogo.error ? <div className="error">This file is incorrect. Please check and try again.</div> : ''
      }
    </Dropzone>
    <div id={'capture'}>
      <div className="logoBlock" style={{textAlign: headerLogo.position}}>
        <img src={headerLogo.link} alt="" style={{width: headerLogo.size + 'px'}}/>
      </div>
      <p style={{fontSize: textOptions.size + 'px',
        textAlign: textOptions.position,
        color: 'rgba('+ textOptions.color.r+','+textOptions.color.g+','+textOptions.color.b+','+textOptions.color.a+')',
        fontStyle: textOptions.style,
        fontWeight: textOptions.weight,
        fontFamily: textOptions.family
      }}>{text}</p>
      <div className="logoBlock" style={{textAlign: footerLogo.position}}>
        <img src={footerLogo.link} alt="" style={{width: footerLogo.size + 'px'}}/>
      </div>
    </div>
    <Dropzone
      className="dropzone-style footerDrop"
      multiple={false}
      accept="image/*"
      style={{display:footerLogo.visibleDropArea ? 'block' : 'none'}}
      onDrop={e => onImageDrop(e, 'footerLogo')}>
      <div>
        <span className="desc">Drag & drop your logo</span>
        <p>.jpg, .png</p>
      </div>
      {
        footerLogo.error ? <div className="error">This file is incorrect. Please check and try again.</div> : ''
      }
    </Dropzone>
  </div>
)

export default PreviewComponent