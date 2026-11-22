import type { SVGProps } from "react";

/** Line icons for contact channels. 24×24, inherit colour and size from text (1em). */
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, className = "", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`size-[1em] shrink-0 ${className}`}
      {...rest}
    >
      {children}
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </Base>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 20.5l1.3-4.4A9 9 0 1 1 8 19.3z" />
      <path
        d="M9 8.2c.2-.4.5-.5.8-.5h.4l.9 2-.6.9c.5 1 1.3 1.8 2.3 2.3l.9-.6 2 .9v.4c0 .3-.1.6-.5.8-.8.5-2.2.4-3.6-.6a8.5 8.5 0 0 1-2.4-2.4C8.6 10.4 8.5 9 9 8.2z"
        fill="currentColor"
        strokeWidth={1}
      />
    </Base>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m2.5 6.5 9.5 7 9.5-7" />
    </Base>
  );
}
