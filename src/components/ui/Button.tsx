"use client";

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "filled" | "outline";
type ButtonSize = "sm" | "md";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  showArrow = false,
  children,
  ...props
}: ButtonProps) {
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      padding: "10px 20px",
      fontSize: "0.7rem",
    },
    md: {
      padding: "14px 28px",
      fontSize: "0.75rem",
    },
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-inter)",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    border: "1px solid var(--charcoal)",
    cursor: "pointer",
    transition: "background 0.25s ease, color 0.25s ease, opacity 0.25s ease",
    whiteSpace: "nowrap",
    ...sizeStyles[size],
  };

  const variantStyle: Record<ButtonVariant, React.CSSProperties> = {
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
  };

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    ...variantStyle[variant],
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
        onMouseEnter={(e) => {
          if (variant === "filled") {
            e.currentTarget.style.opacity = "0.85";
          } else {
            e.currentTarget.style.backgroundColor = "var(--charcoal)";
            e.currentTarget.style.color = "var(--cream)";
          }
        }}
        onMouseLeave={(e) => {
          if (variant === "filled") {
            e.currentTarget.style.opacity = "1";
          } else {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--charcoal)";
          }
        }}
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
      onMouseEnter={(e) => {
        if (variant === "filled") {
          e.currentTarget.style.opacity = "0.85";
        } else {
          e.currentTarget.style.backgroundColor = "var(--charcoal)";
          e.currentTarget.style.color = "var(--cream)";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "filled") {
          e.currentTarget.style.opacity = "1";
        } else {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--charcoal)";
        }
      }}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
