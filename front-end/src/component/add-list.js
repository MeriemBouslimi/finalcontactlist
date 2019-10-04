import React from 'react';
import Cards from './cards'
import Axios from 'axios';

class Add extends React.Component {
    constructor() {
        super()
        this.state = {
            HideMe: false,
            name: "",
            telephone: "",
            email: "",
        }

    }
    Hide() {
        this.setState({
            hideMe: !this.state.hideMe
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
  
    onAddContactPressed = () => {
        Axios.post('/add-contact', {
            name: this.state.name,
            telephone: this.state.telephone,
            email: this.state.email
        })
            .then(res => Axios.get("/getcontact").then(res=>this.props.updateContact(res.data)))
            .catch(err => alert(err));
            this.reset()
    }

    render() {
        return (
            <div className="add-list">
                <h1>Add Contact List</h1>
                <h4>Contact Name</h4>
                <input className="txt-input" type="texte" placeholder="Contact Name" name="name" onChange={this.onChange}></input>
                <h4>Contact Téléphone</h4>
                <input className="txt-input" type="texte" placeholder="Contact Téléphone" name="telephone" onChange={this.onChange}></input>
                <h4>Contact Email</h4>
                <input className="txt-input" type="texte" placeholder="Contact Email" name="email" onChange={this.onChange}></input>
                <button onClick={() =>{ this.Hide();this.onAddContactPressed()}} className="btn-add">Add Contact</button>
                <div>
                    {
                        this.state.hideMe ?
                            <Cards contactList={this.props.contactList} />
                            : null
                    }
                </div>
            </div>
        )
    };
}
export default Add;