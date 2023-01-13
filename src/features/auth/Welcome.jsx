import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date());
  console.log(today);
  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome!</h1>
      <p>
        <Link to="/dash/notes">View Notes</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Add New Note</Link>
      </p>
      <p>
        <Link to="/dash/users">View Users Settings</Link>
      </p>
      <p>
        <Link to="/dash/users/new">Add New User</Link>
      </p>
    </section>
  );
};

export default Welcome;
