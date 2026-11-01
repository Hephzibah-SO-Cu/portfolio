"use client";

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "filled" | "outline";
type ButtonSize = "sm" | "md" | "hero";

/**
 * Which surface the button is sitting on. Not which colour the button is —
 * the variant decides that. A primary action is the filled one on both
 * tones, and it is only the ink that swaps.
 *
 * This is why the hero's two buttons were hand-rolled for so long: the
 * component knew charcoal-on-cream and nothing else, so anything on a dark
 * surface had to invent itself, and the two of them ended up with two
 * different arrow glyphs.
 */
type ButtonTone = "light" | "dark";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  showArrow?: boolean;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "filled",
  size = "md",
  tone = "light",
  showArrow = false,
  children,
  ...props
}: ButtonProps) {
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      padding: "10px 20px",
      fontSize: "var(--t-label)",
    },
    md: {
      padding: "14px 28px",
      fontSize: "var(--t-label)",
    },
    /*
      The hero's pair. Fluid, because they belong to a full-viewport
      composition and have to keep their proportion on a 2560 monitor —
      which is the reason the hero hand-rolled them rather than using this
      component, and the reason they ended up with two different arrows.
    */
    hero: {
      padding: "clamp(0.85rem, 1.11vw, 1.35rem) clamp(1rem, 2.22vw, 2.75rem)",
      fontSize: "var(--t-label)",
      gap: "clamp(0.6rem, 0.83vw, 1rem)",
    },
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-inter)",
    fontWeight: "var(--weight-label)",
    letterSpacing: "var(--track-label)",
    textTransform: "uppercase",
    textDecoration: "none",
    border: "1px solid var(--charcoal)",
    cursor: "pointer",
    transition: "background 0.25s ease, color 0.25s ease, opacity 0.25s ease",
    whiteSpace: "nowrap",
    ...sizeStyles[size],
  };

  const variantStyle: Record<
    ButtonTone,
    Record<ButtonVariant, React.CSSProperties>
  > = {
    light: {
      filled: {
        backgroundColor: "var(--charcoal)",
        color: "var(--cream)",
        borderColor: "var(--charcoal)",
      },
      outline: {
        backgroundColor: "transparent",
        color: "var(--charcoal)",
        borderColor: "var(--charcoal)",
      },
    },
    dark: {
      filled: {
        backgroundColor: "var(--cream)",
        color: "var(--charcoal)",
        borderColor: "var(--cream)",
      },
      outline: {
        backgroundColor: "transparent",
        color: "var(--cream)",
        borderColor: "var(--accent)",
      },
    },
  };

  /* What hovering does, per tone, so the handlers below hold no colours. */
  const hover: Record<ButtonTone, { bg: string; fg: string }> = {
    light: { bg: "var(--charcoal)", fg: "var(--cream)" },
    dark: { bg: "rgb(var(--accent-rgb) / 0.12)", fg: "var(--cream)" },
  };

  const resting = variantStyle[tone][variant];

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    ...resting,
  };

  const onEnter = (el: HTMLElement) => {
    if (variant === "filled") {
      el.style.opacity = "0.85";
      return;
    }

    el.style.backgroundColor = hover[tone].bg;
    el.style.color = hover[tone].fg;
  };

  const onLeave = (el: HTMLElement) => {
    if (variant === "filled") {
      el.style.opacity = "1";
      return;
    }

    el.style.backgroundColor = "transparent";
    el.style.color = resting.color as string;
  };

  const content = (
    <>
      {children}
      {showArrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M1 7H13M13 7L7 1M13 7L7 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsLink;
    return (
      <a
        href={href}
        style={combinedStyle}
        onMouseEnter={(e) => onEnter(e.currentTarget)}
        onMouseLeave={(e) => onLeave(e.currentTarget)}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      style={combinedStyle}
      onMouseEnter={(e) => onEnter(e.currentTarget)}
      onMouseLeave={(e) => onLeave(e.currentTarget)}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
