import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "@material-ui/core/Link";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

export default class UsersTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            page: 0,
            rowsPerPage: 5
        }
    }

    handleChangePage = (event, newPage) =>{
        this.setState({page: newPage})
    }

    handleChangePerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
    }
    render() {
        const page = this.state.page
        const rowsPerPage = this.state.rowsPerPage
        return (
            <div className="format-table">
                <TableContainer>
                    <Typography component="h1" variant="h6" color="primary" gutterBottom>
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
                            {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                <TableRow key={row.user_name}>
                                    <TableCell>{row.first_name}</TableCell>
                                    <TableCell>{row.last_name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.birthdate}</TableCell>
                                    <TableCell align="right">{row.user_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
                        <Link color="primary">
                            See more users
                        </Link>
                    </div>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2, 10, 20]}
                    component="div"
                    count={this.state.rows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangePerPage}
                />
            </div>
        )
    }
}