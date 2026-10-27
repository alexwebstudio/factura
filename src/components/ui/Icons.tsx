import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/* ── Контурные иконки 44px-кружков ── */

export function Compass(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="5" r="1.6" />
      <path d="M11.2 6.5L6 20M12.8 6.5L18 20M8 15h8" />
    </svg>
  );
}

export function Person(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  );
}

export function Blueprint(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h10l4 4v12H5z" />
      <path d="M15 4v4h4M8 12h8M8 15.5h5M8 8.5h4" />
    </svg>
  );
}

export function Factory(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 20V10l5 3V10l5 3V6h3l1 14z" />
      <path d="M3 20h18M7 17h1.5M11 17h1.5" />
    </svg>
  );
}

export function Helmet(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 16a8 8 0 0116 0" />
      <path d="M3 16h18v2.5H3zM10 8.5V6h4v2.5" />
    </svg>
  );
}

export function Contract(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3.5h9l3 3v14H6z" />
      <path d="M9 9h6M9 12h6M9 15h3.5M13.5 17.5l1.3 1.3 2.4-2.6" />
    </svg>
  );
}

export function Permit(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.5-1.5 1.6-2.2 3-2.2s2.5.7 3 2.2M14.5 10h3.5M14.5 13h2.5" />
    </svg>
  );
}

export function Folder(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 7V18.5h17V8.5h-8l-2-2.5H3.5z" />
      <path d="M7 12h10M7 15h6" />
    </svg>
  );
}

export function Warranty(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5.5" width="16" height="14" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4M9 14.5l2 2 4-4" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 005.7 5.7L16 13l4 1.5v3A2 2 0 0118 19.5C10.5 19 5 13.5 4.5 6A2 2 0 016.5 4z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

/* ── Мессенджеры (заливка) ── */

export function Telegram({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
      <path d="M20.7 4.3L2.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.7 5.4c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.2c.3-1.2-.5-1.8-1.4-1.4zM8.4 13.8l9.6-6c.5-.3.9-.1.5.2l-8.1 7.3-.3 3.4z" />
    </svg>
  );
}

export function WhatsApp({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
      <path d="M12 2.2a9.7 9.7 0 00-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1012 2.2zm0 17.7a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11.2 11.2 0 004.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2l-.5-.4z" />
    </svg>
  );
}

export function Instagram({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden focusable={false} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const iconMap = {
  compass: Compass,
  person: Person,
  blueprint: Blueprint,
  factory: Factory,
  helmet: Helmet,
  contract: Contract,
  permit: Permit,
  folder: Folder,
  warranty: Warranty,
  telegram: Telegram,
  whatsapp: WhatsApp,
  instagram: Instagram,
  phone: Phone,
  mail: Mail,
  pin: Pin,
  clock: Clock,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Cmp = iconMap[name];
  return <Cmp {...props} />;
}
