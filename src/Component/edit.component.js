// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">
                    {this.state.id ? 'Update Person Info' : 'Add New Person'}
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Person Name:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.company}
                               onChange={this.onChangeCompany}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.age}
                               onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Update Person Info"
                               className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany  = this.onChangeCompany.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: !this.isEmpty(this.props.match.params) ? this.props.match.params.id : null,
            name: '',
            company: '',
            age:''
        };
    }

    componentDidMount() {
        if (this.state.id) {
            axios.get('http://localhost:4000/persons/edit/' + this.state.id)
                .then(response => {
                    this.setState({
                        name: response.data.name,
                        company: response.data.company,
                        age: response.data.age
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            this.setState({
                id: null,
                name: '',
                company: '',
                age: ''
            })
        }
    }

    isEmpty(obj) {
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }
    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            company: this.state.company,
            age: this.state.age
        };

        if (this.state.id) {
            await axios.post('http://localhost:4000/persons/update/' + this.state.id, obj)
                .then(res => console.log(res.data));
        } else {
            await axios.post('http://localhost:4000/persons/add', obj)
                .then(res => console.log(res.data));
        }
        this.props.history.push('/index');
    }
}