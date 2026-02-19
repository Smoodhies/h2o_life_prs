import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

/**
 * SSR-safe premium glass CTA button.
 * Renders as <a> when `href` is provided, <button> otherwise.
 */
export default function GlassButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: GlassButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm rounded-xl",
    md: "px-8 py-3.5 text-base rounded-2xl",
    lg: "px-10 py-4 text-lg rounded-2xl",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background:
        "linear-gradient(135deg, rgba(0, 194, 255, 0.25) 0%, rgba(0, 120, 180, 0.15) 100%)",
      border: "1px solid rgba(0, 194, 255, 0.35)",
      boxShadow: "0 8px 32px rgba(0, 194, 255, 0.15)",
    },
    ghost: {
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      boxShadow: "none",
    },
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold text-white
    backdrop-blur-md
    transition-all duration-300 ease-premium
    hover:scale-[1.03] hover:brightness-125
    active:scale-[0.98]
    relative overflow-hidden
    button-shimmer
    ${sizeClasses[size]}
    ${className}
  `.trim();

  const style = variantStyles[variant];

  if (href) {
    return (
      <a href={href} className={baseClasses} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} style={style} onClick={onClick}>
      {children}
    </button>
  );
}
