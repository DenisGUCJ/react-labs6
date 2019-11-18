import React from 'react'
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee'

class DataSet extends React.Component{

  constructor(props){
    super(props);
    this.state={
      employees:[],
      isLoading:true,
      addEvent:false
    }

    this.onClickAddButton=this.onClickAddButton.bind(this);
    this.onClickResetButton=this.onClickResetButton.bind(this);
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

  onClickAddButton(){
    this.setState((prevState)=>({
      addEvent:!prevState.addEvent
    }));
  }

  onClickResetButton=(event)=>{
    event.preventDefault();
  }

  onClickCancelButton=(event)=>{
    this.setState((prevState)=>({
      addEvent:!prevState.addEvent
    }));
  }

  onClickSubmitButton=(event)=>{
    this.setState((prevState)=>({
      addEvent:!prevState.addEvent
    }));
    event.preventDefault();
  }

  render(){
    if(this.state.isLoading){
      return <h1>Loading...</h1>
    }
    if(!this.state.addEvent){
      if(this.state.employees.length>0){
        return <div>
          <h1>The Employee list:</h1>
          <button onClick={this.onClickAddButton}>Add Employee</button>
          <EmployeeList employee={this.state.employees}></EmployeeList>
        </div> 
      }
      else{
        return <div>
          <h1>Date set is empty!</h1>
          <button onClick={this.onClickAddButton}>Add Employee</button>
        </div>
      }
    }
    else{
      return <AddEmployee reset={this.onClickResetButton} 
      submit={this.onClickSubmitButton}
      cancel={this.onClickCancelButton}></AddEmployee>
      
    }
  } 
}

export default DataSet