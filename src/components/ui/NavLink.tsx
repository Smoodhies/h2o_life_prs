import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    /** When true, renders the active/highlighted style */
    active?: boolean;
    /** Color theme — 'glass' for frosted navbar, 'dark' for dark backgrounds */
    tone?: 'glass' | 'dark';
}

/**
 * Reusable navigation link with liquid glass hover effect — SSR-safe (no hooks).
 * Works in both server and client components.
 *
 * @example
 * <NavLink href="#shop">Shop</NavLink>
 * <NavLink href="#about" active>About</NavLink>
 * <NavLink href="#info" tone="dark">Info</NavLink>
 */
export function NavLink({
    children,
    active = false,
    tone = 'glass',
    className = '',
    ...props
}: NavLinkProps) {
    const tones = {
        glass: active
            ? 'text-white bg-white/35 border-white/50 shadow-lg'
            : 'text-white/95 hover:text-white bg-white/18 hover:bg-white/30 border-white/35 hover:border-white/50',
        dark: active
            ? 'text-white bg-white/20 border-white/40 shadow-lg'
            : 'text-white/85 hover:text-white bg-white/10 hover:bg-white/20 border-white/25 hover:border-white/40',
    };

    return (
        <a
            className={`text-[16px] sm:text-[18px] lg:text-[20px] font-bold tracking-wide transition-all duration-300 px-6 sm:px-7 lg:px-9 py-3 sm:py-3.5 lg:py-4 rounded-full whitespace-nowrap border-2 ${tones[tone]} ${className}`}
            style={{
                backdropFilter: 'blur(16px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.15)',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
            {...props}
        >
            {children}
        </a>
    );
}
