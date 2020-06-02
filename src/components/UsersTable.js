import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "@material-ui/core/Link";

export default class UsersTable extends Component{
    constructor(props) {
        super(props);
        this.state = {rows: this.props.rows}
    }
    render() {
        return (
            <div className="users-list">
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
            </div>
        )
    }
}