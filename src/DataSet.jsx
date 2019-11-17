import React from 'react'
import EmployeeList from './EmployeeList';

class DataSet extends React.Component{

  constructor(props){
    super(props);
    this.state={
      employees:[],
      isLoading:true
    }
  }

  componentDidMount(){
    fetch('http://localhost:3004/employees')
    .then(responce=>responce.json())
    .then(data=>this.setState({
      employees:data
    }))
    .then(()=>this.setState((prevState)=>({
      isLoading:!prevState.isLoading
    })));
  }

  render(){
    if(this.state.isLoading){
      return <h1>Loading...</h1>
    }
    else if(this.state.employees.length>0){
      return <div>
        <h1>The Employee list:</h1>
        <EmployeeList employee={this.state.employees}></EmployeeList>
      </div> 
    }
    else{
      return <h1>Date set is empty!</h1>
    }
  } 
}

export default DataSet