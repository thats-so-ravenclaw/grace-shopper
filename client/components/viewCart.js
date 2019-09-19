import React from 'react';
import { connect } from 'react-redux';

class ViewCart extends React.Component {
  render() {
    const items = this.props.cart ? (
      this.props.cart.map(item => {
        return (
          <div className="items" key={item.id}>
            <div className="wig-img-div">
              <img src={item.image} />
            </div>
            <div className="wig-text-div">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        );
      })
    ) : (
      <div className="no-items">There are no items in your cart!</div>
    );

    const itemSum = this.props.cart ? (
      this.props.cart.reduce((acc, item) => {
        return (acc += item.price);
      }, 0)
    ) : (
      <div className="no-items">There are no items in your cart!</div>
    );

    return (
      <div className="cart-items">
        {items}
        <div className="test">Total Price: ${itemSum}</div>
        <div className="checkout-button-div">
          <button type="button">Checkout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(ViewCart);
