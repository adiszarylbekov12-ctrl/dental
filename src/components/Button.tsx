import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  block?: boolean;
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  icon,
  variant = "primary",
  size = "md",
  block = false,
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const sizeCls = size === "lg" ? "min-h-[58px] px-8 py-4 text-[16.5px]" : "min-h-[52px] px-7 py-3.5 text-[15.5px]";
  const variantCls =
    variant === "primary"
      ? "bg-gradient-to-br from-primary-light to-primary-dark text-white shadow-card-md hover:shadow-card-hover hover:-translate-y-0.5"
      : "bg-white text-ink border-[1.5px] border-ink/10 hover:border-primary hover:text-primary-dark hover:-translate-y-0.5";
  const widthCls = block ? "w-full" : "";

  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  const cls = `${base} ${sizeCls} ${variantCls} ${widthCls} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
