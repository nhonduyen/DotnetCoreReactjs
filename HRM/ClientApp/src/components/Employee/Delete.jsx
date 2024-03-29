import axios from "axios";
import React, { Component } from "react";
import { variables } from './../../../src/Variables';

export class Delete extends Component {
    constructor(props) {
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation.bind(this);

        this.state = {
            name: '',
            designation: '',
            fathersName: '',
            mothersName: '',
            dateOfBirth: null
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(variables.API_URL + "api/Employees/Employee/" + id).then(employee => {
            const response = employee.data;
            this.setState({
                id: response.id,
                name: response.name,
                designation: response.designation,
                fathersName: response.fathersName,
                mothersName: response.mothersName,
                dateOfBirth: new Date(response.dateOfBirth).toISOString().slice(0, 10)
            })
        })
    }

    onCancel() {
        const { history } = this.props;
        history.push('/employees');
    }

    onConfirmation(e) {
        e.preventDefault();

        const { id } = this.props.match.params;
        const { history } = this.props;

        axios.delete(variables.API_URL + "api/Employees/DeleteEmployee/" + id).then(result => {
            history.push('/employees');
        })

    }


    render() {
        return (
            <div>
                <h2>Delete</h2>
                <h3>Are you sure you want to delete this?</h3>
                <div>
                    <h4>Employee</h4>
                    <dl className="row">
                        <dt className="col-sm-2">
                            Name:
                        </dt>
                        <dd className="col-sm-10">
                            {this.state.name}
                        </dd>
                        <dt className="col-sm-2">
                            Designation:
                        </dt>
                        <dd className="col-sm-10">
                            {this.state.designation}
                        </dd>
                        <dt className="col-sm-2">
                            Father's Name:
                        </dt>
                        <dd className="col-sm-10">
                            {this.state.fathersName}
                        </dd>
                        <dt className="col-sm-2">
                            Mother's Name:
                        </dt>
                        <dd className="col-sm-10">
                            {this.state.mothersName}
                        </dd>

                        <dt className="col-sm-2">
                            Date of Birth:
                        </dt>
                        <dd className="col-sm-10">
                            {this.state.dateOfBirth}
                        </dd>

                    </dl>

                    <form onSubmit={this.onConfirmation}>
                        <input type="hidden" asp-for="Id" />
                        <button type="submit" className="btn btn-danger">Delete</button> |
                        <button onClick={this.onCancel} className="btn btn-primary">Back to List</button>
                    </form>
                </div>
            </div>
        )
    }
}