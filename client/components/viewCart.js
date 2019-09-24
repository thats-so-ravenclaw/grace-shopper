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
    //item.id is passed in as a string
    let wigIdString = event.target.value;

    //converted item.id from string to number
    let wigId = Number(wigIdString);

    //filtering through cart on state to return wig that was clicked
    let filteredCart = this.props.cart.filter(wig => wigId === wig.id);
    console.log('FILTERED ', filteredCart);

    //filtered cart will always only have one wig in it's array
    let cartQuant = filteredCart[0].cartQuantity;
    let eachWigPrice = filteredCart[0].price;

    //multiply cart quanity with price of wig to send to thunk creator
    let subtotalWigPrice = eachWigPrice * cartQuant;

    console.log('CART QUANT ', cartQuant);
    console.log('EACH WIG PRICE ', eachWigPrice);
    console.log('WIG PRICE * QUANT ', subtotalWigPrice);

    this.props.decreaseTotal(subtotalWigPrice);
    this.props.removeItem(wigId);
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
                  value={item.id}
                  // value={item.price * item.cartQuantity}
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
  removeItem: wigId => dispatch(removeFromCartThunk(wigId)),
  decreaseTotal: subtotalWigPrice =>
    dispatch(updateTotalThunk(subtotalWigPrice))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);
