import React, { Component } from 'react';
import './App.css';

class ItemDetails extends Component {

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  render() {
    const item = this.props.item;
    return (
      <div className="input-panel">
      <h1>Editanto</h1>
      <span className="form-caption">Estas editando a <b>{item.food}</b></span>
      <div><span className="field-name">Animal:</span><br/> {item.specie}</div>
      <div><span className="field-name">Food:</span><br/> {item.food}</div>
      <br/>
      <button onClick={() => this.onDelete()}>Delete</button>&nbsp;
      <button onClick={() => this.onEdit()}>Edit</button>
      <button onClick={() => this.onCancel()}>Close</button>
      </div>
    );
  }

  onEdit() {
    this.props.onEdit();
  }

  onDelete() {
    const item = this.props.item;
    if(window.confirm("Are you sure to delete item: " + item.animal + " ?")) {
      this.props.onDelete(item.id);
    }
  }
  onCancel() {
    this.props.onCancel();
  }

}

export default ItemDetails;