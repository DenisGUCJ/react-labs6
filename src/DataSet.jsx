import React from 'react'
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee'
import DeleteEmployee from './DeleteEmployee';

class DataSet extends React.Component{

  constructor(props){
    super(props);
    this.state={
      employees:[],
      isLoading:true,
      isSaving:false,
      isDeleting:false,
      addEvent:false,
      deleteEvent:false
    }

    this.onClickAddButton=this.onClickAddButton.bind(this);
    this.onClickResetButton=this.onClickResetButton.bind(this);
    this.onClickDeleteButton=this.onClickDeleteButton.bind(this); 
  }

  componentDidMount(){
    fetch('http://localhost:3004/employees')
    .then(responce=>responce.json())
    .then(data=>this.setState({
      employees:data
    }))
    .then(()=>this.setState(({
      isLoading:false
    })));
  }

  onClickAddButton(){
    this.setState((prevState)=>({
      addEvent:!prevState.addEvent
    }));
  }

  onClickDeleteButton(){
    this.setState((prevState)=>({
      deleteEvent:!prevState.deleteEvent
    }));
  }

  onClickResetButton=(event)=>{
    event.preventDefault();
  }

  onClickCancelButton=()=>{
    this.setState({
      addEvent:false,
      deleteEvent:false
    });
  }

  onClickSubmitButton=(event)=>{
    this.setState((prevState)=>({
      addEvent:!prevState.addEvent,
      isSaving:!prevState.isSaving
    }));

    const data = new FormData(event.target);
    fetch('http://localhost:3004/employees', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isActive: data.get("isActive")=="true" ? true : false,
            age: Number(data.get("age")),
            name: data.get("name"),
            company: data.get("company"),
            email: data.get("email")
          })
        })
          .then(response => response.json())
          .then(() => this.setState((prevState)=>({isSaving:!prevState.isSaving})))
          .then(() => this.componentDidMount());
          

    event.preventDefault();
  }

  onClickSubmitDeleteButton=(event)=>{
    this.setState((prevState)=>({
      deleteEvent:!prevState.deleteEvent,
      isDeleting:!prevState.isSaving
    }));

    const data = new FormData(event.target);
    fetch('http://localhost:3004/employees/'+data.get("id"), {
        method: 'DELETE',})
        .then(response => response.json())
        .then(()=>this.setState((prevState)=>({isDeleting:!prevState.isDeleting})))
        .then(()=>this.componentDidMount());
    
    event.preventDefault();
  }

  render(){
    if(this.state.isLoading){
      return <h1>Loading...</h1>
    }
    if(this.state.isSaving){
      return <h1>Saving...</h1>
    }
    if(this.state.isDeleting){
      return <h1>Deleting...</h1>
    }
    if(this.state.addEvent){
      return <AddEmployee reset={this.onClickResetButton} 
      submit={this.onClickSubmitButton}
      cancel={this.onClickCancelButton}></AddEmployee>
    }
    if(this.state.deleteEvent){
      return <DeleteEmployee cancel={this.onClickCancelButton}
      submit={this.onClickSubmitDeleteButton}></DeleteEmployee>
    }
    if(this.state.employees.length>0){
      return <div>
        <h1>The Employee list:</h1>
        <button onClick={this.onClickAddButton}>Add Employee</button>
        <button onClick={this.onClickDeleteButton}>Delete Employee</button>
        <EmployeeList employee={this.state.employees} delete={this.onClickInnerDeleteButton}></EmployeeList>
      </div> 
    }
    else{
      return <div>
        <h1>Date set is empty!</h1>
        <button onClick={this.onClickAddButton}>Add Employee</button>
      </div>
    }
  } 
}

export default DataSet


