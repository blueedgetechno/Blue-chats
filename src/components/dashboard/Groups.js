import React, { Component } from 'react'

class Groups extends Component {
  render(){
    var chats = []
    for (var i = 0; i < 2; i++) {
      chats.push({titlename: "Web development", quickpeek: "Refactoring PHP https://bit.ly/2F0WYdt #php #refactoring"})
    }
    return (
      <div className="container groupcontainer">
        <div className="column sidebar">
            <div className="chatheading">
              <span>Groups</span>
            </div>
            <div className="collection grouplist">
              {chats.map(chat=>{
                return (
                  <div key={Math.floor(Math.random()*100000)} className="collection-item avatar">
                    <img src="img/post/mac.jpg" alt="" className="circle"/>
                    <div className="info">
                      <span className="titlename">{chat.titlename}</span>
                      <span className="quickpeek">{chat.quickpeek.slice(0,35)+"..."}</span>
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
