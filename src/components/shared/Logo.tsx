import React from "react";

const Logo = () => {
  return (
    <div className="flex gap-3 items-center">
      <img src="/assets/images/logo.png" alt="logo" width={70} height={36} />
      <div className="flex-col">
        <p className="body-bold">TRY MODE</p>
        <p className="small-regular text-light-3">votre cabine virtuel</p>
      </div>
    </div>
  );
};

export default Logo;
