import React, { createContext } from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import UserStore from "./store/UserStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export interface ContextType {
  user: UserStore;
}

export const Context = createContext<ContextType | null>(null);

root.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <App />
  </Context.Provider>
);
