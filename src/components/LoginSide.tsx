import React from "react";
import Logo from "./Logo";

function LoginSide() {
  return (
    <div className="fixed w-full inset-0 flex items-center justify-end pr-[20%] overflow-hidden">
      {/* Floating Boxes Container */}
      <div className="relative w-80 h-80">
        <div
          className="floating-box w-28 h-28 bg-blue-300 flex items-center justify-center rounded-2xl absolute animate-float-1"
          style={{ top: "10%", left: "10%" }}
        >
          <Logo name="linkedin" size={40} />
        </div>
        <div
          className="floating-box  flex items-center justify-center rounded-2xl absolute animate-float-2"
          style={{ top: "10%", right: "10%" }}
        >
          <Logo name="github" size={80} />
        </div>
        <div
          className="floating-box w-20 h-20 bg-pink-300 flex items-center justify-center rounded-2xl absolute animate-float-3"
          style={{ bottom: "10%", left: "10%" }}
        >
          <Logo name="twitter" size={40} />
        </div>
        <div
          className="floating-box w-24 h-24 bg-green-200 flex items-center justify-center rounded-2xl absolute animate-float-4"
          style={{ bottom: "10%", right: "10%" }}
        >
          <Logo name="spotify" size={40} />
        </div>
      </div>
    </div>
  );
}

export default LoginSide;
