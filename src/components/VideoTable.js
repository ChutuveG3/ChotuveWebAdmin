import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {bytesToStr, dateToStr} from "../utilities/StrUtilities";
import classes from "react-bootstrap/cjs/Popover";
import LinkIcon from '@material-ui/icons/Link';
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Swal from "sweetalert2";
import {appApi, mediaApi} from "../api/axios";

export default class VideoTable extends Component{
    constructor(props) {
        super(props);
        this.state = {rows: this.props.rows}
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
                    if (res.status === 200) {
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
                    }
                }).catch(err => console.log(err));
        })
    }

    render() {
        return (
            <div className="format-table" >
                <React.Fragment>
                    <Typography component="h1" variant="h6" color="primary" gutterBottom>
                        Videos
                    </Typography>
                    <Table size="small">
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
                            {this.state.rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.file_name}</TableCell>
                                    <TableCell>{dateToStr(row.datetime)}</TableCell>
                                    <TableCell>{bytesToStr(row.file_size)}</TableCell>
                                    <TableCell>
                                        < Link href={row.download_url}>
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
                    <div>
                        <Link color="primary">
                            See more videos
                        </Link>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}