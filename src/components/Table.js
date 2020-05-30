import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";

// Generate Order Data
function createData(id, username, firstName, lastName, email, birthdate) {
  return { id, username, firstName, lastName, email, birthdate };
}

const rows = [
    createData(0,'eaeapepe', 'Carlitos', 'Balá', 'carlitos@bala,com', '28/4/1920'),
    createData(1,'laChiqui', 'Mirtha', 'Legrand', 'mirtha@legrand,com', '4/8/815'),
    createData(0,'eaeapepe', 'Carlitos', 'Balá', 'carlitos@bala,com', '28/4/1920'),
    createData(1,'laChiqui', 'Mirtha', 'Legrand', 'mirtha@legrand,com', '4/8/815'),
    createData(0,'eaeapepe', 'Carlitos', 'Balá', 'carlitos@bala,com', '28/4/1920'),
    createData(1,'laChiqui', 'Mirtha', 'Legrand', 'mirtha@legrand,com', '4/8/815'),
    createData(0,'eaeapepe', 'Carlitos', 'Balá', 'carlitos@bala,com', '28/4/1920'),
    createData(1,'laChiqui', 'Mirtha', 'Legrand', 'mirtha@legrand,com', '4/8/815'),
    createData(0,'eaeapepe', 'Carlitos', 'Balá', 'carlitos@bala,com', '28/4/1920'),
    createData(1,'laChiqui', 'Mirtha', 'Legrand', 'mirtha@legrand,com', '4/8/815'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Users() {
  const classes = useStyles();
  return (
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.birthdate}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}