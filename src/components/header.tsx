import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { useApolloClient } from "@apollo/client";

export const Header: React.FC = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { data } = useMe();
  const onClick = () => {
    client.clearStore();
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
    authTokenVar("");
    isLoggedInVar(false);
    history.push("/");
  };
  return (
    <header className="max-w-screen-md mx-auto p-4 bg-blue-300 border-b border-blue-400">
      <div className="w-full mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xs mx-2 text-white bg-blue-400 hover:bg-blue-600 py-1 px-2 rounded-3xl">
            <Link to="/">
              <FontAwesomeIcon icon={faHome} className="text-xl" />
            </Link>
          </span>
          <span className="hidden md:flex">{data?.me.email}</span>
        </div>
        <div className="flex">
          <span className="text-xs mx-2 text-white bg-blue-400 hover:bg-blue-600 py-1 px-2 rounded-3xl">
            <Link to="/my-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
          <button
            onClick={onClick}
            className="py-1 px-2 text-white bg-blue-400 hover:bg-blue-600 rounded-3xl focus:outline-none"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};
