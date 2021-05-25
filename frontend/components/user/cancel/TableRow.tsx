import React from "react";
import LoadingButton from "../../common/buttons/LoadingButton";
import {
  Button,
  Chip,
  createStyles,
  makeStyles,
  Modal,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { blue, green, grey, orange, red } from "@material-ui/core/colors";
import { CheckoutForm } from "../../register/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SignalCellularConnectedNoInternet0BarSharp } from "@material-ui/icons";

const stripePromise = loadStripe(process.env.STRIPE_PK);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      minWidth: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
    },
    wrapper: {
      width: "100%",
    },
  })
);

enum PaymentStatuses {
  CANCELED = "CANCELED",
  REFFUNDED = "REFFUNDED",
  SUCCEEDED = "SUCCEEDED",
  INCOMPLETE = "INCOMPLETE",
}

function Row({ row, index, handleButtonClick }) {
  const [loading, setLoading] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const labelId = `enhanced-table-checkbox-${index}`;
  const classes = useStyles();
  let chip = {};
  switch (row.payment_status) {
    case PaymentStatuses.CANCELED:
      chip = { color: red[600], text: "Anulowano" };
      break;
    case PaymentStatuses.INCOMPLETE:
      chip = { color: orange[600], text: "Nieuczkończona" };
      break;
    case PaymentStatuses.REFFUNDED:
      chip = { color: blue[600], text: "Zwrócona" };
      break;
    case PaymentStatuses.SUCCEEDED:
      chip = { color: green[600], text: "Ukończona" };
      break;
    default:
      chip = { color: grey[600], text: "Brak" };
  }

  const canRenew =
    row.payment_status === PaymentStatuses.INCOMPLETE || !row.payment_status;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <Typography variant="h3" id="simple-modal-title">
        Ponów płatność
      </Typography>
      <p id="simple-modal-description">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            setIsSubmitLoading={setSubmitLoading}
            reservation={row.id}
            color="black"
          />
        </Elements>
      </p>
      <LoadingButton
        loading={submitLoading}
        variant="contained"
        type="submit"
        form="payment"
        className={classes.wrapper}
      >
        Zaplać
      </LoadingButton>
    </div>
  );

  return (
    <TableRow hover>
      <TableCell component="th" id={labelId} scope="row">
        {row.service}
      </TableCell>
      <TableCell align="right">{row.employee}</TableCell>
      <TableCell align="right">{row.date}</TableCell>
      <TableCell align="right">{row.time}</TableCell>
      <TableCell align="right">
        <LoadingButton
          loading={loading}
          variant="contained"
          color="secondary"
          onClick={() => handleButtonClick(row.id, setLoading)}
        >
          Odwołaj
        </LoadingButton>
      </TableCell>
      <TableCell>
        <Chip
          style={{ backgroundColor: chip.color, color: "white", width: "100%" }}
          label={chip.text}
          onClick={
            canRenew
              ? () => {
                  handleOpen();
                }
              : null
          }
        />
        {canRenew && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        )}
      </TableCell>
    </TableRow>
  );
}

export default Row;
