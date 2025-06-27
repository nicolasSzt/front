import React from "react"
import { Global, css } from "@emotion/react"

const GlobalStyles = () => {
  return React.createElement(Global, {
    styles: css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Inter", "Roboto", "Helvetica", "Arial", sans-serif;
        line-height: 1.6;
        color: #1a202c;
        background-color: #f8fafc;
      }

      button {
        cursor: pointer;
        border: none;
        outline: none;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    `,
  })
}

export default GlobalStyles