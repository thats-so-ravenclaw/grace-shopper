import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCartThunk } from '../store/reducers/cart';
import { updateTotalThunk } from '../store/reducers/total';

class ViewCart extends React.Component {
  constructor() {
    super();
    this.removeClickItem = this.removeClickItem.bind(this);
  }

  removeClickItem(event) {
    // console.log(event.target.value);
    let wigPrice = event.target.value;
    // console.log('WIG PRICE ', wigPrice);
    this.props.decreaseTotal(wigPrice);
    this.props.removeItem(this.props.cart[0]);
  }

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
                <button
                  type="button"
                  value={item.price * item.cartQuantity}
                  onClick={this.removeClickItem}
                >
                  Remove from Cart
                </button>
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

const mapDispatchToProps = dispatch => ({
  removeItem: wig => dispatch(removeFromCartThunk(wig)),
  decreaseTotal: wigPrice => dispatch(updateTotalThunk(wigPrice))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);
