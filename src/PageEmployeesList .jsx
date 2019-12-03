import React from 'react'
import EmployeeList from './EmployeeList';
import DeleteEmployee from './DeleteEmployee';

import {
  Link,
  withRouter
} from "react-router-dom";

class PageEmployeesList  extends React.Component{

  constructor(props){
    super(props);
    this.state={
      employees:[],
      isLoading:true,
      isDeleting:false,
      deleteEvent:false
    }

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


  onClickDeleteButton(){
    this.setState((prevState)=>({
      deleteEvent:!prevState.deleteEvent
    }));
  }

  onClickResetButton=(event)=>{
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
    if(this.state.isDeleting){
      return <h1>Deleting...</h1>
    }
    if(this.state.deleteEvent){
      return <DeleteEmployee cancel={this.onClickCancelButton}
      submit={this.onClickSubmitDeleteButton}></DeleteEmployee>
    }
    if(this.state.employees.length>0){
      return <div>
        <h1>The Employee list:</h1>
        <Link to="/new">
          <button style={{border:'2px solid', padding : '10px', margin : 10}} onClick={()=>this.props.history.push("/new")}>Create new employee</button>
        </Link>
        <button style={{border:'2px solid', padding : '10px', margin : 10}} onClick={this.onClickDeleteButton}>Delete Employee</button>
        <EmployeeList employee={this.state.employees} delete={this.onClickInnerDeleteButton}></EmployeeList>
      </div> 
    }
    else{
      return <div>
        <h1>Date set is empty!</h1>
      </div>
    }
  } 
}

export default withRouter(PageEmployeesList)


