import React from "react";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { P24BankElement } from "@stripe/react-stripe-js";
import axios from "axios";
import authHeader from "../../lib/authHeader";
import { useSelector } from "react-redux";
import { Grid, Hidden, Typography } from "@material-ui/core";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";

const stripePromise = loadStripe(process.env.STRIPE_PK);

const P24_ELEMENT_OPTIONS = {
  style: {
    base: {
      padding: "16px 24px",
      color: "#000",
      backgroundColor: "rgba(255,255,255,.1)",
      fontSize: "16px",
      borderRadius: 8,
      "::placeholder": {
        color: "#fff",
      },
    },
  },
};

const useStyles = makeStyles((theme) => ({
  image: {
    display: "flex",
    justifyContent: "center",
  },
  caption: {
    color: theme.palette.white.main,
  },
}));

function P24BankSection() {
  const classes = useStyles();
  return (
    <label style={{ color: "#fff", fontSize: "1.6rem" }}>
      Zapłać z Przelewy24
      <br />
      <Typography variant="caption" className={classes.caption}>
        Wybierz swój sposób zapłaty i przejdź do płatności. Opłata za kaucję
        wynosi <b>10zł</b> i jest ona zapewnieniem rezerwacji dla obu stron.
      </Typography>
      <P24BankElement options={P24_ELEMENT_OPTIONS} />
    </label>
  );
}

function CheckoutForm({ setIsSubmitLoading }) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    if (stripe) {
      setIsSubmitLoading(false);
    }
  }, [stripe]);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setIsSubmitLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const p24Bank = elements.getElement(P24BankElement);

    const response = await axios
      .post(
        process.env.BACKEND_HOST + "/payments/create-payment-intent",
        {
          reservation_id: 6,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => res)
      .catch((err) => console.log(err.response));
    const client_secret = response.data.data.client_secret;

    const { error } = await stripe.confirmP24Payment(client_secret, {
      payment_method: {
        p24: p24Bank,
        billing_details: {
          name: user.first_name + " " + user.last_name,
          email: user.email,
        },
      },
      payment_method_options: {
        p24: {
          // In order to be able to pass the `tos_shown_and_accepted` parameter, you must
          // ensure that the P24 regulations and information obligation consent
          // text is clearly in the view of the customer. See
          // stripe.com/docs/payments/p24/accept-a-payment#requirements
          // for directions.
          tos_shown_and_accepted: true,
        },
      },
      return_url:
        process.env.BACKEND_HOST + "/payments/handle-payment-response",
    });

    if (error) {
      // Show error to your customer.
      console.log(error.message);
    }
    setIsSubmitLoading(false);
    // Otherwise the customer will be redirected away from your
    // page to complete the payment with their bank.
  };

  return (
    <form onSubmit={handleSubmit} id="payment">
      <div className="form-row">
        <P24BankSection />
      </div>
    </form>
  );
}

function Payment({ setIsSubmitLoading }) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" justifycontent="center">
      <Hidden smDown>
        <Grid item md={6} className={classes.image}>
          <Image
            src="/images/payment.svg"
            width={400}
            height={300}
            alt="Payment image"
          />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6}>
        <Elements stripe={stripePromise}>
          <CheckoutForm setIsSubmitLoading={setIsSubmitLoading} />
        </Elements>
      </Grid>
    </Grid>
  );
}

export default Payment;
