import React from 'react'

class DeleteEmployee extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div>
        <form style={{border:'1px solid', padding : '10px',
        width: 400,backgroundColor:"#ccffff"}} onSubmit={this.props.submit}>
            <h2>Enter the Id into the field to delete a corresponding employee</h2>
            <p> Id:<br/>
                <input name="id"/>
            </p>
            <p><input style={{width:100}} type="submit"/></p>
            <p><input style={{width:100}} type="reset"/></p>
            <p><button style={{width:100, textAlign:'center'}} onClick={this.props.cancel}>Cancel</button></p>
        </form>
    </div>
    }
}


export default DeleteEmployee