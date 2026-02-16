import { ReactNode, forwardRef } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  // allow other props like onClick, etc.
  [x: string]: any;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`glass-panel-deep ${className} transition-all duration-500`}
        style={{
          padding: "clamp(2rem, 4vw, 3rem)",
          position: "relative",
          overflow: "hidden",
        }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
