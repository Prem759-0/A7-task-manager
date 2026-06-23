import { type Theme } from "@mui/material";

export const muiComponentsProps: Theme["components"] = {
  MuiTooltip: {
    defaultProps: {
      disableInteractive: true,
      style: {
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      },
    },
    styleOverrides: {
      tooltip: {
        border: "3px solid #000",
        borderRadius: "8px",
        boxShadow: "3px 3px 0px #000",
        fontWeight: "bold",
        fontSize: "0.9rem",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif",
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        padding: "12px 24px",
        borderRadius: "4px",
        border: "3px solid #000",
        boxShadow: "4px 4px 0px #000",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "1px",
        transition: "all 0.1s ease-in-out",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif",
        "&:hover": {
          transform: "translate(2px, 2px)",
          boxShadow: "2px 2px 0px #000",
        },
        "&:active": {
          transform: "translate(4px, 4px)",
          boxShadow: "0px 0px 0px #000",
        },
        "&.Mui-disabled": {
          opacity: 0.7,
          border: "3px solid #000",
        }
      },
      contained: {
        boxShadow: "4px 4px 0px #000 !important",
        "&:hover": {
          boxShadow: "2px 2px 0px #000 !important",
        },
      }
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        border: "3px solid #000",
        boxShadow: "4px 4px 0px #000",
        "&.Mui-focused": {
          backgroundColor: "#fef08a",
        }
      },
      select: {
        fontWeight: "bold",
      }
    },
  },
  MuiDialog: {
    defaultProps: {
      slotProps: {
        paper: {
          style: {
            padding: "16px",
            borderRadius: "8px",
            border: "4px solid #000",
            boxShadow: "8px 8px 0px #000",
            minWidth: "400px",
          },
        },
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        fontWeight: 900,
        color: "#fff",
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        border: "3px solid #000",
        boxShadow: "4px 4px 0px #000",
        fontWeight: "bold",
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiInputBase-root": {
          borderRadius: "8px",
          border: "3px solid #000",
          boxShadow: "4px 4px 0px #000",
          transition: "all 0.1s ease-in-out",
          backgroundColor: "#fff",
          "&.Mui-focused": {
            backgroundColor: "#fef08a",
            transform: "translate(-1px, -1px)",
            boxShadow: "5px 5px 0px #000",
          }
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        }
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        border: "3px solid #000",
        boxShadow: "6px 6px 0px #000",
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        border: "3px solid #000",
        boxShadow: "4px 4px 0px #000",
      }
    }
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        "&.Mui-selected": {
          border: "2px solid #000",
          borderRadius: "8px",
          backgroundColor: "rgba(0,0,0,0.05)",
          transform: "translate(0, -2px)",
          boxShadow: "2px 2px 0px #000",
        }
      }
    }
  }
};
