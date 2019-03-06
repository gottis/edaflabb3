import React, { Component } from 'react';


        class ViewOrder extends Component {
          constructor(props) {
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            const total = 0;
          }

          handleChange(event) {
            this.setState({value: event.target.value});
          }

          handleSubmit(event) {
            event.preventDefault();
            this.setState({price: this.total});
            this.props.callbackFromParent(this.total);
            this.total = 0;
          }

          render() {
            const order = this.props.order;
            //total = order.map(name => +name.price + +total);
            this.total =  order.reduce((a, b) => a + b.price,0);
            return (
                    <div  className="p-3 mb-2 bg-white text-dark">
                    <p className="text-center">
                        <form onSubmit={this.handleSubmit}>
                            <div class="container">
                                    <div>
                                    <p className="lead">Kundvagn</p>
                                    </div>
                                    <div>
                                        <ol>
                                            {order.map(name => <li key={name}><p className="lead">{name.foundation} + {name.proteins.join(' + ')} + {name.extras.join(' + ')} + {name.dressing}, <u>{name.price}kr</u></p></li>)}
                                        </ol>
                                    </div>
                                    <p className="lead">Total: {this.total}kr</p> 
                                    <div>
                                        <br></br>
                                        <button className="btn btn-info btn-rounded" type= "submit"><u>Till betalning</u></button>
                                    </div>
                            </div>
                            </form>
                            </p>
                    </div>
            );
          }
        }

export default ViewOrder;