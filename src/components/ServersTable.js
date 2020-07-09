import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {authApi} from "../api/axios";
import {dateToStr} from "../utilities/StrUtils";
import {showSuccess} from "../utilities/Alerts";


export default class ServersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {rows: this.props.rows}
    }

    render() {
        return (
            <div className="format-table">
                <TableContainer>
                    <Typography component="h1" variant="h6" color="primary" gutterBottom>
                        App Servers
                    </Typography>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Registration date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.rows
                                .map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{dateToStr(row.datetime)}</TableCell>
                                        <TableCell >{row.status}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}