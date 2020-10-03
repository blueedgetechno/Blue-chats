import React, {Component} from 'react'
import Send from './send'
import Media from './media'
import autosize from 'autosize'

import axios from 'axios';

const blueapi = process.env.REACT_APP_API

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chats: [],
      groupid: "5f78292c97f25506f8ddf677",
      doc: "",
      currentMessage: {
        text: "",
        media: {
          type: "img",
          link: "",
          name: ""
        }
      },
      popupmedia: 0,
      popuppdf: 0
    }
  }

  showpdf(ele) {
    if (this.state.popuppdf == 0) {
      this.setState({doc: ele.target.getAttribute('link'), popuppdf: 1})
    } else {
      this.setState({popuppdf: 0})
    }
  }

  sendmessage() {
    console.log("sendmessage");
    // console.log(this.state.currentMessage);
    var chats = this.state.chats
    var chat = {
      "by": "self",
      "user": "Ninja",
      "img": "img/post/iron.jpg",
      "messages": []
    }

    if (this.state.currentMessage.text.trim().length != 0) {
      chat.messages.push({"type": "text", "message": this.state.currentMessage.text.trim()})
    }

    if (this.state.currentMessage.media.link.trim().length) {
      var instance = {
        "type": this.state.currentMessage.media.type,
        "src": this.state.currentMessage.media.link
      }
      if (this.state.currentMessage.media.type == "pdf") {
        if (!instance.src.includes('preview')) {
          instance.src = instance.src.replace('view?usp=sharing', 'preview')
        }
        instance.name = this.state.currentMessage.media.name.trim().length
          ? this.state.currentMessage.media.name
          : "File"
        instance.size = "100"
        instance.sizeunits = "kb"
      }
      // console.log("If you are raeding this",instance);
      chat.messages.push(instance)
    }

    document.getElementById('signcircle').classList.add('off')

    if (chat.messages.length) {
      console.log("we are in");
      chats.push(chat)
      this.setState({
        chats: chats,
        currentMessage: {
          text: "",
          media: {
            type: "img",
            link: "",
            name: ""
          }
        }
      }, () => {
        // console.log(this.state.);
        document.querySelector('#typemessage').value = ""
        setTimeout(() => {
          var chatscreen = document.querySelector('#chats')
          chatscreen.scrollTo({top: document.body.scrollHeight})
        }, 100)
      })
    }
  }

  updatemessage() {
    var message = this.state.currentMessage
    message.text = document.querySelector('#typemessage').value
    this.setState({
      currentMessage: message
    }, this.sendmessage)
  }

  addmedia() {
    console.log("addmedia");
    if (this.state.currentMessage.media.link.trim().length) {
      document.getElementById('signcircle').classList.remove('off')
    }
    this.changemediatype()
    this.togglemedia()
  }

  togglemedia() {
    this.setState({
      popupmedia: this.state.popupmedia ^ 1
    })
  }

  changemediatype() {
    console.log("changemediatype");
    var currentMessage = this.state.currentMessage
    currentMessage.media.type = document.getElementById('mediatype').value
    currentMessage.media.name = document.getElementById('medianame').value
    currentMessage.media.link = document.getElementById('medialink').value
    this.setState({currentMessage: currentMessage})
  }

  loadchats(){
    axios.get(
        `${blueapi}/groups/${this.state.groupid}`
      )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // this.setState({brands: res.data.result})
      })
      .catch(err => {
        console.log("Error");
        console.log(err);
      });
  }

  componentDidMount() {
    setTimeout(() => {
      var chatscreen = document.querySelector('#chats')
      chatscreen.scrollTo({top: document.body.scrollHeight})
    }, 100)
    var ta = document.querySelector('#typemessage');
    ta.addEventListener('focus', function() {
      autosize(ta);
    });
  }

  render() {
    return (<div className="dashboard container">
      <div className={this.state.popuppdf
          ? "messagepdf showpdf"
          : "messagepdf"} onClick={this.showpdf.bind(this)} id="messagepdf">
        <iframe src={this.state.doc.endsWith('.pdf')
            ? "https://docs.google.com/viewerng/viewer?url=" + this.state.doc + "&embedded=true"
            : this.state.doc} frameBorder="0" height="100%" width="100%"></iframe>
      </div>
      <div className={this.state.popupmedia
          ? "mediapopup showpdf"
          : "mediapopup"}>
        <div className="mediapopupoverlay" onClick={this.togglemedia.bind(this)}></div>
        <div className="mediacontainer">
          <div className="optiongiven">
            <span>File type</span>
            <select onChange={this.changemediatype.bind(this)} defaultValue="img" name="type" id="mediatype" className="dropdownselect">
              <option value="img">Image</option>
              <option value="vid">Video</option>
              <option value="pdf">Document</option>
            </select>
          </div>

          <div className={this.state.currentMessage.media.type == "pdf"
              ? "optiongiven"
              : "optiongiven hidethis"}>
            <span>File name</span>
            <input onChange={this.changemediatype.bind(this)} id="medianame" type="text"/>
          </div>
          <div className="optiongiven">
            <span>Link</span>
            <input onChange={this.changemediatype.bind(this)} id="medialink" type="text"/>
          </div>
          <button onClick={this.addmedia.bind(this)}>Add</button>
        </div>
      </div>
      <div className="screen">
        <div className="groupinfo">
          <img src="img/prof.jpg" alt="" className="circle"/>
          <div className="info">
            <span className="titlename">Web development</span>
            <span className="members">33 memebers</span>
          </div>
        </div>

        <div className="chatscreen">
          <div className="chats" id="chats">
            {
              this.state.chats.map(chat => {
                return (<div key={Math.random() * 1000000000000} className={"chat " + chat.by}>
                  {
                    chat.by == "someone"
                      ? <img className="senderimage" src={chat.img} alt=""/>
                      : null
                  }
                  <div className="chatbody">
                    {
                      chat.by == "someone"
                        ? <span className="chatuser">{chat.user}</span>
                        : null
                    }
                    <span className="message">
                      {
                        chat.messages.map(message => {
                          switch (message.type) {
                            case 'text':
                              return <span key={Math.random() * 1000000000000}>{message.message}</span>
                            case 'pdf':
                              return (<div key={Math.random() * 1000000000000} className="msgpdf" onClick={this.showpdf.bind(this)} link={message.src}>
                                <img link={message.src} src="https://img.icons8.com/windows/64/000000/happy-document.png"/>
                                <div className="pdfdetails" link={message.src}>
                                  <div className="pdfname" link={message.src}>{message.name}</div>
                                  <div className="pdfsize" link={message.src}>{message.size}{message.sizeunits}</div>
                                </div>
                              </div>)
                            case 'img':
                              return <img key={Math.random() * 1000000000000} className="messageimg" src={message.src} alt=""/>
                            case 'url':
                              return <a key={Math.random() * 1000000000000} href={message.href} target="_blank">{message.href}</a>
                            case 'vid':
                              return <video key={Math.random() * 1000000000000} src={message.src} controls="controls" autoPlay={false}/>
                            case 'aud':
                              return <div key={Math.random() * 1000000000000}><br/><audio key={Math.random() * 1000000000000} src={message.src} controls="controls" autoPlay={false}/></div>
                            default:
                              return null
                          }
                        })
                      }
                    </span>
                  </div>
                </div>)
              })
            }
          </div>
        </div>

        <div className="chantinput">
          <div className="userchat">
            <textarea id="typemessage" placeholder="type a message" rows="1"></textarea>
            <div className="sendmediabuttoncontainer" onClick={this.togglemedia.bind(this)}>
              <div className="signcircle off" id="signcircle"></div>
              <Media/>
            </div>
            <div onClick={this.updatemessage.bind(this)}>
              <Send/>
            </div>
          </div>
        </div>

      </div>
    </div>)
  }
}

export default Dashboard
