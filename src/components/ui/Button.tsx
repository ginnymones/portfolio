import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Figma: design-system buttons, sans-serif set. Figma's "active" variant is the hover state.
type Variant = "primary" | "secondary" | "text";

const base =
  "inline-flex items-center justify-center font-semibold text-[18px] leading-normal uppercase tracking-[0.05em] transition-colors";

const variants: Record<Variant, string> = {
  primary:
    "rounded-full px-10 py-[14px] bg-sunshine text-dark-gray hover:bg-sunset hover:text-neutral-white aria-disabled:bg-light-gray aria-disabled:text-warm-white aria-disabled:pointer-events-none",
  secondary:
    "rounded-full px-10 py-[14px] border border-ochre text-ochre hover:border-burnt-sienna hover:text-burnt-sienna aria-disabled:border-light-gray aria-disabled:text-light-gray aria-disabled:pointer-events-none",
  text: "text-ochre underline underline-offset-[10px] decoration-1 hover:text-burnt-sienna aria-disabled:text-light-gray aria-disabled:pointer-events-none",
};

type ButtonProps = {
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">)
);

export function Button({ variant = "primary", disabled, className = "", children, ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props;
    const external = /^(https?:|mailto:)/.test(href);
    return external ? (
      <a href={href} aria-disabled={disabled || undefined} className={classes} {...rest}>
        {children}
      </a>
    ) : (
      <Link href={href} aria-disabled={disabled || undefined} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} aria-disabled={disabled || undefined} className={classes} {...(props as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
