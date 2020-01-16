import React, { Component } from 'react';
import './App.css';
import Validator from './shared/validators';

class EditItem extends Component {

  constructor(props) {
    super(props);
    this.validator = new Validator();
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const itemToEdit = props.item;
    this.state = {
      id: itemToEdit.animalId,
      food: itemToEdit.food,
      specie: itemToEdit.specie
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onCancel() {
    this.props.onCancel();
  }

  onSubmit() {
    if (this.validator.validateInputs(this.state)) {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <div className="input-panel">
      <span className="form-caption">Edit item:</span>&nbsp;<span>{this.state.specie}</span>
      <div>
        <label className="field-name">Animal:<br/>
          <input value={this.state.specie} name="name" maxLength="40" required onChange={this.handleInputChange} placeholder="Animal" />
        </label>
      </div>
      <div>
        <label className="field-name">Food:<br/>
          <input value={this.state.food} name="summary" maxLength="40" required onChange={this.handleInputChange} placeholder="food" />
        </label>
      </div>
      <br/>
      <button onClick={() => this.onCancel()}>Cancel</button>&nbsp;
      <button onClick={() => this.onSubmit()}>Update</button>
      </div>
    );
  }
}

export default EditItem;