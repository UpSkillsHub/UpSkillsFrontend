// Clean, professional line icons (stroke style) used across the app.
function S({ children, className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const IconMail = (p) => (
  <S {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></S>
);
export const IconSun = (p) => (
  <S {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></S>
);
export const IconMoon = (p) => (
  <S {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></S>
);
export const IconLock = (p) => (
  <S {...p}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></S>
);
export const IconUser = (p) => (
  <S {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></S>
);
export const IconUsers = (p) => (
  <S {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.2 2.7-5 6-5s6 1.8 6 5" /><path d="M16 5.5a3.2 3.2 0 0 1 0 6.4" /><path d="M18.5 20c0-2.4-1-4-2.5-5" /></S>
);
export const IconClipboard = (p) => (
  <S {...p}><rect x="6" y="4" width="12" height="16" rx="2" /><path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" /><path d="M9 12h6M9 16h4" /></S>
);
export const IconCard = (p) => (
  <S {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></S>
);
export const IconGrad = (p) => (
  <S {...p}><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M6 10.5V15c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4.5" /><path d="M22 8v5" /></S>
);
export const IconBriefcase = (p) => (
  <S {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></S>
);
export const IconCode = (p) => (
  <S {...p}><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m13.5 6-3 12" /></S>
);
export const IconHeadset = (p) => (
  <S {...p}><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><rect x="2.5" y="13" width="4" height="6" rx="1.6" /><rect x="17.5" y="13" width="4" height="6" rx="1.6" /><path d="M20 19v.4a3 3 0 0 1-3 3h-2" /></S>
);
export const IconPalette = (p) => (
  <S {...p}><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1-1.8-.6-1 0-2.2 1.2-2.2H16a5 5 0 0 0 5-5c0-4.5-4-9-9-9Z" /><circle cx="7.5" cy="11" r="1" /><circle cx="12" cy="8" r="1" /><circle cx="16" cy="11" r="1" /></S>
);
export const IconMegaphone = (p) => (
  <S {...p}><path d="M4 10v4h3l10 5V5L7 10H4Z" /><path d="M18 10a3 3 0 0 1 0 4" /></S>
);
export const IconEye = (p) => (
  <S {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></S>
);
export const IconEyeOff = (p) => (
  <S {...p}><path d="m3 3 18 18" /><path d="M10.6 10.6a3 3 0 0 0 4.2 4.2" /><path d="M9.9 5.2A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.4 3.2M6.2 6.2A16.7 16.7 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 3-.5" /></S>
);
export const IconKey = (p) => (
  <S {...p}><circle cx="8" cy="9" r="4" /><path d="m11 12 8 8m-3-3 2-2m-4 0 2-2" /></S>
);
export const IconArrow = (p) => (
  <S {...p}><path d="M5 12h14m-6-6 6 6-6 6" /></S>
);
export const IconCheck = (p) => (
  <S {...p}><path d="m5 12 5 5 9-11" /></S>
);
export const IconHome = (p) => (
  <S {...p}><path d="M4 11 12 4l8 7" /><path d="M6 10v9h12v-9" /></S>
);
export const IconPhone = (p) => (
  <S {...p}><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L18 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 0-2Z" /></S>
);
export const IconMapPin = (p) => (
  <S {...p}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></S>
);

// Filled brand-style social icons
function F({ children, className = "h-5 w-5" }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor">{children}</svg>;
}
export const IconFacebook = (p) => (
  <F {...p}><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.5 0-4.1 1.5-4.1 4.2V10H7.8v3h2.7v8h3Z" /></F>
);
export const IconInstagram = (p) => (
  <S {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></S>
);
export const IconLinkedin = (p) => (
  <F {...p}><path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9V9Z" /></F>
);
export const IconWhatsapp = (p) => (
  <F {...p}><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4-.1.7.5l.8 1.9c.1.2.1.4 0 .6l-.4.6c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" /></F>
);
export const IconTwitter = (p) => (
  <F {...p}><path d="M17.5 3h3l-6.6 7.6L21.6 21h-5.8l-4.2-5.4L6.7 21H3.7l7-8L2.4 3h6l3.7 4.9L17.5 3Zm-1 16h1.6L8 4.6H6.3L16.5 19Z" /></F>
);
