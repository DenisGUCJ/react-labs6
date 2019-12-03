import React from 'react'

import {
    Link,
    withRouter
  } from "react-router-dom";

class PageEmployee extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            addEvent: false,
            isSaving: false
        }

        this.onClickSubmit=this.onClickSubmit.bind(this);
        this.onClickAdd=this.onClickAdd.bind(this);
        this.onClickCancel=this.onClickCancel.bind(this);
    }

    onClickAdd=()=>{
        this.setState(()=>({
            addEvent: true
          }));
    }

    onClickCancel=()=>{
        this.setState(()=>({
            addEvent: false
          }));
    }

    onClickSubmit=(event)=>{
        this.setState(()=>({
          isSaving:true
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
            .then(() => this.setState(()=>({isSaving:false, addEvent:false})))
            .then(() => this.props.history.push("/"));
              
    
        event.preventDefault();
    }

    render(){
        return <div>{this.state.addEvent ? <div>
            {this.state.isSaving ? 
                <h1>Saving...</h1>
                :
            <form style={{border:'1px solid', padding : '10px',
            width: 400,backgroundColor:"#ffe6e6", margin : 10}} onSubmit={this.onClickSubmit}>
                <h2>Full fill the form and press "Submit" button to add a new employee to the data set</h2>
                <p> IsActive:<br/>
                    <input name="isActive"/>
                </p>
                <p> Age:<br/>
                    <input name="age" type="number" min="0"/>
                </p>
                <p> Name:<br/>
                    <input name="name"/>
                </p>
                <p> Company:<br/>
                    <input name="company"/>
                </p>
                <p> Email:<br/>
                    <input name="email"/>
                </p>
                <p><input style={{width:100}} type="submit"/></p>
                <p><input style={{width:100}} type="reset"/></p>
                <button style={{width:100}} onClick={this.onClickCancel}>Cancel</button>
            </form>}
            </div>
            :
            <div>
                <button style={{border:'2px solid', padding : '10px', margin : 10}} onClick={this.onClickAdd}>Add Employee</button>
            </div>}  
        <div>
            <Link to="/">
                <button style={{border:'2px solid', padding : '10px', margin : 10}} onClick={()=>this.props.history.push("/")}>Back to List</button>
            </Link>   
        </div>
    </div>
    }
}


export default withRouter(PageEmployee)
