import React from "react";

const Logo = () => {
  return (
    <div>
      <img
        className="logo"
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        alt="Share Split Logo"
      />
    </div>
  );
};

export default Logo;
