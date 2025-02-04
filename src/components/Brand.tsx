import React from "react";
interface Brandprops {
  className?:string
}
function Brand({className}:Brandprops) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="50"
      height="50"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`${className}`}
    >
      <defs>
        <radialGradient id="bg-gradient" cx="0%" cy="80%" r="100%">
          <stop offset="0%" stop-color="hsla(327,83%,74%,1)" />

          <stop offset="40%" stop-color="hsla(285,81%,65%,1)" />

          <stop offset="100%" stop-color="hsla(198,81%,62%,1)" />
        </radialGradient>
      </defs>

      <rect x="4" y="4" width="56" height="56" rx="7" ry="8" />

      <circle cx="16" strokeWidth="0" cy="16" r="6" fill="url(#bg-gradient)" />

      <rect
        x="26"
        strokeWidth="0"
        y="10"
        width="28"
        height="12"
        rx="2"
        ry="2"
        fill="url(#bg-gradient)"
      />

      <rect
        x="10"
        strokeWidth="0"
        y="26"
        width="13"
        height="28"
        rx="2"
        ry="2"
        fill="url(#bg-gradient)"
      />

      <rect
        x="26"
        strokeWidth="0"
        y="26"
        width="28"
        height="28"
        rx="2"
        ry="2"
        fill="url(#bg-gradient)"
      />
    </svg>
  );
}

export default Brand;
