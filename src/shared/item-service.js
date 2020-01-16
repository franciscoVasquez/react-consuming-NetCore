import Configuration from './configuration';

class ItemService {
  constructor() {
    this.config = new Configuration();

     this.state = {
      apiAction: 'animal'
    };
  }


  async retrieveItems() {
    return fetch(this.config.ITEM_COLLECTION_URL+this.state.apiAction)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        console.log("Retrieved items:");
        console.log(json);
        const items = [];
        const itemArray = json; //json._embedded.animal;
        for(var i = 0; i < itemArray.length; i++) {
          itemArray[i]["link"] =  this.config.ITEM_COLLECTION_URL+this.state.apiAction+'/'+itemArray[i]["animalId"];
          items.push(itemArray[i]);
        }
        return json;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async getItem(itemLink) {
    console.log("ItemService.getItem():");
    console.log("Item: " + itemLink);
    return fetch(itemLink)
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .then(item => {
          item["link"] = this.config.ITEM_COLLECTION_URL+'/'+item.animalId;
          return item;
        }
      )
      .catch(error => {
        this.handleError(error);
      });
  }
async createItem(newitem) {
    console.log("ItemService.createItem():");
    console.log(newitem);
    return fetch(this.config.ITEM_COLLECTION_URL, {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(newitem)
    })
      .then(response => {
       if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }
  async deleteItem(itemlink) {
    console.log("ItemService.deleteItem():");
    console.log("item: " + itemlink);
    return fetch(itemlink, {
      method: "DELETE",
      mode: "cors"
    })
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
      })
      .catch(error => {
        this.handleError(error);
      });
  }
  async updateItem(item) {
    console.log("ItemService.updateItem():");
    console.log(item);
    return fetch(item.link, {
      method: "PUT",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
          },
      body: JSON.stringify(item)
    })
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async processList(itemList, processAction) {
    console.log(this.config.ITEM_COLLECTION_URL+processAction);
    console.log("item List --->", JSON.stringify(itemList));
    return fetch(this.config.ITEM_COLLECTION_URL+processAction, {
      method: "POST",
      headers: {
            'Accept' : 'application/json, text/plain, */*',
            'Content-Type': "application/json"
        },
      body: JSON.stringify(itemList)
      
    })
      .then(response => {
       if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.text();
      })
      .catch(error => {
        this.handleError(error);
      });
  }
  handleResponseError(response) {
      throw new Error("HTTP error, status = " + response.status);
  }
  handleError(error) {
      console.log(error.message);
  }
}
export default ItemService;