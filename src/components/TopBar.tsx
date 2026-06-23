import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getFontColor } from "../utils";

interface TopBarProps {
  title: string;
}

export const TopBar = ({ title }: TopBarProps) => {
  const n = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, mb: "100px" }}>
      <StyledAppBar sx={{ py: "18px !important", mb: "48px !important" }}>
        <Toolbar
          sx={{
            position: "relative",
            m: "0 !important",
            p: "0 !important",
            minHeight: "0 !important",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2, color: getFontColor(theme.secondary) }}
            onClick={() => n("/")}
          >
            <ArrowBackIosNewRounded />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: 600,
              color: getFontColor(theme.secondary),
            }}
          >
            {title}
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

const StyledAppBar = styled(AppBar)`
  z-index: 99;
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => getFontColor(theme.palette.secondary.main)};
  box-shadow: 0px 6px 0px #000;
  border-bottom: 4px solid #000;
  @media (min-width: 1024px) {
    padding: 0 16vw;
  }
`;
