import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Row} from 'react-bootstrap';
import Button from "@material-ui/core/Button";

import './Style.css';
import Footer from "../footer/Footer";
import TextField from "@material-ui/core/TextField";
import NavigationBar from"../navigationBar/NavigationBar";




(function() {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements).filter(function(k) {
          return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    console.log(formData);
    return formData;
  }

  // function fileUploaded(status) {
    
  // }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var data = getFormData(form);         // get the values submitted in the form

    /* OPTION: Remove this comment to enable SPAM prevention, see README.md
    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
      return false;
    }
    */
    if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
      var invalidEmail = form.querySelector(".email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          console.log(xhr.status, xhr.statusText);
          console.log(xhr.responseText);
          form.reset();
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
          return;
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
  }
  
  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});



class Candidates extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    // const { value, opp } = this.state;
    // const { classes } = this.props;
    return (
      <div style={{ overflowX: "hidden" }}>
        <NavigationBar />

        <Row id="content">
          <div className="col-md-12 col-lg-6 col-12" >
            <p id="CandidatesTitle">A new adventure begins 2019-05-01</p>
            <p id="CandidatesSlogan">Get <span style={{ color: "#205CE2" }}>Shortlisted</span>. Get <span style={{ color: "#205CE2" }}>Hired</span>.</p>
            <div class="shadow-lg p-3 mb-5 bg-white rounded " id="mobileForm" >
              <h5 id="mobileFormText">Notify me at launch!</h5>




              <form id="myForm" method="POST" className="gform"
  action="https://script.google.com/macros/s/AKfycbwEwdKc-GO4jRXCySkmcF4YQWU-4TyUyhYSXryy2sKBZBZ5nWc/exec"
  >
    <div class="form-elements">

    <TextField
                    id="name"
                    name="name"
                    label="Your Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                  />

      {/* <fieldset class="pure-group">
        <label for="name">Name: </label>
        <input id="name" name="name" placeholder="What your Mom calls you" />
      </fieldset> */}

<TextField
                    id="gradYear"
                    name="gradYear"
                    type="number"
                    label="What is Your Graduation Year?"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                  />

      {/* <fieldset class="pure-group">
        <label for="message">Message: </label>
        <textarea id="message" name="message" rows="10"
        placeholder="Tell us what's on your mind..."></textarea>
      </fieldset> */}

<TextField
                    id="email"
                    name="email"
                    label="Your Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"

                    required
                  >
                   <span class="email-invalid" style={{display:"none"}}>
          Must be a valid email address</span>
          </TextField>
                 

      {/* <fieldset class="pure-group">
        <label for="email"><em>Your</em> Email Address:</label>
        <input id="email" name="email" type="email" 
        required placeholder="your.name@email.com"/>
        <span class="email-invalid" style={{display:"none"}}>
          Must be a valid email address</span>
      </fieldset> */}

      {/* <fieldset class="pure-group">
        <label for="color">Favourite Color: </label>
        <input id="color" name="color" placeholder="green" />
      </fieldset> */}

<button
                    // disabled={this.checkEmpty() ? true : false}
                    // color="primary"
                    // variant="contained"
                    className="submitBtn"
                  >
                    Submit
              </button> 

      {/* <button  class="button-success pure-button button-xlarge">
        <i class="fa fa-paper-plane"></i>&nbsp;Send</button> */}
    </div>

    <div class="thankyou_message" style={{display:"none"}}>
      <h4>We Recieved Your Information and We Will Get Back to you Soon!</h4>
      Follow Us on Social Media <a href="https://www.facebook.com/connaict/?ref=aymt_homepage_panel&eid=ARAOswQk0wuajT6au-AnGFO6nxCt7j7iApRz2HH6jZ6q8BjMQ-fI8WhUtUHGE3x70BbLD00f4tj7vI2i" id="followBtn"><span  id="followBtn" class="fa fa-facebook"></span></a>
    </div>

  </form>


            </div>
          </div>

          <div className='col-md-6 col-12 d-none d-lg-block' >
          <Row>
              <div className="col-2 iconImage">
                <img src={"./application.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-10 iconText">
                <h4 id="FeatureTitle"><span style={{ color: "#205CE2" }}>One</span> application</h4>
                <p id="FeatureDescription">
                Stop wasting time applying in irrelevant jobs we creates and submits your application in seconds</p>
              </div>
            </Row>

            <Row>
              <div className="col-2 iconImage" >
                <img src={"./tailoredjobs.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-10 iconText">
                <p id="FeatureTitle"><span style={{ color: "#205CE2" }}>Jobs</span> tailored to you</p>
                <p id="FeatureDescription">
                We analyze your skills, interests and goals to connect you with opportunities that you’re qualified for at companies that share your values.
                {/* Sophisticated matching algorithms pairs you with suitable jobs based on your interest */}
                </p>
              </div>
            </Row>

            <Row>
              <div className="col-2 iconImage">
                <img src={"./careerGrowth.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-10 iconText">
                <p id="FeatureTitle"><span style={{ color: "#205CE2" }}>Career development</span> plan</p>
                <p id="FeatureDescription">
                We helps you discover the next step in your career. You will receive recommended courses and what you need to grow your career based on your interests.
                </p>
              </div>
            </Row>


            

           

            
          </div>


          <div className='d-lg-none .d-xl-block' id="mobileFeatures">
            <Row>
            <div className="col-12 col-sm-6 col-md-6 col-lg-12">
                <div className="featureIcon" align="center">
                  <img src={"./application.png"} id="featureIcon" />
                </div>
                <div className="iconTitle">
                  <p id="FeatureTitle"><span style={{ color: "#205CE2" }}>One</span> application</p>
                </div>
                <div className="iconDescription">
                  <p id="FeatureDescription">
                Stop wasting time applying in irrelevant jobs we creates and submits your application in seconds</p>
                  
                  {/* Stop wasting time applying in irrelevant jobs we creates and submits your application in seconds</p> */}
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-12">
                <div className="featureIcon" align="center" >
                  <img src={"./tailoredjobs.png"} />
                </div>
                <div className="iconTitle">
                  <p id="FeatureTitle"><span style={{ color: "#205CE2" }}>Jobs</span> tailored to you</p>
                </div>
                <div className="iconDescription">
                  <p id="FeatureDescription">
                We analyze your skills, interests and goals to connect you with opportunities that you’re qualified for at companies that share your values.
                  
                  {/* Sophisticated matching algorithms pairs you with suitable jobs based on your interest */}
                  </p>
                </div>
              </div>
              
            </Row>
            <Row>

              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="featureIcon" align="center">
                  <img src={"./careerGrowth.png"} />
                </div>
                <div className="iconTitle2">
                  <p id="FeatureTitle"><span style={{ color: "#205CE2" }}>Career development</span> plan</p>
                </div>
                <div className="iconDescription2">
                  <p id="FeatureDescription">
                We helps you discover the next step in your career. You will receive recommended courses and what you need to grow your career based on your interests.
                  {/* We recommend you suitable courses based on your interest */}
                  </p>
                </div>
              </div>

            </Row>
          </div>
        </Row>

        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Candidates);