import React from 'react';
import { connect } from 'react-redux';

class AllWigs extends React.Component {
  render() {
    return (
      <div>
        <h1>Shop our wigs!</h1>
        <div className="container wigs">
          <div className="wig-card">
            <img src="" />
            <h3>Wig name</h3>
            <p>Price</p>
            <button type="button">View</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wigs: state.wigs
});

// const mapDispatchToProps = (dispatch) => ({

// });
