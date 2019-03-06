import React, { Component } from 'react';
import { NavLink } from "react-router-dom";


        class ComposeSalad extends Component {
          constructor(props) {
            super(props);
            this.state = {foundation: '', proteins: [], extras: [], dressing: '', price: 15};
            this.handleFoundationChange = this.handleFoundationChange.bind(this);
            this.handleProteinsChange = this.handleProteinsChange.bind(this);
            this.handleExtrasChange = this.handleExtrasChange.bind(this);
            this.handleDressingChange = this.handleDressingChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }

          handleFoundationChange(event) {
            this.setState({foundation: event.target.value});
          }

          handleProteinsChange(event) {
              if(event.target.checked){
                this.setState({proteins: this.state.proteins.concat([event.target.name])});
                this.setState({price: this.state.price + this.props.inventory[event.target.name].price});
              } else {
                this.setState({proteins: this.state.proteins.filter(item => event.target.name !== item)});
                this.setState({price: this.state.price - this.props.inventory[event.target.name].price});
              }
          }

          handleExtrasChange(event) {
            if(event.target.checked){
              this.setState({extras: this.state.extras.concat([event.target.name])});
              this.setState({price: this.state.price + this.props.inventory[event.target.name].price});
            } else {
              this.setState({extras: this.state.extras.filter(item => event.target.name !== item)});
              this.setState({price: this.state.price - this.props.inventory[event.target.name].price});
            }
        }
            handleDressingChange(event) {
                this.setState({dressing: event.target.value});
          }
        
          handleSubmit(event) {
            event.preventDefault();
            event.target.classList.add("was-validated");
            if(event.target.checkValidity() === false){
                return;
            }
            this.props.callbackFromParent(this.state);
            this.props.history.push('/view-order');
            this.setState({foundation: 'Sallad', proteins: [], extras: [], dressing: 'Ceasardressing', price: 15});
          }


           render() {
            const inventory = this.props.inventory;
            let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
            let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
            let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
            let extras = Object.keys(inventory).filter(name => inventory[name].extra);
            return (
                <div  className="p-3 mb-2 bg-white text-dark">
                <p className="lead">Välj ingredienser till din sallad</p>
                    <hr className="my-4" />
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm">
                                    <div className="form-group">
                                        <p className="lead" htmlFor="foundationSelect">Välj bas:</p>
                                        <select required id="foundationSelect" className="mdb-select md-form colorful-select dropdown-primary form-control" value={this.state.foundation} onChange={this.handleFoundationChange}>
                                        <option value=''></option>
                                            {foundations.map(name => <option value = {name} key={name}>{name} +{inventory[name].price}kr</option>)}
                                        </select>
                                        <div className="invalid-feedback">Du måste välja en bas</div>
                                    </div>
                                    <div>
                                    <p className="lead">Välj protein:</p>
                                    </div>
                                    <div className="container-fluid">
                                        {proteins.map(name => <div><label><input 
                                                        name = {name}
                                                        type= "checkbox"
                                                        onChange={this.handleProteinsChange}/><NavLink className= "navlink"activeStyle={{ color: 'black' }} to='/view-ingredient/:name'>{name}</NavLink> +{inventory[name].price}kr</label></div>)}
                                    </div>
                                    <div>
                                        <p className="lead" htmlFor="dressingSelect">Välj dressing:</p>
                                        <select required required id="dressingSelect" className="mdb-select md-form colorful-select dropdown-primary form-control" value={this.state.dressing} onChange={this.handleDressingChange}>
                                        <option value=''></option>
                                            {dressings.map(name => <option value = {name} key={name}>{name} +{inventory[name].price}kr</option>)}
                                        </select>
                                        <div className="invalid-feedback">Du måste välja en dressing</div>
                                    </div >
                                    <br></br>
                                    <button className="btn btn-info btn-rounded" type= "submit"><u>Lägg till sallad</u></button>
                                </div> 
                                <div class="col-sm">
                                    <div>
                                    <p className="lead">Välj extras:</p>
                                    </div>
                                     <div className="container-fluid">
                                        {extras.map(name => <div><label><input 
                                                        name = {name}
                                                        type= "checkbox"
                                                        onChange={this.handleExtrasChange}/> <NavLink className= "navlink"activeStyle={{ color: 'black' }} to='/view-ingredient/:name'>{name}</NavLink> +{inventory[name].price}kr</label></div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                );
}}

export default ComposeSalad;