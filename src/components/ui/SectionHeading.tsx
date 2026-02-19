import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  children?: ReactNode;
  className?: string;
}

/**
 * SSR-safe reusable section heading with gradient title and subtitle.
 * No client-side hooks — can be rendered on the server.
 */
export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  children,
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "text-center mx-auto"
      : align === "right"
        ? "text-right ml-auto"
        : "text-left";

  return (
    <div className={`max-w-3xl mb-16 md:mb-24 ${alignClass} ${className}`}>
      <h2
        className="text-gradient text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-[var(--c-silver)] text-base sm:text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
