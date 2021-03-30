import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "./apollo";
import { LoggedInRouter } from "./roters/loggedIn";
import { LoggedOutRouter } from "./roters/loggedOut";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
