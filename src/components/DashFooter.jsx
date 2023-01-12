import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

const DashFooter = () => {
  const { pathname } = useLocation();

  return (
    <footer className="dash-footer">
      {pathname !== "/dash" && (
        <Link to="/dash">
          <FontAwesomeIcon icon={faHouse} color="#fcb" />
        </Link>
      )}
      <p>current user: YOU_KNOW_WHO</p>
      <p>status: YOU_KNOW_WHAT</p>
    </footer>
  );
};

export default DashFooter;
