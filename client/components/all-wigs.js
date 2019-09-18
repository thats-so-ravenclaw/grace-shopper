import React from 'react';
import { connect } from 'react-redux';
import getAllWigs from './store/wigs';

class AllWigs extends React.Component {
  componentDidMount() {
    this.props.getAllWigs();
  }

  render() {
    const wigs = this.props.wigs;
    return (
      <div>
        <h1>Shop our wigs!</h1>
        <div className="container wigs">
          {wigs === undefined
            ? ''
            : wigs.map(wig => (
                <div className="wig-card" key={wig.id}>
                  <img src={wig.image} />
                  <h3>{wig.name}</h3>
                  <p>{wig.price}</p>
                  <button type="button">View</button>
                </div>
              ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wigs: state.wigs
});

const mapDispatchToProps = dispatch => ({
  getWigs: () => dispatch(getAllWigs())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllWigs);
