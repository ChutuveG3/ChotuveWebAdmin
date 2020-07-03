import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {bytesToStr, dateNowToStr, dateToStr} from "../utilities/StrUtils";
import classes from "react-bootstrap/cjs/Popover";
import LinkIcon from '@material-ui/icons/Link';
import PublishIcon from '@material-ui/icons/Publish'
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Swal from "sweetalert2";
import {appApi, mediaApi} from "../api/axios";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Toolbar from "@material-ui/core/Toolbar";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

export default class VideoTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            page: 0,
            rowsPerPage: 3,
            open: false,
            videoURL: '',
            fileName: '',
            fileSize: '',
        }
    }

    async deleteVideo(video_id) {
        const headers = {headers: {authorization: localStorage.getItem("token")}};
        const url = `/videos/${video_id}`;
        console.log(`delete video ${video_id}`);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d63030',
            cancelButtonColor: '#7b7b7b',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (!result.value) return;

            console.log(`delete video ${video_id} on app server`);
            appApi.delete(url, headers)
                .then(res => {
                    console.log(`delete video ${video_id} on media server`);
                    mediaApi.delete(url, headers)
                        .then( () => {
                            console.log('delete success')
                            Swal.fire({
                                icon: 'success',
                                title: 'The video has been deleted',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }).catch(err => console.log(err));
                }).catch(err => {
                if ((err.status === 409)) {
                    console.log(`delete video ${video_id} on media server`);
                    mediaApi.delete(url, headers)
                        .then(() => {
                            console.log('delete success')
                            Swal.fire({
                                icon: 'success',
                                title: 'The video has been deleted',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }).catch(err => console.log(err));
                }
                else console.log(err)
                });
        })
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

    handleSubmit = e => {
        e.preventDefault()
        const headers = {headers: {authorization: localStorage.getItem("token")}};
        return mediaApi.post('/videos',
            {
                download_url: this.state.videoURL,
                datetime: dateNowToStr(),
                file_name: this.state.fileName,
                file_size: this.state.fileSize
            }, headers)
            .then(res => {
                if (res.status === 201) {
                    console.log("Upload video success")
                    this.setState({open: false})
                    Swal.fire({
                        icon: 'success',
                        title: 'The video has been uploaded',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => Promise.resolve())
                }
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    formValChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    render() {
        const page = this.state.page
        const open = this.state.open
        const rowsPerPage = this.state.rowsPerPage
        const fileName = this.state.fileName
        const videoURL = this.state.videoURL
        const fileSize = this.state.fileSize
        return (
            <div className="format-table" >
                <TableContainer style={{maxHeight: "300px"}}>
                    <Toolbar>
                        <Typography variant="h6" color="primary">
                            Videos
                        </Typography>
                        <div style={{marginLeft: "auto"}}>
                            <Button
                                onClick={this.handleClick(true)}
                                variant="contained"
                                color="primary"
                                startIcon={<PublishIcon/>}
                            >
                                Add Video
                            </Button>
                            <Dialog fullWidth open={open} onClose={this.handleClick(false)}>
                                <DialogTitle>
                                    <h3>Add Video</h3>
                                </DialogTitle>
                                <DialogContent>
                                    <form id="addVideoForm" onSubmit={this.handleSubmit}>
                                        <label>URL</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="Video URL"
                                            type="url"
                                            name="videoURL"
                                            onChange={this.formValChange}
                                            value={videoURL}
                                            required
                                        /><br/>
                                        <label>File Name</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="File name"
                                            name="fileName"
                                            value={fileName}
                                            onChange={this.formValChange}
                                            type="text"
                                            required
                                        /><br/>
                                        <label>File Size</label><br/>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            placeholder="File size"
                                            name="fileSize"
                                            value={fileSize}
                                            onChange={this.formValChange}
                                            type="text"
                                            required
                                        />
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClick(false)} color="primary">Cancel</Button>
                                    <Button type="submit" form="addVideoForm" color="primary">Submit</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Toolbar>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>File Name</TableCell>
                                <TableCell>Upload Date</TableCell>
                                <TableCell>File size</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.file_name}</TableCell>
                                    <TableCell>{dateToStr(row.datetime)}</TableCell>
                                    <TableCell>{bytesToStr(row.file_size)}</TableCell>
                                    <TableCell>
                                        < Link href={row.download_url} target="_blank" >
                                            <IconButton aria-label="video_link" className={classes.margin} color="primary">
                                                <LinkIcon/>
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" className={classes.margin} onClick={() => this.deleteVideo(row.id)}>
                                            <DeleteOutlineIcon style={{color: 'rgba(191,36,36,0.97)'}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 10, 20]}
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