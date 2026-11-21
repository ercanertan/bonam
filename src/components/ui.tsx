import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonStyles = {
  primary: "bg-red text-paper hover:bg-ink",
  ghost:
    "border-2 border-rose text-ink hover:border-red hover:text-red",
  light: "bg-paper text-ink hover:bg-mist",
  outlineLight:
    "border-2 border-paper text-paper hover:bg-paper hover:text-ink",
};

type ButtonProps = {
  href: string;
  variant?: keyof typeof buttonStyles;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

/** CTA button — the one addition DESIGN.md lacks (it defines no CTA). */
export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-button px-6 py-4 text-base font-bold transition-colors ${buttonStyles[variant]} ${className}`;
  const isInternal = href.startsWith("/") || href.startsWith("#");
  return isInternal ? (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}

/** Small whispered label sitting above display headlines. */
export function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mb-5 text-sm font-medium tracking-wide text-ink uppercase ${className}`}
    >
      {children}
    </p>
  );
}

/** Fully rounded pill badge. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-mist px-[15px] py-[7px] text-sm font-medium text-ink">
      {children}
    </span>
  );
}

/** Page-width wrapper with consistent side padding. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
