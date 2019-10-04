import React from 'react';
import axios from 'axios';
import Add from './add-list';
import Cards from './cards';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class List extends React.Component {
    constructor() {
        super()
        this.state = {
            showMe: false,
            showCards:false,
            contactList:[]
        }

    }
    

    componentDidMount () {
axios.get("/getcontact").then(res => this.setState({contactList:res.data})).catch(err=> console.log('err'))
    }

    updateContact = (value) => {
        this.setState({
            contact: value
        })
    }
    render(){
        return(
        <div>
    <h1>Contact App</h1>
    <Link to="/getcontact" >
        <button className="btn">Contact List</button>
    </Link>
    <Link to='/add-contact' >
    <button className="btn" >Add Contact</button>
    </Link>
    {/* <div>
    {
this.state.showMe?
<Add contactList={this.state.contactList} updateContact={(value)=>this.updateContact(value)}/>
:null
    }
    </div>
    <div className="add-list">
    {
this.state.showCards?
<Cards contactList={this.state.contactList}/>
:null
    }
    </div> */}
    <Route exact path="/getcontact" render={()=> <Cards contactList={this.state.contactList}/>}></Route>
    <Route exact path='/add-contact' render={()=> <Add contactList={this.state.contactList}/>} updateContact={(value)=>this.updateContact(value)}></Route>
</div >
    )};}

export default List;