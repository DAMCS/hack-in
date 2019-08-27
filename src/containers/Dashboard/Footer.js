import React, { Component } from 'react';

const Menu = React.lazy(() => import('../../components/Menu/Menu'));
export default class Footer extends Component {
  render() {
    return (
      <React.Fragment >
        <div className="animated fadeIn">
          <Menu />
        </div>
      </React.Fragment>
    )
  }
}