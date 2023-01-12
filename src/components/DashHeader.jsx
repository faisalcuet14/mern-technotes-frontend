import React from "react";

const DashHeader = () => {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <h1 className="dash-header__title">Technotes</h1>
      </div>
      <nav className="dash-header__nav">{/* add nav buttons */}</nav>
    </header>
  );
};

export default DashHeader;
