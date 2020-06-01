import React, {Component} from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import axios from "axios";

// Generate Order Data
function createData(id, username, firstName, lastName, email, birthdate) {
  return { id, username, firstName, lastName, email, birthdate };
}



export default class UsersTable extends Component{
    constructor(props) {
        super(props);
        this.state = {rows: [], isLoading: true}
    }

    async componentDidMount() {
        try {
            const resp = await axios.get("https://www.mocky.io/v2/5ed460073300005f00f7a146")
            const usersList = resp.json()
            const users = []
            for (let i = 0; i < usersList.size; i++) {
                users.concat(createData(i, resp.data.username, resp.data.first_name, resp.data.last_name,
                    resp.data.email, resp.data.birthdate))
            }
            this.setState({rows: users, isLoading: false})
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const {users, loading} = this.state
        {if (!loading){
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
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.birthdate}</TableCell>
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
        )
        }
        else {
            return <h3>Loading...</h3>
        }}

    }
}