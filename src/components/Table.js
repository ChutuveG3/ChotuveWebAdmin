import React, {Component} from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {getSetting} from "../settings";


export default class UsersTable extends Component{
    constructor(props) {
        super(props);
        this.state = {rows: [], isLoading: true}
    }

    componentDidMount = async () => {
        const url = "https://www.mocky.io/v2/5ed460073300005f00f7a146/users"
        /*const url = getSetting('AUTH_BASE_URL') + '/users'*/
        await axios.get(url)
            .then(res => {
                this.setState({rows: res.data, isLoading: false})
            })
    }

    render() {
        const loading = this.state.isLoading
        {
            if (loading) {
                return <h3>Loading...</h3>
            }
            return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Users
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell align="right">Username</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.date_of_birth}</TableCell>
                                <TableCell align="right">{row.username}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div>
                    <Link color="primary">
                        See more users
                    </Link>
                </div>
            </React.Fragment>
        )}
    }
}