import React, { Component } from 'react';
import './error-boundry.css';

export default class ErrorBoundry extends Component {
  state = {
    hasError: false
  };

  componentDidCatch (){
    this.setState({hasError: true});
  }

  render (){
    if(this.state.hasError){
      return <div className='error-boundry'>Что-то пошло не так...</div>
    }
    return this.props.children
  }
}