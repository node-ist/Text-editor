import React, { Component } from 'react'
import PreviewComponent from './Preview/index'
import LogoComponent from './Logo/index'
import TextOptions from './TextOptions/index'
import html2canvas from 'html2canvas'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { convertData } from './utils'

export default class EditorComponent extends Component {
  createImage = () => {
    html2canvas(document.querySelector("#capture")).then(canvas => {
      document.getElementById('downloadIMG').setAttribute('href',canvas.toDataURL());
      document.getElementById('downloadIMG').click();
    });
  }

  async createPdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      'Roboto Mono': {
        normal: 'RobotoMono.ttf',
        bold: 'RobotoMono-Bold.ttf',
        italics: 'RobotoMono-Italic.ttf'
      },
      'Chela One': {
        normal: 'ChelaOne.ttf',
        bold: 'ChelaOne.ttf',
        italics: 'ChelaOne.ttf'
      },
      Knewave: {
        normal: 'Knewave.ttf',
        bold: 'Knewave.ttf',
        italics: 'Knewave.ttf'
      }
    };
    const { headerLogo, footerLogo, text, textOptions } = this.props.data;
    const docDefinition = {
      defaultStyle: {
        font: 'Roboto Mono',
      },
      content: [],
      pageMargins: [10, 5, 10, 5],
      styles: {
        header: {},
        body: {
          fontSize: textOptions.size,
          color: textOptions.hexColor,
          font: textOptions.family,
          italics: textOptions.style === 'italic',
          bold: textOptions.weight === 'bold'
        },
        footer: {}
      }
    };

    if (headerLogo.link !== '') {
      const data = await convertData(headerLogo.link);
      docDefinition.content.push({
        image: data,
        width: headerLogo.size,
        alignment: headerLogo.position,
        style: 'header'
      })
    }
    if (text && text !== []) {
      docDefinition.content.push({
        marginTop: 10,
        text,
        alignment: textOptions.position,
        style: 'body'
      })
    }

    if (footerLogo.link !== '') {
      const data = await convertData(footerLogo.link);
      docDefinition.content.push({
        image: data,
        width: footerLogo.size,
        alignment: footerLogo.position,
        marginTop: 10 ,
        style: 'footer'
      })
    }
    pdfMake.createPdf(docDefinition).download();
  }

  render() {
    const data = this.props.data;
    const { textOptions } = data;
    const {
      onImageDrop,
      onChangeTextAlign,
      onChangeFamily,
      changeRange,
      changeHandler,
      changeColor,
      checkFontStyle,
    } = this.props;
    return (
      <div className='editor cf'>
        <div className="leftPart">
          <TextOptions
            changeRange={changeRange}
            onChangeTextAlign={onChangeTextAlign}
            onChangeFamily={onChangeFamily}
            type={'textOptions'}
            textOptions={textOptions}
            changeColor={changeColor}
            checkFontStyle={checkFontStyle}
          />
          <textarea
            name='editor'
            placeholder='Type your text'
            onChange={evt => changeHandler(evt)}
            value={data.text}
            style={{
              textAlign: textOptions.position,
              fontWeight: textOptions.weight,
              fontStyle: textOptions.style,
              fontSize: textOptions.size,
              color: textOptions.hexColor,
              fontFamily: textOptions.family
            }}
          />
        </div>
        <div className="rightPart">
          <h2>Images options</h2>
          <div className='headerLogo'>
            <h3>Header</h3>
            <LogoComponent
              onChangeTextAlign={onChangeTextAlign}
              changeRange={changeRange}
              onImageDrop={onImageDrop}
              infoLogo={data.headerLogo}
              type={'headerLogo'}
            />
          </div>
          <div className='footerLogo'>
            <h3>Footer</h3>
            <LogoComponent
              onChangeTextAlign={onChangeTextAlign}
              changeRange={changeRange}
              onImageDrop={onImageDrop}
              infoLogo={data.footerLogo}
              type={'footerLogo'}
            />
          </div>
          <div className="cf"></div>
          <PreviewComponent
            text={data.text}
            headerLogo={data.headerLogo}
            footerLogo={data.footerLogo}
            textOptions={textOptions}
            onImageDrop={onImageDrop}
          />
          <div className="cf" />
          <button onClick={this.createImage} className={'button'}>Save as .png</button>
          <button onClick={this.createPdf.bind(this)} className={'button'}>Save as .pdf</button>
          <a href="" id="downloadIMG" download={'image.png'} />
        </div>
      </div>
    )
  }
}