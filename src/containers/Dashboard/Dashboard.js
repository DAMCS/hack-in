import React, { Component } from 'react';

const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('../../views/Pages/Home/Footer'));

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="animated fadeIn">
          <Header />
          Dashboard
          <Footer />
        </div>
      </React.Fragment>
    )
  }
}