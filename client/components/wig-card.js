import React from 'react';
import { Link } from 'react-router-dom';

const WigCard = props => {
  const { wig } = props;
  return (
    <div className="wig-card" key={wig.id}>
      <div className="wig-img-div">
        <img src={wig.image} />
      </div>
      <div className="wig-text-div">
        <h3>{wig.name}</h3>
        <p>Price: ${wig.price}</p>
      </div>
      <div className="wig-btn-div">
        <Link to={`/wigs/${wig.id}`}>
          <button type="button">View</button>
        </Link>
        <button type="button">Add to Cart</button>
      </div>
    </div>
  );
};

export default WigCard;
