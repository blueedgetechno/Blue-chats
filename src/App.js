import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Groups from './components/dashboard/Groups'

import {Eyeon, Eyeoff} from './components/dashboard/icons'

import './css/App.scss'
import './css/Popup.scss'
import './css/SvgIcon.scss'

import axios from 'axios'

const blueapi = process.env.REACT_APP_API

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentgroupid: null,
      user: null,
      popupmedia: 1,
      iswrong: false,
      serverError: false,
      ispassword: false,
      islogin: true
    }
  }

  togglepasswordvisibility() {
    this.setState({
      ispassword: !this.state.ispassword
    })
  }

  logout(){
    localStorage.removeItem("user")
    this.setState({user: null})
  }

  signup() {
    //console.log("Signup")

    const user = {}

    user.username = document.getElementById('username').value
    user.password = document.getElementById('password').value

    axios({
      url: `${blueapi}/users/signup`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(user)
    }).then(res => {
      this.toggleauthtype()
    }).catch(err => {
      this.setState({serverError: true})
      console.log("Error")
      console.log(err)
    })
  }

  login(){
    // return
    this.setState({iswrong: false})
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    axios({
      url: `${blueapi}/users/login/${username}/${password}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // console.log(res.data);
      if(res.data.status=="OK"){
        const user = res.data.result
        localStorage.setItem("user",JSON.stringify(user))
        this.setState({user: user})
      }else{
        this.setState({iswrong: true})
        console.log("Failed");
      }
    }).catch(err => {
      this.setState({iswrong: true})
      console.log(err)
    })

  }

  changecurrentgroup(id) {
    this.setState({
      currentgroupid: id
    }, () => {
      // console.log("Hi",this.state.currentgroupid)
    })
  }

  togglemedia() {
    this.setState({
      popupmedia: this.state.popupmedia ^ 1
    })
  }

  toggleauthtype(){
    this.setState({
      islogin: this.state.islogin ^ 1
    })
  }

  componentWillMount(){
    if(localStorage.getItem("user")){
      this.setState({user: localStorage.getItem("user")})
    }
  }

  render() {
    console.log("Rendering App",this.state.currentgroupid)
    return (<BrowserRouter>
      <div className="App">
        <div className="display">
          <Groups
            changecurrentgroup={this.changecurrentgroup.bind(this)}
            logout = {this.logout.bind(this)}
          /> {/* <br/> */}
          {
            this.state.user && this.state.currentgroupid
              ? <Dashboard currentgroupid={this.state.currentgroupid} user={this.state.user}/>
              : null
          }
          {
            this.state.currentgroupid
              ? null
              : (<div className="dashboard container">
                <div className="emptyscreen">
                  <span>LOL</span>
                </div>
              </div>)
          }
          {
            this.state.user
              ? null
              : (<div className={this.state.popupmedia
                  ? "mediapopup showpdf"
                  : "mediapopup"}>
                <div className="mediapopupoverlay"></div>
                <div className="mediacontainer logincontainer">
                  {
                    this.state.iswrong
                      ? <div className="wrongpopup">Wrong credentials</div>
                      : null
                  }

                  {
                    this.state.serverError
                      ? <div className="wrongpopup">Login Error</div>
                      : null
                  }
                  <div className="titleauth">{this.state.islogin?"Login":"Sign up"}</div>

                  <div className={"optiongiven"}>
                    <span>User name</span>
                    <input required id="username" type="text"/>
                  </div>
                  <div className="optiongiven">
                    <span>Password</span>
                    <div className="showpass">
                      <input id="password" type={this.state.ispassword
                          ? "text"
                          : "password"}/>
                      <div onClick={this.togglepasswordvisibility.bind(this)}>{
                          this.state.ispassword
                            ? <Eyeon/>
                            : <Eyeoff/>
                        }
                      </div>
                    </div>
                  </div>
                  {this.state.islogin?(
                    <button onClick={this.login.bind(this)}>Login</button>
                  ):(
                    <button onClick={this.signup.bind(this)}>Sign up</button>
                  )}
                  <div className="addlink">
                    <a onClick={this.toggleauthtype.bind(this)}>
                      {this.state.islogin?"Sign up ?":"Login ?"}
                    </a>
                  </div>
                </div>
              </div>)
          }
        </div>
      </div>
    </BrowserRouter>)
  }
}

export default App
