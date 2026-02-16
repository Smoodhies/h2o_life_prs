import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    /** Render as a link instead of a button */
    href?: string;
    /** 'filled' = white pill (glass navbar), 'outline' = bordered (dark bg), 'ghost' = transparent */
    variant?: 'filled' | 'outline' | 'ghost';
}

/**
 * Reusable pill CTA button — SSR-safe (no hooks, no useEffect).
 * Works in both server and client components.
 *
 * @example
 * <NavButton>ORDER NOW</NavButton>
 * <NavButton variant="outline" onClick={fn}>SHOP NOW</NavButton>
 * <NavButton href="/shop" variant="ghost">BROWSE</NavButton>
 */
export function NavButton({
    children,
    href,
    variant = 'filled',
    className = '',
    ...props
}: NavButtonProps) {
    const base =
        'relative px-9 sm:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 rounded-full font-bold text-base sm:text-lg tracking-wider uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-[0.98] flex items-center gap-2 group';

    const variants = {
        filled:
            'bg-white/95 hover:bg-white border border-white/50 text-[#0f2942] shadow-[0_2px_16px_rgba(31,38,135,0.12),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.04)]',
        outline:
            'border-2 border-white/80 hover:border-white bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white',
        ghost:
            'bg-transparent hover:bg-white/10 text-white/90 hover:text-white',
    };

    const chevronColor = variant === 'filled' ? 'text-[#1a3a5c]' : 'text-current';

    const inner = (
        <>
            {variant === 'filled' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}
            <span className="relative flex items-center gap-1.5">
                {children}
                <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 ${chevronColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </span>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className={`${base} ${variants[variant]} ${className}`}
            >
                {inner}
            </a>
        );
    }

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {inner}
        </button>
    );
}
