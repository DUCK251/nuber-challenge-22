import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import { authTokenVar, isLoggedInVar } from "../apollo";

export const Header: React.FC = () => {
  const { data } = useMe();
  const onClick = () => {
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
    authTokenVar("");
    isLoggedInVar(false);
    alert("Good Bye!");
  };
  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <span className="text-xs">
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </span>
        HELLO {data?.me.email.split("@")[0]}!
        <button onClick={onClick}>Log Out</button>
      </div>
    </header>
  );
};
