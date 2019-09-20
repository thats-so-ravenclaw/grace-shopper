import React from 'react';
import { connect } from 'react-redux';
import { placeOrderThunk } from '../store/reducers/order';
//need to import thunks to post an order

class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const order = {
      total: this.state.total,
      street: this.state.shippingAddressStreet,
      city: this.state.shippingAddressCity,
      state: this.state.shippingAddressState,
      zip: this.state.shippingAddressZipcode
    };
    this.props.placeOrderThunk(order, this.state.cart, this.state.total);
    //window.location.pathname = '/orderCompleted' //to render completed order page, subject to change
  }

  render() {
    const { cart } = this.props;

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
          <div>
            <h4>Shipping Address:</h4>
            <div>
              <label htmlFor="shippingAddressStreet">Street:</label>
              <input
                type="text"
                name="shippingAddressStreet"
                value={this.state.shippingAddressStreet}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="shippingAddressCity">City:</label>
              <input
                type="text"
                name="shippingAddressCity"
                value={this.state.shippingAddressCity}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="shippingAddressState">State:</label>
              <input
                type="text"
                name="shippingAddressState"
                value={this.state.shippingAddressState}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="shippingAddressZipcode">Zip:</label>
              <input
                type="text"
                name="shippingAddressZipcode"
                value={this.state.shippingAddressZipcode}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div>
            <h4>Billing Address:</h4>
            <div>
              <label htmlFor="billingAddressStreet">Street:</label>
              <input
                type="text"
                name="billingAddressStreet"
                value={this.state.billingAddressStreet}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="billingAddressCity">City:</label>
              <input
                type="text"
                name="billingAddressCity"
                value={this.state.billingAddressCity}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="billingAddressState">State:</label>
              <input
                type="text"
                name="billingAddressState"
                value={this.state.billingAddressState}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="billingAddressZipcode">Zip:</label>
              <input
                type="text"
                name="billingAddressZipcode"
                value={this.state.billingAddressZipcode}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit">Place Order</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    total: state.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    placeOrderThunk(order, cart, total) {
      dispatch(placeOrderThunk(order, cart, total));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
