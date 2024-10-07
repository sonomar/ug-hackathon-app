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
  MuiCard: {
    styleOverrides: {
      root: {
        borderWidth: 1,
        borderColor: "#D5CDE0",
        borderStyle: "solid",
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
  MuiLink:{
    styleOverrides: {
      root: {
        textDecoration: "none",
        color: palette.text.primary,
        "&:hover": {
          textDecoration: "underline"
        }
      }
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "white",
        borderColor: "#D5CDE0",
        variants:[
          {
            props: {variant: "home"},
            style: {
              backgroundColor: "#564A67",
            }
          }
        ]
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
        variants: [
          {
            props: { variant: "navbar" },
            style: {
              backgroundColor: "white",
              color: color.contrast,
              marginRight: 16,
              "&.active": {
                backgroundColor: palette.secondary.main,
              },
              "&.active:before": {
                content: '"•"',
                marginRight: 8,
              }
            }
          },
          {
            props: {variant: "outlined"},
            style:{
              backgroundColor: "white",
              color: palette.primary.main,
              borderWidth: 1,
              fontSize: 20,
              fontWeight: "bold",
            }
          }
        ]
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
      fontWeight: "bold",
      fontSize: 52,
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    h2: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 32,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 20,
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
      fontSize: 28,
      fontWeight: "medium",
      marginBottom: 10,
    },
    h6: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 20,
      marginBottom: 10,
    },
    button: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 20,
      weigth: "medium",
      textTransform: "none",
    },
    body1: {
      fontSize: 16,
    }
  },
  shape: {
    borderRadius: 32,
  },
  components
};
