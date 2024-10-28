// components/Logo.tsx
import React from "react";
import logos from "@/assets/logos";

// Define the type for `name` as the keys of `logos`
type LogoName = keyof typeof logos;

interface LogoProps {
  name: LogoName;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ name, size = 24 }) => {
  const LogoSVG = logos[name];
  return (
    <div style={{ width: size, height: size }}>
      {LogoSVG ? React.cloneElement(LogoSVG, { width: size, height: size }) : null}
    </div>
  );
};

export default Logo;
