import React, { Component } from 'react';
import './App.css';
import Validator from './shared/validators';

class ProcessorResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: props.result
    };
  }

  render() {
    return (
      <div class="card text-white bg-dark mb-3" style={{width: 26 + 'em'}}> 
            {this.state.result} 
          </div>
    );
  }
}

export default ProcessorResult;