import React from "react";
import { IntlProvider } from "react-intl";

export const Context = React.createContext();

const Wrapper = (props) => {

  return (
    
      <IntlProvider>
        {props.children}
      </IntlProvider>
   
  );
};

export default Wrapper;
