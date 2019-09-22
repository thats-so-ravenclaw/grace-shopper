import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import {getCart} from '../store/reducers/cart'

class ViewCart extends React.Component {
  render() {
    const items = this.props.cart
      ? this.props.cart.map(item => {
          // eslint-disable-next-line no-return-assign
          return (
            <div className="cart-div" key={item.id}>
              <div className="item-img-div">
                <img src={item.image} />
              </div>
              <div className="item-text-div">
                <h3>{item.name}</h3>
                <p>Quantity: {item.cartQuantity}</p>
                <p>Price: ${item.price * item.cartQuantity / 100}</p>
              </div>
            </div>
          );
        })
      : '';

    const itemSum = this.props.cart ? this.props.total : '';

    return (
      <div className="cart-container">
        <div className="cart-items">
          {items}
          <div className="cart-div">
            {this.props.cart.length > 0 ? (
              <h3>Total Price: ${itemSum / 100}</h3>
            ) : (
              <p>There are no items in your cart!</p>
            )}
          </div>
          <div className="checkout-button-div">
            <Link to="/checkoutForm">
              <button type="button">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  total: state.total
});

export default connect(mapStateToProps)(ViewCart);
