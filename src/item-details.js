import React, { Component } from 'react';
import './App.css';

class ItemDetails extends Component {

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    const item = this.props.item;
    return (
      <div className="input-panel">
      <span className="form-caption">{ item.animal}</span>
      <div><span className="field-name">Animal:</span><br/> {item.animal}</div>
      <div><span className="field-name">Food:</span><br/> {item.summary}</div>
      <br/>
      <button onClick={() => this.onDelete()}>Delete</button>&nbsp;
      <button onClick={() => this.onEdit()}>Edit</button>
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

}

export default ItemDetails;