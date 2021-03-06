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
import {showError, showSuccess} from "../utilities/Alerts";
import Toolbar from "@material-ui/core/Toolbar";
import {Button} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const USERNAME_FORMAT = RegExp(
    /^[a-zA-Z0-9_-]{4,30}$/gs
)
const BIRTHDAY_FORMAT = RegExp(
    /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/gs
)
const EMAIL_FORMAT = RegExp(
    /\S+@\S+\.\S+/
)
const MIN_PASS_LENGTH = 6
const MAX_NAME_LENGTH = 50

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
            birthday: '',
            username: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
    }

    validateData() {
        let valid = true;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        const pass = this.state.password;
        const confirmPass = this.state.confirmPassword;
        const birthday = this.state.birthday;
        const username = this.state.username;
        let errors = {}

        if (firstName.length > MAX_NAME_LENGTH) {
            errors['firstName'] = 'Invalid first name';
            valid = false;
        }
        if (lastName.length > MAX_NAME_LENGTH) {
            errors['lastName'] = 'Invalid last name';
            valid = false;
        }
        if (!username || !username.match(USERNAME_FORMAT)) {
            errors['username'] = 'Invalid username';
            valid = false;
        }
        if (!birthday || !birthday.match(BIRTHDAY_FORMAT) || (Date.parse(birthday) > Date.now())) {
            errors['birthday'] = 'Invalid birthdate';
            valid = false;
        }
        if (!email || !email.match(EMAIL_FORMAT)) {
            errors['email'] = 'Invalid email';
            valid = false;
        }
        if (pass) {
            if (pass.length < MIN_PASS_LENGTH) {
                errors['password'] = 'Password must be at least 6 characters';
                valid = false;
            }
            if (pass !== confirmPass) {
                errors['password'] = 'Passwords must match';
                valid = false;
            }
        }
        this.setState({errors: errors});

        return valid
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
                            showSuccess('The user has been deleted').then()
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

        if (!this.validateData()) return

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
                showSuccess('The User has been created').then()
            })
            .catch(err => {
                console.log(err.response)
                if (err.response.data.internal_code === "auth_server_error") {
                    this.setState({open: false})
                    showError('A user with that username or email already exists').then()
                }
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
                                            error={!!this.state.errors.firstName}
                                            label={this.state.errors.firstName ? 'Error' : ''}
                                            helperText={this.state.errors.firstName ? this.state.errors.firstName : ''}
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
                                            error={!!this.state.errors.lastName}
                                            label={this.state.errors.lastName ? 'Error' : ''}
                                            helperText={this.state.errors.lastName ? this.state.errors.lastName : ''}
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
                                            error={!!this.state.errors.email}
                                            label={this.state.errors.email ? 'Error' : ''}
                                            helperText={this.state.errors.email ? this.state.errors.email : ''}
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
                                            error={!!this.state.errors.password}
                                            label={this.state.errors.password ? 'Error' : ''}
                                            helperText={this.state.errors.password ? this.state.errors.password : ''}
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
                                            error={!!this.state.errors.username}
                                            label={this.state.errors.username ? 'Error' : ''}
                                            helperText={this.state.errors.username ? this.state.errors.username : ''}
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
                                            error={!!this.state.errors.birthday}
                                            label={this.state.errors.birthday ? 'Error' : ''}
                                            helperText={this.state.errors.birthday ? this.state.errors.birthday : ''}
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