import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Cards (props) {
    console.log('hello',props.contactList)
    return (
        <div>
            <div>
                  {props.contactList.map((el, i) =>
                <div className='cards'>
                    <h3>Name:{el.name}</h3>
                    <h3>Telephone:{el.telephone}</h3>
                    <h3>Email:{el.mail}</h3>
                    <Link to='/modify_contact/:id'>
                    <button>Modify</button>
                    </Link>
                    <button>Delete</button>
                </div>
            )}
            </div>
            <Route exact path='/modify_contact/:id' render={(props)=> <Cards id={props.match.params.id} contactList={this.state.contactList}/>}></Route>
        </div>

    )
};

export default Cards;