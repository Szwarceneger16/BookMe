import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    white: {
      main: "#FFF",
      darker: "#DDD",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0.6em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.1)",
          borderRadius: 5,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          borderRadius: 5,
        },
      },
    },
    MuiAppBar: {
      colorDefault: {
        color: "white",
        backgroundColor:"rgba(0, 0, 0, 0.5)"
      }
    }
  },

});

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    white: Palette["primary"];
  }
  interface PaletteOptions {
    white: PaletteOptions["primary"];
  }
}

export default theme;
