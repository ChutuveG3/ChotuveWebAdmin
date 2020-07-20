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
import {appApi, authApi, mediaApi} from "../api/axios";
import {showSuccess} from "../utilities/Alerts";
import Toolbar from "@material-ui/core/Toolbar";
import {Button} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

export default class UsersTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            page: 0,
            rowsPerPage: 5,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            birthday: '',
            username: '',
            confirmPassword: ''
        }
    }

    handleChangePage = (event, newPage) =>{
        this.setState({page: newPage})
    }

    handleChangePerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
    }

    handleClick = (open) => () => {
        this.setState({open: open})
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

    formValChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value,
        })
    };


    handleSubmit = e => {
        e.preventDefault()
        const options = {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }
        const userData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            user_name: this.state.username,
            birthdate: this.state.birthday
        }

        console.log("Create user")
        return appApi.post('/users', userData, options)
            .then(() => {
                console.log("User created success")
                this.setState({open: false})
                showSuccess('The User has been created')
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    render() {
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword
        const birthday = this.state.birthday
        const email = this.state.email
        const username = this.state.username
        const page = this.state.page
        const rowsPerPage = this.state.rowsPerPage

        return (
            <div className="format-table">
                <TableContainer style={{maxHeight: "300px"}}>
                    <Toolbar>
                        <Typography variant="h6" color="primary">
                            Users
                        </Typography>
                        <div style={{marginLeft: "auto"}}>
                            <Button
                                onClick={this.handleClick(true)}
                                variant="contained"
                                color="primary"
                                startIcon={<PublishIcon/>}
                            >
                                Add User
                            </Button>
                            <Dialog fullWidth open={this.state.open} onClose={this.handleClick(false)}>
                                <DialogTitle>
                                    <h3>Add User</h3>
                                </DialogTitle>
                                <DialogContent>
                                    <form id="addUserForm" onSubmit={this.handleSubmit}>
                                        <label>First Name</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="First name"
                                            name="firstName"
                                            value={firstName}
                                            onChange={this.formValChange}
                                            type="text"
                                            required
                                        /><br/>
                                        <label>Last Name</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="Last name"
                                            name="lastName"
                                            value={lastName}
                                            onChange={this.formValChange}
                                            type="text"
                                            required
                                        /><br/>
                                        <label>Email</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="Email"
                                            name="email"
                                            value={email}
                                            onChange={this.formValChange}
                                            type="email"
                                            required
                                        /><br/>
                                        <label>Password</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={this.formValChange}
                                            type="password"
                                            required
                                        /><br/>
                                        <label>Confirm password</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="Confirm password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={this.formValChange}
                                            type="password"
                                            required
                                        /><br/>
                                        <label>Username</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="Username"
                                            name="username"
                                            value={username}
                                            onChange={this.formValChange}
                                            type="text"
                                            required
                                        /><br/>
                                        <label>Birthday</label><br/>
                                        <TextField
                                            fullWidth
                                            placeholder="Birthday"
                                            name="birthday"
                                            value={birthday}
                                            onChange={this.formValChange}
                                            id="date"
                                            type="date"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                        />
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClick(false)} color="primary">Cancel</Button>
                                    <Button type="submit" form="addUserForm" color="primary">Submit</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Toolbar>
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