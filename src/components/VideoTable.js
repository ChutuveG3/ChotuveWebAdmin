import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteIcon from '@material-ui/icons/Delete';
import {bytesToStr} from "../utilities/StrUtilities";
import classes from "react-bootstrap/cjs/Popover";
import LinkIcon from '@material-ui/icons/Link';
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

export default class VideoTable extends Component{
    constructor(props) {
        super(props);
        this.state = {rows: this.props.rows}
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
                                    <TableCell>{row.datetime}</TableCell>
                                    <TableCell>{bytesToStr(row.file_size)}</TableCell>
                                    <TableCell>
                                        < Link href={row.download_url}>
                                            <IconButton aria-label="video_link" className={classes.margin} color="primary">
                                                <LinkIcon/>
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" className={classes.margin}>
                                            <DeleteIcon />
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