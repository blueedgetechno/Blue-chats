import React, { Component } from 'react'
import {Logout} from './icons'

import axios from 'axios';

const blueapi = process.env.REACT_APP_API

class Groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentgroupid : "",
      groups : []
    }
  }

  changethecurrentgroup(ele){
    if(ele){
      // console.log(ele.target.getAttribute('groupid'));
      this.setState({currentgroupid: ele.target.getAttribute('groupid')},()=>{
        // console.log(this.state);
      })
      this.props.changecurrentgroup(ele.target.getAttribute('groupid'))
    }
  }

  loadgroups(){
    axios.get(
        `${blueapi}/groups/`
      )
      .then(res => {
        // console.log(res.data);
        this.setState({groups : res.data.result})
        // this.setState({brands: res.data.result})
      })
      .catch(err => {
        console.log("Error");
        console.log(err);
      });
  }

  componentDidMount(){
    this.loadgroups()
  }

  render(){
    return (
      <div className="container groupcontainer">
        <div className="column sidebar">
            <div className="chatheading">
              <span>Groups</span>
              <div onClick={this.props.logout}><Logout/></div>
            </div>
            <div className="collection grouplist">
              {this.state.groups.map((group,i)=>{
                return (
                  <div key={i}
                    className={this.state.currentgroupid==group._id ? "collection-item avatar selectedgroup":"collection-item avatar"}
                    groupid={group._id}
                    onClick={this.changethecurrentgroup.bind(this)}
                    >
                    <img groupid={group._id} src={group.groupimage} alt="" className="circle"/>
                    <div groupid={group._id} className="info">
                      <span groupid={group._id} className="titlename">{group.name}</span>
                      <span groupid={group._id} className="quickpeek">{group.about.slice(0,52)+"..."}</span>
                    </div>
                  </div>
                )
              })}
            </div>
        </div>
      </div>
    )
  }
}

export default Groups
