import React from 'react';
import axios from 'axios';
import '../css/form.css'
class MyComponent extends React.Component {
    constructor ()
    {
      super();
      this.state={
        user:null
      }
    }
    componentDidMount()
    {
      axios.get('http://localhost:8000/')
      .then(res=>{
        this.setState({user:res})
      })
    }
  render(){
    return (
        <form>
           <input type="text" name="name" />
           <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MyComponent;
