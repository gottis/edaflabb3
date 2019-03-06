import React, { Component } from 'react';
import './App.css';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import ViewIngredient from './ViewIngredient';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {order: [], inventory: {}, counter: 0};
    this.localStorage = window.localStorage;
    this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this);
    //curl -H "Content-Type: application/json" -d "data=salad1&data2=salad2" http://localhost:8080/orders/
    /*fetch('https://localhost:8080/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order : ["salad1", "salad2"]
        })
    })*/
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.localStorage) {
      if (this.localStorage.hasOwnProperty(key)) {
        this.state.counter = +this.state.counter + +1;
        let value = this.localStorage.getItem(key);
          value = JSON.parse(value);
          this.setState({order: this.state.order.concat(value) });
      }
    }
}

  addSalad = (salad) => {
    this.localStorage.setItem("salad"+this.state.counter, JSON.stringify(this.state.order));
    this.setState({order: this.state.order.concat(salad)});
    this.state.counter = +this.state.counter + +1;
  }

  payOrder = (price) => {
    this.state.counter = 0;
    this.setState({order: []});
    localStorage.clear();
  }

  componentDidMount() {
    const API = "http://localhost:8080/";
    const fAPI = API + "foundations/";
    const pAPI = API + "proteins/";
    const eAPI = API + "extras/";
    const dAPI = API + "dressings/";

    fetch(fAPI).then(response => response.json()).then(data => {
      data.forEach(event => {
        fetch(fAPI + [event]).then(response => response.json()).then(data => {
          Object.assign(this.state.inventory, {[event] : data})
        })
      })
    });

    fetch(pAPI).then(response => response.json()).then(data => {
      data.forEach(event => {
        fetch(pAPI + [event]).then(response => response.json()).then(data => {
          Object.assign(this.state.inventory, {[event] : data})
        })
      })
    });

    fetch(eAPI).then(response => response.json()).then(data => {
      data.forEach(event => {
        fetch(eAPI + [event]).then(response => response.json()).then(data => {
          Object.assign(this.state.inventory, {[event] : data})
        })
      })
    });

    fetch(dAPI).then(response => response.json()).then(data => {
      data.forEach(event => {
        fetch(dAPI + [event]).then(response => response.json()).then(data => {
          Object.assign(this.state.inventory, {[event] : data})
        })
      })
    });
    this.hydrateStateWithLocalStorage();
  }

  render() {
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={this.state.inventory}
      callbackFromParent={this.addSalad} />;
    const viewOrderElem = (params) => <ViewOrder {...params} order={this.state.order}
      callbackFromParent={this.payOrder} />;
      const viewIngredientElem = (params) => <ViewIngredient {...params} inventory={this.state.inventory}/>;
      const Page404 = ({ location }) => (
        <div  class="p-3 mb-2 bg-white text-dark">
           <p class="text-center"><p className="lead">404: No match found for <code>{location.pathname}</code></p></p>
        </div>
       );

    return (
        <div class="p-3 mb-2 bg-white text-white">
          <div class="p-3 mb-2 bg-info text-white">
            <p class="text-center">
              <h1 className="display-4">Salladsbaren</h1>
              <hr className="my-4" />
              <p className="lead">Välkommen till Salladsbaren, {<br></br>}baren som prioriterar kvalité för att du som kund ska kunna {<br></br>} avnjuta en riktigt krispig sallad.</p>
            </p>
          <Router>
            <Switch>
              <div class="container-fluid">
                <hr className="my-4" />
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <Link className="nav-link" to='compose-salad'>
                      <p className="lead">Komponera din egen sallad</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='view-order'> <p className="lead">Kundvagn</p></Link>
                  </li>
                </ul>
                <Route path="/" exact={true} component={composeSaladElem}/>
                <Route path="/compose-salad" component={composeSaladElem}/>
                <Route path="/view-order" component={viewOrderElem}/>
                <Route path='*' exact insecure component={() => Page404} />
                <Route path='/view-ingredient/:name' component={viewIngredientElem}/>
                {/*<Route exact insecure component={Page404}/>*/}
              </div>
            </Switch>
          </Router>
          </div>
        </div>
    );
  }
}

export default App;
