import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <React.Fragment >
        <div className="animated fadeIn">
          <section id="lab_social_icon_footer">
            <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
            <div class="container">
              <div class="text-center center-block">
                <a href="https://www.facebook.com/bootsnipp"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>
                <a href="https://twitter.com/bootsnipp"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a>
                <a href="https://plus.google.com/+Bootsnipp-page"><i id="social-gp" class="fa fa-google-plus-square fa-3x social"></i></a>
                <a href="mailto:#"><i id="social-em" class="fa fa-envelope-square fa-3x social"></i></a>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    )
  }
}