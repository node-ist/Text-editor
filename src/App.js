import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AboutComponent from './components/About/index'
import EditorComponent from './components/Editor/index'
import HeaderComponent from './components/Header/index'

class App extends Component {
  state = {
    headerLogo: {
      link: '',
      size: 50,
      position: 'left',
      error: false,
      visibleDropArea: true
    },
    footerLogo: {
      link: '',
      size: 50,
      position: 'left',
      error: false,
      visibleDropArea: true
    },
    textOptions: {
      family: 'Roboto Mono',
      size: 14,
      position: 'left',
      color: {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
      },
      hexColor: '#000',
      style: 'normal',
      weight: 'normal'
    },
    text: ''
  }

  onImageDrop = (image, type) => {
    const value = { ...this.state[type] };
    if (image.length !== 0) {
      value.link = image[0].preview;
      value.visibleDropArea = false;
      this.setState({ [type]: value })
    } else {
      value.error = true;
      this.setState({ [type]: value })
    }
  };

  onChangeTextAlign = (val, type) => {
    const value = { ...this.state[type] };
    value.position = val;
    this.setState({ [type]: value })
  };

  onChangeFamily = (val) => {
    const value = { ...this.state.textOptions };
    value.family = val;
    this.setState({ textOptions: value })
  };

  changeRange = (val, type) => {
    const value = { ...this.state[type] };
    value.size = val;
    this.setState({
      [type]: value,
    })
  };

  changeHandler = (evt) => {
    this.setState({
      text: evt.target.value
    })
  }

  changeColor = (color) => {
    const value = this.state.textOptions;
    value.color = color.rgb;
    value.hexColor = color.hex;
    this.setState({
      textOptions: value
    })
  }

  checkFontStyle = (e,style,weight) => {
    const textOptions = this.state.textOptions
    textOptions.style = style
    textOptions.weight = weight
    this.setState({
      textOptions: textOptions
    })
    const elems = document.getElementsByClassName('fontStyle')[0].getElementsByTagName('a');
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    e.target.parentElement.className = 'active';
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <HeaderComponent/>
            <Route
              exact
              path="/"
              render={routeProps => <EditorComponent
                {...routeProps}
                data={this.state}
                onImageDrop={this.onImageDrop}
                onChangeTextAlign={this.onChangeTextAlign}
                onChangeFamily={this.onChangeFamily}
                changeRange={this.changeRange}
                changeHandler={this.changeHandler}
                changeColor={this.changeColor}
                checkFontStyle={this.checkFontStyle}
              />
              }
            />
            <Route path="/about" component={AboutComponent}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
