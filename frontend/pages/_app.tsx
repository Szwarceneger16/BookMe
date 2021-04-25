import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { Provider, useDispatch } from "react-redux";
import { useStore } from "../src/store";
import EmptyLayout from "../layouts/EmptyLayouts";
import axiosInstance from "../lib/axiosInstance";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { pl } from "date-fns/locale";
import format from "date-fns/format";
import axios from "axios";
import header from "../lib/authHeader";
import { login } from "../src/actions/auth";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  const Layout = Component.Layout || EmptyLayout;

  const LayoutAuth = ({ children }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
      (async (): Promise<void> => {
        await axios
          .get(process.env.BACKEND_HOST + "/user/me", {
            headers: header(),
          })
          .then((res) => {
            console.log(res);
            dispatch(login(res.data.data))
          })
          .catch((err) => console.log(err));
      })();
    }, []);
    return <Layout>{children}</Layout>;
  };

  axiosInstance();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <LayoutAuth>
            <Component {...pageProps} />
          </LayoutAuth>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
