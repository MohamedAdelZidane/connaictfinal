import React, { Component } from "react";
import { Row } from 'react-bootstrap';
import './Style.css'


class Footer extends Component {



  render() {
    return (
      <div >

        <Row id="footer" >
          <div className="col-md-6 d-none d-lg-block d-md-block" id="aboutInNavigation">
            <p>Connaict is a talent network platform where job seekers can <br/>make their profile and the coolest companies reach out <br/>directly. It's an automated, smart and stress-free way <br/>for jobs seekers to start their career.</p>
            <p >&copy; 2019 Connaict, All rights reserved  </p>
          </div>
          <div className="col-md-6 col-6 linksColor" >
            <p id="aboutInNavigation"><b>KEEP IN TOUCH</b></p>
            <a href="https://www.facebook.com/connaict/" class="fa fa-facebook"></a>
          </div>
          <div className="col-sm-12 d-lg-none d-md-none .d-xl-block" id="aboutInNavigation">
            <p>Connaict is an AI company aims to connect recruiters with qualified candidates using AI, also helping candidates developing in their career path.</p>
            <p >&copy; 2019 Connaict, All rights reserved  </p>
          </div>
        </Row>
      </div>

    );
  }
}

export default Footer;