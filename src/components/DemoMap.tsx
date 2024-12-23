"use client";

import React from "react";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
}

export default function DemoMap({
  dots = [
    { start: { lat: 40.7128, lng: -74.006 }, end: { lat: 34.0522, lng: -118.2437 } },
    { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 48.8566, lng: 2.3522 } },
  ],
  lineColor = "#0ea5e9",
}: MapProps) {
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#00000040", // Adjust for light or dark theme
    shape: "circle",
    backgroundColor: "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      {/* Background and dotted map */}
      <rect width="100%" height="100%" fill="white" />
      <g dangerouslySetInnerHTML={{ __html: svgMap }} />

      {/* Paths and points */}
      {dots.map((dot, i) => {
        const startPoint = projectPoint(dot.start.lat, dot.start.lng);
        const endPoint = projectPoint(dot.end.lat, dot.end.lng);

        return (
          <g key={`path-group-${i}`}>
            {/* Curved path */}
            <path
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke={lineColor}
              strokeWidth="1"
            />
            {/* Start point */}
            <circle cx={startPoint.x} cy={startPoint.y} r="2" fill={lineColor} />
            {/* End point */}
            <circle cx={endPoint.x} cy={endPoint.y} r="2" fill={lineColor} />
          </g>
        );
      })}
    </svg>
  );
}
