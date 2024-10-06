export const color = {
  primary: {
    "100": "#E8CBFE",
    "200": "#CE97FD",
    "300": "#AE63F9",
    "400": "#903DF4",
    "500": "#6200EE",
    "600": "#4B00CC",
    "700": "#3800AB",
    "800": "#27008A",
    "900": "#1B0072"
  },
  contrast: "#1E1729"
}

const palette = {
  mode: 'light',
  primary: {
    main: color.primary[500],
    dark: '#0c0033',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#b5f456',
    light: '#c1f672'
  },
  text: {
    primary: '#1e1729',
  },
};

const components = {
  MuiCard:{
    styleOverrides: {
      root: {
        variants: [
          {
            props: { variant: "receipt" },
            style: {
              borderRadius: "0px",
              mask: "conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/1em 100%"
            },
          }
        ]
      }
    }
  },
  MuiAppBar:{
    styleOverrides:{
      root:{
        backgroundColor: "#564A67"
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: palette.primary.main,
        paddingLeft: 20,
        paddingRight: 20,
        color: palette.primary.contrastText,
      }
    }
  },
}

export const themeOptions = {
  palette,
  typography: {
    fontFamily: '"Space Grotesk", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "normal",
    },
    h2: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 52,
      fontWeight: "bold",
    },
    h5: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    button: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 20,
      weigth: "medium",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 32,
  },
  components
};
