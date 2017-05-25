import React, { Component } from 'react';
import './App.css';
import $ from "jquery";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {phone: '',report: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleChange(event) {
    this.setState({phone: event.target.value});
    
  }


  handleSubmit(event) {

    $.ajax({
      url: 'http://127.0.0.1:8981/api/sms-promotion',
      dataType: 'json',
      type: 'POST',
      data: {phone:this.state.phone},
      success: function(data) {
         
         var obj = JSON.parse(data);
         alert(obj.report);
      },
      error: function(xhr, status, err) {
        console.error('http://127.0.0.1:8981/api/sms-promotion', status, err.toString());
      }
    });


    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
        <label>
          Ender Phone:
          <input type="text" value={this.state.phone}   onChange={this.handleChange} />
        </label>
        <br/>
        <label>
          <input
            name="check1"
            type="checkbox"
            value="" 
            validationError="This is Mandatory" required
            />
            &nbsp;I am over 18
        </label>
        <br/>
        <label>
          <input
            name="check2"
            type="checkbox"
            value=""
            validationError="This is Mandatory" required
          />
          &nbsp;I accept the terms and conditions
        </label>
        <br/>
        <input type="submit" value="Send" />
      </form>


      </div>
    );
  }
}

export default App;
