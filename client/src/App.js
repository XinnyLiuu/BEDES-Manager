import React, { Component } from 'react';
import axios from 'axios';
// import './App.css';

import Navbar from './components/Navbar';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    // initial active values of menu buttons
    this.state = {
      authenticated: false,
      usertype: ''
    };
  }

  componentDidMount() {
    const self = this;
    // check if user is logged in
    axios.get('/api/user/verify')
      .then(function(res) {
        console.log("in componentdidmount verify call in app.js");
        self.setState({
          authenticated: res.data.authenticated,
          usertype: res.data.usertype
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  checkIfUserLoggedIn = () => {
    const self = this;
    // check if user is logged in
    axios.get('/api/user/verify')
      .then(function(res) {
        console.log("in checkifuserloggin verify call in app.js");
        console.log(res.data);
        self.setState({
          authenticated: res.data.authenticated,
          usertype: res.data.usertype
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar checkIfUserLoggedIn={ this.checkIfUserLoggedIn }  authenticated={ this.state.authenticated } usertype={ this.state.usertype } />
        <Main checkIfUserLoggedIn={ this.checkIfUserLoggedIn } />
      </div>
    );
  }
}

export default App;
