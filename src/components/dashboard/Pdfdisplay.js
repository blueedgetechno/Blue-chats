import React, { Component } from 'react'

class Pdfdisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      doc : props.doc,
      showpdf: props.showpdf
    }
  }

  render(){
    return (
        <div id="messagepdf" onClick={this.state.showpdf} className="messagepdf">
          <iframe src={this.state.doc}></iframe>
        </div>
    )
  }
}

export default Pdfdisplay
