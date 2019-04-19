import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button, Row } from 'react-bootstrap';
import './Style.css';
import Footer from "../footer/Footer";
import NavigationBar from"../navigationBar/NavigationBar";
import $ from 'jquery';
import google from 'google';
// import NavigationBar from "../navigationBar/NavigationBar";
// import Footer from "../footer/Footer";











 


class Home extends Component {


  

  render() {
    return (
      <div style={{ overflowX: "hidden" }}>
        <NavigationBar />
       


        
        
        



        
       

        

        
        <Row id="jumbotronColor">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <Row>
              <div className="col-12  col-md-12" >
                <p id="FirstTitle">The Egypt First</p>
              </div>
            </Row>
            <Row>
              <div className="col-12 col-md-12" >
                <p id="head">Talent Match-Making Platform</p>
              </div>
            </Row>
            <Row>
              <div className="col-12 col-md-12" >
                <p id="title">For Recruiters and Job Seekers</p>
              </div>
            </Row>
            <Row >
              <div className=" col-lg-12">
                <Link to="/candidates">
                  <button id="CandbtnSubmit" class="btn" >
                    JOB SEEKERS <i class="fa fa-arrow-right" style={{paddingLeft:"10px"}}></i>
                   </button>
                </Link>
                <Link to="/recruiters">
                  <button id="CombtnSubmit" class="btn" >
                    COMPANIES <i class="fa fa-arrow-right" style={{paddingLeft:"10px"}}></i>
                  </button>
                </Link>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                {/* <Link to="/recruiters">
                  <button id="CombtnSubmit" class="btn" >
                    Companies
                  </button>
                </Link> */}
              </div>
            </Row>
          </div>
          <div className="col-md-6 d-none d-lg-block">
            <img src={"./row1.png"} width="420px" height="300px" />
          </div>
          <div className="col-sm-12 col-12 d-lg-none  .d-xl-block mobileImage">
            <img src={"./row1.png"} className="homeImage" />
          </div>
        </Row>

        <Footer />
      </div>

    );
  }
}

export default Home;
