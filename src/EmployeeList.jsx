import React from 'react'


const EmployeeList = (props) =>{
    
    const employeeList = props.employee.map(data => 
        <Employee key={data.id} data={data}></Employee>
        )
        return(
            <div>
                {employeeList}
            </div>
        )

}

const Employee = (props) =>{

    return(
        <div>
            <div style={{border: '1px solid', padding:'10px',margin:'10px',backgroundColor:'#FFFFCC',fontSize:20,fontWeight:'bold'}}>
                <p>Id: {props.data.id}</p>
                <p>IsActive: {props.data.isActive.toString()}</p>
                <p>Age: {props.data.age}</p>
                <p>Name: {props.data.name}</p>               
                <p>Company: {props.data.company}</p>                
                <p>Email: {props.data.email}</p>               
            </div>
        </div>        
    )
}
export default EmployeeList 