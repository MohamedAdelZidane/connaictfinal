import {  Row } from 'react-bootstrap';
import React, { Component } from "react";
import './Style.css'

class NavigationBar extends Component {
    render() {
        return (
          <Row >
            <div className="col-12 col-sm-12 col-md-12 col-lg-12" align="center"  id="navigationItems">
            <img src={"./cLogo.png"} height="50px" width="165px"/>
            </div>
          </Row>

        );}
}

export default NavigationBar;