import React, {Component} from 'react';
import './App.css';
import ItemService from './shared/item-service';
import ItemDetails from './item-details';
import NewItem from './new-item';
import EditItem from './edit-item';
import ProcessorResult from './result';

class App extends Component {
  constructor(props){
    super(props);
    this.itemService = new ItemService();
    this.onSelect = this.onSelect.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.state = {
      showDetails: false,
      editItem: false,
      selectedItem: null,
      newItem: null,
      processorResp: null
    }
  }
    //This is the first call of the component
    componentDidMount() {
      this.getItems();
  }

  render()

  {
    const items = this.state.items;
    if(!items) return null;
    const apiAction = "processor";
    const processorResp = this.state.processorResp;
    const showDetails = this.state.showDetails;
    const selectedItem = this.state.selectedItem;
    const newItem = this.state.newItem;
    const editItem = this.state.editItem;
    const listItems = items.map((item) =>
      <li key={item.animalId} onClick={() => this.onSelect(item.link)}>
         <a href="#"><span className="item-name">{item.food}</span></a>
      </li>
    );
    const listAnimals = items.map((item) => 
      <li key={item.animalId}>
          <span className="item-name">{item.specie}</span>
      </li>
    );

    return (
      <div className="card" style={{width: 35 + 'em'}}>
      <div className="card-body"> 
          <h1 className="card-title">Bag's Food</h1>
          <ul className="items">
            {listItems}
          </ul>
          <h1 className="card-title">Animals to eat</h1>
           <ul className="items">
            {listAnimals}
          </ul>
          <br/>
          <button type="button" name="button" onClick={() => this.onNewItem()}>Add food to bag</button>
          &nbsp;&nbsp;
          <button type="button" name="button" onClick={() => this.onProcess(items, apiAction)}>Let's Eat</button>
          <br/>
            {newItem && <NewItem onSubmit={this.onCreateItem} onCancel={this.onCancel}/>}
            {showDetails && selectedItem && <ItemDetails item={selectedItem} onEdit={this.onEditItem}  onDelete={this.onDeleteItem} onCancel={this.onCancel} />}
            {editItem && selectedItem && <EditItem onSubmit={this.onUpdateItem} onCancel={this.onCancelEdit} item={selectedItem} />}
            <br/>
            {processorResp && <ProcessorResult result={processorResp} />}
          
          
      </div>
      </div>
    );
  }
  getItems() {
    this.itemService.retrieveItems().then(items => {
          this.setState({items: items});
        }
    );
  }
  onSelect(itemLink) {
    this.clearState();
    this.itemService.getItem(itemLink).then(item => {
      this.setState({
          showDetails: true,
          selectedItem: item
        });
      }
    );
  }

  onCancel() {
    this.clearState();
  }

  onNewItem() {
    this.clearState();
    this.setState({
      newItem: true
    });
  }

  onProcess(items, apiAction) {
    this.clearState();
    this.itemService.processList(items, apiAction).then(resp => {
      console.log(resp);
        this.setState({
          processorResp: resp
        });
      }
    );
  }

  onEditItem() {
    this.setState({
      showDetails: false,
      editItem: true,
      newItem: null
    });
  }

  onCancelEdit() {
    this.setState({
      showDetails: true,
      editItem: false,
      newItem: null
    });
  }

  onUpdateItem(item) {
    this.clearState();
    this.itemService.updateItem(item).then(item => {
        this.getItems();
      }
    );
  }

  onCreateItem(newItem) {
    this.clearState();
    this.itemService.createItem(newItem).then(item => {
        this.getItems();
      }
    );
  }

  onDeleteItem(itemLink) {
    this.clearState();
    this.itemService.deleteItem(itemLink).then(res => {
        this.getItems();
      }
    );
  }

  clearState() {
    this.setState({
      showDetails: false,
      selectedItem: null,
      editItem: false,
      newItem: null
    });

  }
}

export default App;
