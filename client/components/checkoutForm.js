import React from 'react';
import { connect } from 'react-redux';

class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      name: '',
      shippingAddressStreet: '',
      shippingAddressCity: '',
      shippingAddressState: '',
      shippingAddressZipcode: '',
      billingAddressStreet: '',
      billingAddressCity: '',
      billingAddressState: '',
      billingAddressZipcode: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //this.props.postNewOrder(this.state) //this thunk does not exist yet
    //window.location.pathname = '/orderCompleted' //to render completed order page, subject to change
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Checkout</h2>
        <div id="order-summary">
          <h4>This is where an order summary lives</h4>
        </div>
        <div className="form-box">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </form>
    );
  }
}
