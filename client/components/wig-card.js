import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCartThunk } from '../store/reducers/cart';

class WigCard extends React.Component {
  constructor() {
    super();
    this.addClick = this.addClick.bind(this);
  }

  addClick() {
    this.props.addItem(this.props.wig);
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
    addItem: item => dispatch(addToCartThunk(item))
  };
};

export default connect(null, mapDispatchToProps)(WigCard);

//Lyndsey's code below that I didn't want to delete:
// const WigCard = props => {
//   const { wig } = props;
//   return (
//     <div className="wig-card" key={wig.id}>
//       <div className="wig-img-div">
//         <img src={wig.image} />
//       </div>
//       <div className="wig-text-div">
//         <h3>{wig.name}</h3>
//         <p>Price: ${wig.price}</p>
//       </div>
//       <div className="wig-btn-div">
//         <Link to={`/wigs/${wig.id}`}>
//           <button type="button">View</button>
//         </Link>
//         <button type="button" onClick={this.addClick}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WigCard;
