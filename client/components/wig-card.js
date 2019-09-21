import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCartThunk } from '../store/reducers/cart';
import { addTotalThunk } from '../store/reducers/total';

class WigCard extends React.Component {
  constructor() {
    super();
    this.addClick = this.addClick.bind(this);
  }

  addClick() {
    this.props.addItem(this.props.wig);
    this.props.addPrice(this.props.wig.price, this.props.wig.cartQuantity);
  }

  render() {
    const { wig } = this.props;

    return (
      <div className="wig-card" key={wig.id}>
        <div className="wig-img-div">
          <img src={wig.image} />
        </div>
        <div className="wig-text-div">
          <h3>{wig.name}</h3>
          <p>Price: ${wig.price}</p>
        </div>
        {wig.quantity === 0 ? <p>This item is sold out.</p> : ''}
        <div className="wig-btn-div">
          <Link to={`/wigs/${wig.id}`}>
            <button type="button">View</button>
          </Link>
          <button
            type="button"
            value={wig}
            onClick={this.addClick}
            disabled={wig.quantity === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: item => dispatch(addToCartThunk(item)),
    addPrice: (cost, quantity) => dispatch(addTotalThunk(cost, quantity))
  };
};

export default connect(null, mapDispatchToProps)(WigCard);
