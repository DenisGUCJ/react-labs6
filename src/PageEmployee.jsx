import React from 'react'

class PageEmployee extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div>
        <form style={{border:'1px solid', padding : '10px',
        width: 400,backgroundColor:"#ffe6e6"}} onSubmit={this.props.submit}>
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
            <p><button onClick={this.props.cancel} style={{width:100, textAlign:'center'}}>Cancel</button></p>
        </form>
    </div>
    }
}


export default PageEmployee