import React, { Component } from 'react';
class ViewIngredient extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
    const inventory = this.props.inventory;
    const ingredient = this.props.ingredient;
        return (
            <div  class="p-3 mb-2 bg-white text-dark">
                <p className="lead">
                    
                </p>
            
            </div>
        )
    }

}
export default ViewIngredient;