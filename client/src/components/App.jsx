import React from 'react';
import { browserHistory, withRouter , Redirect, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Search from './Search.jsx';
import BusinessList from './BusinessList.jsx';
import BusinessPage from './BusinessPage.jsx';
import config from '../../../config.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      business: {}
    }
    this.business = {};
    this.searchResults = {};
  }

  createUser(userData) {
    let self = this;
    axios.post('/server/signup', userData)
      .then(resp => {
        console.log(resp);
        let loginData = {
          username: userData.username,
          password: userData.password
        }
        this.loginUser(loginData);
      })
      .catch(err => {
        console.log(err);
      });
  }

  loginUser(userData) {
    let self = this;
    axios.post('/server/login', userData)
      .then(resp => {
        if (resp.data.length) {
          console.log('Rendering..')
          this.setState({
            username: resp.data[0].username,
            password: resp.data[0].password,
            loggedIn: true
          });
          self.props.history.push('/search');
        } else {
          console.log('INVALID USER');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  logoutUser() {
    this.setState({loggedIn: false})
  }

  getBusinesses(search) {
    let self = this;
    console.log(search)
    axios.get(`/server/search/${search}`)
      .then(resp => {
        self.searchResults = resp;
        self.props.history.push('/listings');
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateBusiness(business) {
    // this.setState({business: business})
    this.getBusinessInfo(business.id)
    // console.log(business);
  }

  getBusinessInfo(businessId) {
    let self = this;
    axios.get(`/server/business/${businessId}`)
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
      <div>
        <div id="topnav">
          {this.state.loggedIn ? 
            <div>
              <Link to="/search" className="logoLink">
                <img className="logo"src="https://image.ibb.co/cRbaE6/imageedit_16_4158574454.png"/>
                YALP!
              </Link>
              <Link to="/" className="logout">
                <div onClick={this.logoutUser.bind(this)}>Log Out</div>
              </Link>
            </div> : 
            <div>
              <img className="logo" src="https://image.ibb.co/cRbaE6/imageedit_16_4158574454.png"/>
              YALP!
            </div> 
          }
        </div>
        <Switch>
          <Route exact path="/" render={ () => <div id="form-background"><div id="form"><Home /></div></div> }/>
          <Route path="/search" render={ () => <div id="form-background"><div id="form"><Search getBusinesses={this.getBusinesses.bind(this)}/></div></div> }/>
          <Route path="/login" render={ () => <div id="form-background"><div id="form"><Login loginUser={this.loginUser.bind(this)}/></div></div> }/>
          <Route path="/signup" render={ () => <div id="form-background"><div id="form"><Signup createUser={this.createUser.bind(this)}/></div></div> }/>
          <Route path="/listings" render={ () => <div id="listings"><BusinessList businesses={ this.searchResults } updateBusiness={this.updateBusiness.bind(this)} /></div> } />
          <Route path={`/business/${this.state.business.id}`} render={ () => <BusinessPage business={this.state.business} getBusinessInfo={this.getBusinessInfo.bind(this)} getBusinesses={this.getBusinesses.bind(this)} /> } />
        </Switch>
    </div>
    )
  }
}

export default withRouter(App);
