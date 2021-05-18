import React from "react";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../src/actions/message";
import Row from "./TableRow";

enum PaymentStatuses {
  CANCELED = "CANCELED",
  REFFUNDED = "REFFUNDED",
  SUCCEEDED = "SUCCEEDED",
  INCOMPLETE = "INCOMPLETE",
}

interface Data {
  id: number;
  service: string;
  employee: string;
  date: string;
  time: number;
  payment_status: PaymentStatuses;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data | string;
  label: string;
  numeric: boolean;
  needSort: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "service",
    numeric: false,
    disablePadding: false,
    label: "Usługa",
    needSort: true,
  },
  {
    id: "employee",
    numeric: true,
    disablePadding: false,
    label: "Specjalista",
    needSort: true,
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Data",
    needSort: true,
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Czas trwania",
    needSort: true,
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Odwołaj",
    needSort: false,
  },
  {
    id: "payment_status",
    numeric: true,
    disablePadding: false,
    label: "Status płatności",
    needSort: false,
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.needSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 2, 1, 2),
      flexDirection: "column",
      alignItems: "flex-start",
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1",
    },
  })
);

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Wizyty
      </Typography>
      <Typography variant="caption">
        W tej sekcji możesz odwołać wizytę, bądź ponowić płatność. Aby ponowić
        płatność naciśnij na status.
      </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export default function CancelReservation() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Data[]>([]);
  const dispatch = useDispatch();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleReservationCancel = async (reservation_id, setLoading) => {
    const isSure = confirm("Czy na pewno chcesz anulować tę wizytę?");
    setLoading(true);
    if (isSure) {
      axios
        .post(process.env.BACKEND_HOST + "/user/cancel-reservation", {
          reservation_id,
        })
        .then((res) => {
          if (res.data.data) {
            dispatch(setMessage("Pomyślnie odwołano wizytę", "success"));
            setRows(rows.filter((curRow) => curRow.id !== reservation_id));
          }
        })
        .catch((err) => {
          if (err.response.data.data.type === "Day before") {
            dispatch(
              setMessage("Nie możesz anulować wizyty dzień przed", "error")
            );
          } else {
            dispatch(setMessage("Wystąpił błąd", "error"));
          }
        });
    }
    setLoading(false);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const customDiplayedRowText = ({ from, to, count }) =>
    `${from}-${to} z ${count}`;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  React.useEffect(() => {
    axios
      .get(process.env.BACKEND_HOST + "/user/client-active-reservations")
      .then((res) => setRows(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <Row
                    row={row}
                    index={index}
                    key={row.id}
                    handleButtonClick={handleReservationCancel}
                  />
                ))}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={"Wiersze na stronę"}
          labelDisplayedRows={customDiplayedRowText}
          nextIconButtonText={"Następna strona"}
        />
      </Paper>
    </div>
  );
}
