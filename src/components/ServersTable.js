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
import {showError, showInfo, showSuccess} from "../utilities/Alerts";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Swal from "sweetalert2";
import IconButton from "@material-ui/core/IconButton";
import classes from "react-bootstrap/cjs/Popover";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {Button} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";

const SERVER_NAME_FORMAT = RegExp(
    /^[a-zA-Z0-9._-]{4,40}$/gs
)

export default class ServersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            showRegisterForm: false,
            serverName: '',
            serverNameError: ''
        }
    }

    handleClick = (open) => () => {
        this.setState({showRegisterForm: open})
    }

    formValChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value,
            serverNameError: ''
        })
    };

    handleValidation() {
        const serverName = this.state.serverName;

        if (serverName && !SERVER_NAME_FORMAT.test(serverName)) {
            this.setState({
                serverNameError: 'Server name should contains 4 to 30 ' +
                    'characters (letters and symbols) without space. ' +
                    'Example: chotuve_app_server'});

            return false
        }
        this.setState({serverNameError: ''});

        return true
    }

    deleteServer = (serverName) => {
        const options = {
            headers: {crossOrigin : true,
                withCredentials: false,
                authorization: localStorage.getItem('token')
            }
        }
        console.log(`delete ${serverName}`);

        Swal.fire({
            title: `Are you sure you want to delete ${serverName}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d63030',
            cancelButtonColor: '#7b7b7b',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (!result.value) return;

            authApi.delete(`/servers/${serverName}`, options)
                .then(() => (
                    showSuccess(`Delete ${serverName} success`)
                )).catch(() => (
                    showError(`Fail to delete ${serverName}`, 'Please, try again!')
                ));
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        if (!this.handleValidation()) return

        const options = {
            headers: {
                crossOrigin: true,
                withCredentials: false,
                authorization: localStorage.getItem('token')
            }
        }
        return authApi.post('/servers', {server: this.state.serverName}, options)
            .then(res => {
                this.setState({showRegisterForm: false})
                console.log('success app server registration')
                Swal.fire({
                    icon: 'success',
                    title: `Api Key`,
                    showConfirmButton: false,
                    html:
                        `${res.data.api_key} <br><br> <b> You need to set it as` +
                        `an env variable for your app server</b>`
                }).then(() => Promise.resolve())
            })
            .catch(err => {
                if (err.response.data.internal_code === "server_already_registered") {
                    this.setState({error: {serverName: 'A server with that name already exists'}})
                    return
                }
                console.log(err.response.data)
            })
    }

    render() {
        return (
            <div className="format-table">
                <TableContainer>
                    <Toolbar>
                        <Typography variant="h6" color="primary">
                            App Servers
                        </Typography>
                        <div style={{marginLeft: "auto"}}>
                            <Button
                                onClick={this.handleClick(true)}
                                variant="contained"
                                color="primary"
                                startIcon={<PublishIcon/>}
                            >
                                Add App Server
                            </Button>
                            <Dialog fullWidth open={this.state.showRegisterForm} onClose={this.handleClick(false)}>
                                <DialogTitle>
                                    <h3>Register App Server</h3>
                                </DialogTitle>
                                <DialogContent>
                                    <form id="addServerForm" onSubmit={this.handleSubmit}>
                                        <label>Server name</label><br/>
                                        <TextField
                                            fullWidth
                                            error={!!this.state.serverNameError}
                                            label={this.state.serverNameError? 'Error' : ''}
                                            helperText={this.state.serverNameError? this.state.serverNameError : ''}
                                            margin="dense"
                                            placeholder="Server name"
                                            name="serverName"
                                            onChange={this.formValChange}
                                            type="text"
                                            required
                                        /><br/>
                                        <span className="invalid-feedback">{this.state.serverNameError}</span>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClick(false)} color="primary">Cancel</Button>
                                    <Button type="submit" form="addServerForm" color="primary">Submit</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Toolbar>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Registration Date</TableCell>
                                <TableCell>Api Key</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.rows
                                .map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{dateToStr(row.created_at)}</TableCell>
                                        <TableCell >
                                            <IconButton aria-label="delete" className={classes.margin} onClick={() =>
                                                showInfo(`${row.name} Api Key`, `${row.api_key}`)}>
                                                <VisibilityOffIcon style={{color: 'rgba(108,36,191,0.97)'}}/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="delete" className={classes.margin} onClick={() => this.deleteServer(row.name)}>
                                                <DeleteOutlineIcon style={{color: 'rgba(191,36,36,0.97)'}}/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
