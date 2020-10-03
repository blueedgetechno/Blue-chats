import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Groups from './components/dashboard/Groups'
import './css/App.css';
import './css/Popup.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentgroupid : ""
    }
  }

  changecurrentgroup(){

  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <div className="display">
            <Groups
              changecurrentgroup = {this.changecurrentgroup}
            />
            <Dashboard
              currentgroupid = {this.state.currentgroupid}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
