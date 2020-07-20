import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import classes from "react-bootstrap/cjs/Popover";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Swal from "sweetalert2";
import {appApi, authApi} from "../api/axios";
import {showSuccess} from "../utilities/Alerts";

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

    deleteUser = (username) => {
        const options = {
            headers: {
                authorization: localStorage.getItem("token")
            }
        };

        const url = `/users/${username}`;
        console.log(`delete user: ${username}`);

        Swal.fire({
            title: `Are you sure you want to delete ${username}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d63030',
            cancelButtonColor: '#7b7b7b',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (!result.value) return;

            console.log(`delete user ${username} on app server`);
            appApi.delete(url, options)
                .then(() => {
                    console.log(`delete user ${username} on auth server`);
                    authApi.delete(url, options)
                        .then( () => {
                            console.log('User delete success')
                            showSuccess('The user has been deleted')
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err))
            });
        }

    render() {
        const page = this.state.page
        const rowsPerPage = this.state.rowsPerPage
        return (
            <div className="format-table">
                <TableContainer style={{maxHeight: "300px"}}>
                    <Typography component="h1" variant="h6" color="primary" gutterBottom>
                        Users
                    </Typography>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Delete</TableCell>
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
                                    <TableCell>{row.user_name}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" className={classes.margin} onClick={() => this.deleteUser(row.user_name)}>
                                            <DeleteOutlineIcon style={{color: 'rgba(191,36,36,0.97)'}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
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