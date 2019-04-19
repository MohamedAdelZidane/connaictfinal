import React, { Component } from "react";
// import { API_URL } from "../../constants/Constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import { Row } from 'react-bootstrap';
import './RecruiterStyle.css';
import NavigationBar from "../navigationBar/NavigationBar";
import Footer from "../footer/Footer";

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

class Recruiters extends Component {


//   constructor(props) {
//     super(props);
//     this.state = {
//       submitting: false,
//       snackbarMessage: "",
//       snackbarOpen: false,
//     };
//   }

//   checkEmpty = () => {
//     if (
//       this.state.email === "" ||
//       this.state.password === "" ||
//       this.state.emailError ||
//       this.state.passwordError
//     )
//       return true;
//     else return false;
//   };

//   handleEmailChange = event => {
//     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     let error = false;
//     if (!re.test(event.target.value)) {
//       error = true;
//     }
//     this.setState({ email: event.target.value, emailError: error });
//   };

  render() {
    // const { value, opp } = this.state;
    // const { classes } = this.props;
    return (
      <div style={{ overflowX: "hidden" }}>
        <NavigationBar />

        <Row >
          <div className="col-md-12" id="slogan">
            <p id="RecruiterTitle">A new adventure begins 2019-05-05</p>
            <p id="RecruiterSlogan"><span style={{ color: "#205CE2" }}>Save</span> Time. <span style={{ color: "#205CE2" }}>Reduce</span> Cost. <span style={{ color: "#205CE2" }}>Find</span> Talent.</p>
          </div>
        </Row >
        <Row id="secondFeatures" >
          <div className="col-lg-4 col-md-6 col-12 col-sm-6 boxShadow" >
            <div class="shadow p-3 mb-5 bg-white rounded ">
              <div className="col-md-12" align="left">
                <img src={"./intelligentFilter.png"} style={{ width: "60px", height: "50px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                <p id="RecruiterFeatureTitle">
                Talent
                <span style={{ color: "#205CE2" }}> Pool</span> </p>
              </div>
              <div className="col-md-12 featureText">
                <p id="RecruiterFeatureDescription">
                Prevent paying for ads and insufficient sourcing channels. Our AI algorithms match you with top talents based on your criteria automatically, in real-time, with speed and incredible accuracy.
                {/* Our AI algorithms will source you top talents on-demand
                and you pay / right match. Prevent paying for ads and inefficient sourcing costs */}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 col-sm-6 boxShadow">
            <div class="shadow p-3 mb-5 bg-white rounded">
              <div className="col-md-12" align="left">
                <img src={"./candidateSummary.png"} style={{ width: "60px", height: "50px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                <p id="RecruiterFeatureTitle">Intelligent <span style={{ color: "#205CE2" }}>Talent Summaries</span></p>
              </div>
              <div className="col-md-12 featureText">
                <p id="RecruiterFeatureDescription">
                  Our AI algorithms will parse and extracts helpful details from candidate profile and CV like skills set, management level and work experience</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 col-sm-6 d-md-none d-lg-block d-sm-none boxShadow" >
            <div class="shadow p-3 mb-5 bg-white rounded">
              <div className="col-md-12" align="left">
                <img src={"./candidateResponse.png"} style={{ width: "60px", height: "50px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                <p id="RecruiterFeatureTitle">Increase Candidate <span style={{ color: "#205CE2" }}>Response Rate</span></p>
              </div>
              <div className="col-md-12 featureText">
                <p id="RecruiterFeatureDescription">
                  Eliminate phone screen and reach candidates through their preferred method of contacts</p>
              </div>
            </div></div>

          
        </Row>

        <Row id="secondFeatures">
          {/* <div className="col-lg-4 col-md-6 col-12 col-sm-6 d-md-none d-lg-block d-sm-none boxShadow" >
            <div class="shadow p-3 mb-5 bg-white rounded">
              <div className="col-md-12" align="left">
                <img src={"./candidateResponse.png"} style={{ width: "60px", height: "50px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                <p id="RecruiterFeatureTitle">Increase Candidate <span style={{ color: "#205CE2" }}>Response Rate</span></p>
              </div>
              <div className="col-md-12 featureText">
                <p id="RecruiterFeatureDescription">
                  Eliminate phone screen and reach candidates through their preferred method of contacts</p>
              </div>
            </div></div> */}

<div className="col-lg-4 col-md-6 col-12 col-sm-6 d-lg-none d-none d-sm-block boxShadow">
            <div class="shadow p-3 mb-5 bg-white rounded">
              <div className="col-md-12" align="left">
                <img src={"./candidateResponse.png"} style={{ width: "60px", height: "50px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                <p id="RecruiterFeatureTitle">Increase Candidate <span style={{ color: "#205CE2" }}>Response Rate</span></p>
              </div>
              <div className="col-md-12 featureText">
                <p id="RecruiterFeatureDescription">
                  Eliminate phone screen and reach candidates through their preferred method of contacts</p>
              </div>
            </div></div>


          <div className="col-lg-4 col-md-6 col-12 col-sm-6 boxShadow">
            <div class="shadow p-3 mb-5 bg-white rounded">
              <div className="col-md-12" align="left">
                <img src={"./qualifyCandidates.png"} style={{ width: "60px", height: "50px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                <p id="RecruiterFeatureTitle">Efficiently <span style={{ color: "#205CE2" }}>Qualify</span> Candidates</p>
              </div>
              <div className="col-md-12 featureText">
                <p id="RecruiterFeatureDescription">
                  Asking candidates custom questions through In-App chat</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 col-sm-6 boxShadow">
            <div class="shadow p-3 mb-5 bg-white rounded">
              <div className="col-md-12" align="left">
                <img src={"./candidateExperience.png"} style={{ width: "60px", height: "50px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                <p id="RecruiterFeatureTitle"><span style={{ color: "#205CE2" }}>Improve</span> Candidate Experience</p>
              </div>
              <div className="col-md-12 featureText">
                <p id="RecruiterFeatureDescription">
                  Send valuable feedback to candidates in minutes through efficient In-Feedback system</p>
              </div>
            </div>
          </div>
        </Row>



        <Row id="form">
          <div className="col-md-12">
            <p id="RecruiterSlogan2">We goes beyond keyword matches</p>
            <p id="RecruiterSlogan3">Notify me at launch!</p>
          </div>
          <div class="shadow-lg p-3 mb-5 bg-white rounded col-md-12" id="Recruitersform">

          
            <form
              id="myForm" method="POST" className="gform"
              action="https://script.google.com/macros/s/AKfycbwEwdKc-GO4jRXCySkmcF4YQWU-4TyUyhYSXryy2sKBZBZ5nWc/exec"
              
            >
              <div class="form-elements" >
              
              <TextField
                    id="name"
                    name="name"
                    label="Your Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                  />
              
              <TextField
                    id="email"
                    name="email"
                    label="Company Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"

                    required
                  >
                   <span class="email-invalid" style={{display:"none"}}>
          Must be a valid email address</span>
          </TextField>
             
              <TextField
                    id="phone"
                    name="phone"
                    type="number"
                    label="Your Phone Number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                  />
          
                <button
                //   disabled={this.checkEmpty() ? true : false}
                  color="primary"
                  variant="contained"
                  id="CreateAccBtn"
                >
                  NOTIFY ME
              </button>
              </div>
              <div class="thankyou_message" style={{display:"none"}}>
      <h4>We Recieved Your Information and We Will Get Back to you Soon!</h4>
    </div>

            

             


            </form>
          </div>



        </Row>





        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Recruiters);