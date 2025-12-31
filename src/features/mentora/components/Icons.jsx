import React from "react";
import { 
  Home as LucideHome, 
  Target as LucideTarget, 
  CheckSquare as LucideCheckSquare, 
  FileText as LucideFileText, 
  Youtube as LucideYoutube, 
  PieChart as LucidePieChart,
  BarChart2 as LucideBarChart2,
  Check as LucideCheck,
  Zap as LucideZap
} from 'lucide-react';

const IconWrapper = ({ children, size = 20, className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const Bell = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18.6 14.6V11a6 6 0 1 0-12 0v3.6c0 .538-.214 1.055-.595 1.435L4 17h5" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </IconWrapper>
);

export const User = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconWrapper>
);

export const Key = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M21 2l-7 7" />
    <circle cx="7" cy="17" r="3" />
    <path d="M21 2l-3 3" />
  </IconWrapper>
);

export const LogOut = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </IconWrapper>
);

export const Sun = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.93 19.07l1.41-1.41" />
    <path d="M17.66 6.34l1.41-1.41" />
  </IconWrapper>
);

export const Cloud = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M20 17.58A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 4 16.25" />
  </IconWrapper>
);

export const Moon = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </IconWrapper>
);

export const Bot = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <path d="M8 11h.01" />
    <path d="M16 11h.01" />
    <path d="M8 17v2h8v-2" />
  </IconWrapper>
);

export const Paperclip = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.5 18.94a2 2 0 0 1-2.83-2.83L18.44 6" />
  </IconWrapper>
);

export const Smile = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <path d="M9 9h.01" />
    <path d="M15 9h.01" />
  </IconWrapper>
);

export const Camera = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </IconWrapper>
);

export const Microphone = ({ size, className, color }) => (
  <IconWrapper size={size} className={className} color={color}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </IconWrapper>
);

export const Home = ({ size, className, color }) => (
  <LucideHome size={size} className={className} color={color} strokeWidth={1.5} />
);

export const Target = ({ size, className, color }) => (
  <LucideTarget size={size} className={className} color={color} strokeWidth={1.5} />
);

export const CheckSquare = ({ size, className, color }) => (
  <LucideCheckSquare size={size} className={className} color={color} strokeWidth={1.5} />
);

export const FileText = ({ size, className, color }) => (
  <LucideFileText size={size} className={className} color={color} strokeWidth={1.5} />
);

export const Youtube = ({ size, className, color }) => (
  <LucideYoutube size={size} className={className} color={color} strokeWidth={1.5} />
);

export const PieChart = ({ size, className, color }) => (
  <LucidePieChart size={size} className={className} color={color} strokeWidth={1.5} />
);

export const BarChart2 = ({ size, className, color }) => (
  <LucideBarChart2 size={size} className={className} color={color} strokeWidth={1.5} />
);

export const Check = ({ size, className, color }) => (
  <LucideCheck size={size} className={className} color={color} strokeWidth={1.5} />
);

export const Zap = ({ size, className, color }) => (
  <LucideZap size={size} className={className} color={color} strokeWidth={1.5} />
);
