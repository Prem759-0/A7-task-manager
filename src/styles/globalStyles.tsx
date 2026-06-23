import { Global, css, useTheme } from "@emotion/react";
import { getFontColor } from "../utils";
import { ColorPalette } from "../theme/themeConfig";
import { reduceMotion } from "./reduceMotion.styled";
import { scrollBackground, popIn } from "./keyframes.styled";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export const GlobalStyles = () => {
  const theme = useTheme();
  const { user } = useContext(UserContext);

  const reduceMotionSetting = user?.settings?.reduceMotion ?? "system";
  const prefersReducedMotion = usePrefersReducedMotion(reduceMotionSetting);

  return (
    <Global
      styles={css`
        * {
          font-family: "Comic Sans MS", "Chalkboard SE", "Comic Neue", sans-serif !important;
          -webkit-tap-highlight-color: transparent;
          &::selection {
            background-color: ${ColorPalette.yellow} !important;
            color: #000 !important;
          }
          cursor:
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><filter id="s"><feDropShadow dx="3" dy="3" stdDeviation="0" flood-color="%23000"/></filter><path filter="url(%23s)" fill="%233ae836" stroke="%23000" stroke-width="3" stroke-linejoin="round" d="M8,8 L20,38 L24.5,24.5 L38,20 Z"/></svg>')
              8 8,
            auto;
        }
        a,
        button,
        [role="button"],
        .MuiButtonBase-root,
        input[type="submit"],
        input[type="button"],
        .cursor-pointer {
          cursor:
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32"><filter id="s"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-color="%23000"/></filter><path filter="url(%23s)" fill="%23FFEA28" stroke="%23000" stroke-width="2" stroke-linejoin="round" d="M11,14 L11,5 C11,3.5 13,3.5 13,5 L13,11 L15,9 C16,8 17.5,9 17.5,10.5 L17.5,13 L19,11 C20,10 21.5,11 21.5,12.5 L21.5,14 L23,12 C24,11 25.5,12 25.5,13.5 L25.5,19 C25.5,24 21,28 16,28 C11,28 8,24 8,19 L8,15 L11,14 Z"/></svg>')
              18 6,
            pointer;
        }
        :root {
          font-family: "Comic Sans MS", "Chalkboard SE", "Comic Neue", sans-serif;
          line-height: 1.5;
          font-weight: 400;
          color-scheme: ${theme.darkmode ? "dark" : "light"};
          color: ${getFontColor(theme.secondary)};
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;
          --rsbs-backdrop-bg: rgba(0, 0, 0, 0.3);
          --rsbs-bg: ${theme.darkmode ? "#383838" : "#ffffff"};
        }
        .no-transition *,
        .no-transition *::before,
        .no-transition *::after {
          transition: none !important;
        }
        input[type="datetime-local"]:placeholder-shown {
          color: transparent !important;
        }
        img {
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -o-user-select: none;
          user-select: none;
        }

        a {
          text-decoration: none;
          -webkit-text-decoration: none;
          color: inherit;
        }

        div[role="dialog"] {
          border-radius: 42px 42px 0 0;
          z-index: 9999999;
        }

        div[data-rsbs-backdrop] {
          z-index: 999;
        }

        div[data-rsbs-header] {
          z-index: 999999;
          &::before {
            width: 60px;
            height: 6px;
            border-radius: 100px;
            background: ${theme.darkmode ? "#717171" : "#cfcfcf"};
            margin-top: 3px;
          }
        }
        div[data-rsbs-header] {
          box-shadow: none;
        }

        [data-rsbs-root] {
          ${prefersReducedMotion &&
          css`
            --rsbs-animation-duration: 0ms !important;
            --rsbs-backdrop-opacity: 1 !important;
          `}
        }

        [data-rsbs-root],
        [data-rsbs-root] * {
          ${reduceMotion(theme, {
            transform: "none !important",
            willChange: "auto !important",
            scrollBehavior: "auto",
          })};
        }

        body {
          margin: 8px 16vw;
          touch-action: manipulation;
          background: ${theme.secondary};
          background-image: radial-gradient(#00000022 2px, transparent 2px);
          background-size: 20px 20px;
          background-attachment: fixed;
          transition: 0.3s background;
          animation: ${scrollBackground} 10s linear infinite;
          @media (max-width: 1024px) {
            margin: 20px;
          }

          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 16px;
            background-color: ${ColorPalette.yellow};
            border-left: 4px solid #000;
          }

          ::-webkit-scrollbar-thumb {
            background-color: ${ColorPalette.cyan};
            border: 4px solid #000;
            border-right: none;
            border-radius: 0px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: ${ColorPalette.magenta};
          }

          ::-webkit-scrollbar-track {
            background-color: ${ColorPalette.yellow};
            border-left: 4px solid #000;
          }
        }

        pre {
          background-color: #000000d7;
          color: white;
          padding: 16px;
          border-radius: 18px;
          overflow-x: auto;
        }
        // EMOJI PICKER REACT STYLES
        .EmojiPickerReact {
          --epr-search-border-color: ${theme.primary} !important;
          --epr-hover-bg-color-reduced-opacity: ${theme.primary + "64"} !important;
          --epr-hover-bg-color: ${theme.primary} !important;
          --epr-focus-bg-color: ${theme.primary + "64"} !important;
          --epr-dark-bg-color: ${ColorPalette.darkMode} !important;
          --epr-dark-category-label-bg-color: ${ColorPalette.darkMode + "d8"} !important;
          --epr-skin-tone-picker-menu-color: transparent !important;
          --epr-emoji-variation-picker-bg-color: ${theme.darkmode
            ? ColorPalette.darkMode
            : ColorPalette.lightMode} !important;
          --epr-emoji-variation-picker-menu-color: ${ColorPalette.darkMode} !important;
          --epr-dark-search-input-bg-color-active: #313131 !important;
          --epr-dark-picker-border-color: #616161 !important;
          border-radius: 20px !important;
          padding: 8px !important;
        }

        .epr-reactions {
          background: ${theme.darkmode ? "#141431dd" : "#ffffffd3"} !important;
          border: 1px solid ${theme.darkmode ? "#020217" : "#7d7d7d"} !important;
        }

        .epr-emoji-category-label {
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }

        .epr-emoji-native {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .epr-body,
        .MuiDialogContent-root,
        .MuiDrawer-paper,
        .customScrollbar,
        textarea {
          ::-webkit-scrollbar {
            width: 12px;
            border-left: 3px solid #000;
            background-color: ${ColorPalette.yellow};
          }

          ::-webkit-scrollbar-thumb {
            background-color: ${ColorPalette.green};
            border: 3px solid #000;
            border-right: none;
            border-radius: 0px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: ${ColorPalette.magenta};
          }

          ::-webkit-scrollbar-track {
            background-color: ${ColorPalette.yellow};
            border-left: 3px solid #000;
          }
        }

        // QR CODE SCANNER STYLES
        .scanner-container div[style*="border: 2px dashed"] {
          border-color: ${theme.primary}66 !important; /* 66 hex = 40% opacity */
        }
        .scanner-container
          div[style*="border-color: rgb(239, 68, 68) transparent transparent rgb(239, 68, 68)"] {
          border-color: ${theme.primary} transparent transparent ${theme.primary} !important;
        }

        .scanner-container
          div[style*="border-color: rgb(239, 68, 68) rgb(239, 68, 68) transparent transparent"] {
          border-color: ${theme.primary} ${theme.primary} transparent transparent !important;
        }

        .scanner-container
          div[style*="border-color: transparent transparent rgb(239, 68, 68) rgb(239, 68, 68)"] {
          border-color: transparent transparent ${theme.primary} ${theme.primary} !important;
        }

        .scanner-container
          div[style*="border-color: transparent rgb(239, 68, 68) rgb(239, 68, 68) transparent"] {
          border-color: transparent ${theme.primary} ${theme.primary} transparent !important;
        }
        // MATERIAL UI STYLES
        .MuiDialog-container {
          backdrop-filter: blur(4px);
        }
        .MuiDialog-paper,
        .MuiMenu-paper,
        .MuiDrawer-paper {
          animation: ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .MuiButton-contained {
          box-shadow: none !important;
        }
        .MuiPaper-elevation8 {
          border-radius: 16px !important;
        }
        .MuiSelect-select {
          display: flex !important;
          justify-content: left;
          align-items: center;
          gap: 4px;
        }

        .MuiDialog-container,
        .MuiPaper-root,
        .MuiModal-backdrop {
          ${reduceMotion(theme)}
        }

        .MuiTooltip-tooltip {
          color: ${theme.darkmode ? "white" : "black"} !important;
          background-color: ${theme.darkmode ? "#141431dd" : "#ededf3dd"} !important;
          backdrop-filter: blur(6px) !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          font-size: 12px !important;
          ${reduceMotion(theme)}
        }
        .MuiBottomNavigationAction-root {
          padding: 12px !important;
          margin: 0 !important;
          max-height: none;
        }
        .MuiSlider-valueLabel {
          border-radius: 10px !important;
          padding: 6px 14px !important;
          color: ${theme.darkmode ? "white" : "black"} !important;
          background-color: ${theme.darkmode ? "#141431dd" : "#ededf3dd"} !important;
          &::before,
          &::after {
            display: none;
          }
        }
        .MuiCircularProgress-circle {
          stroke-linecap: round !important;
        }
        /* 
        .MuiTabs-indicator {
          border-radius: 24px !important;
        } */
        .MuiAccordion-root {
          &::before {
            display: none;
          }
        }
      `}
    />
  );
};
