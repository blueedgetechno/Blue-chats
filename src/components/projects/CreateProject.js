import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/actions/projectActions'

class CreateProject extends Component{
  state = {
    title : '',
    content: ''
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    // console.log(this.state)
    this.props.createProject(this.state)
  }

  render(){
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create a new Project</h5><br/>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea id="content" cols="30" rows="30" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    createProject: (project)=> dispatch(createProject(project))
  }
}

export default connect(null, mapDispatchToProps)(CreateProject)
