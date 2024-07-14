import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productcontex";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { AuthProvider } from "./context/auth_Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'; // If using styled-components

const root = ReactDOM.createRoot(document.getElementById("root"));

// import { Auth0Provider } from "@auth0/auth0-react";
// const domain=process.env.REACT_APP_AUTH_DOMAIN;
// const clientId=process.env.REACT_APP_AUTH_CLIENT;
const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-body {
    font-size: 16px; /* Adjust font size as needed */
  }
`;

root.render(

  <AuthProvider>
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
          <StyledToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
          <App />
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
  </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
