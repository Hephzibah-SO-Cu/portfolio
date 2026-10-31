"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contacts = [
  {
    label: "Email",
    value: "hephzibah.sinaolulana@gmail.com",
    href: "mailto:hephzibah.sinaolulana@gmail.com",
    display: "hephzibah.sinaolulana@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hephzibah-so",
    href: "https://linkedin.com/in/hephzibah-so",
    display: "linkedin.com/in/hephzibah-so",
  },
  {
    label: "GitHub",
    value: "github.com/Hephzibah-SO-Cu",
    href: "https://github.com/Hephzibah-SO-Cu",
    display: "github.com/Hephzibah-SO-Cu",
  },
  {
    label: "Telegram",
    value: "@snrmanOH",
    href: "https://t.me/snrmanOH",
    display: "@snrmanOH",
  },
  {
    label: "Phone",
    value: "+234 701 910 0106",
    href: "tel:+2347019100106",
    display: "+234 701 910 0106",
  },
  {
    label: "Résumé",
    value: "Download Résumé",
    href: "/cv.pdf",
    display: "Download Résumé",
    download: true,
  },
];

export default function Contact() {
  const sectionRef = useScrollAnimation({ variant: "fadeUp" });

  const listRef = useScrollAnimation({
    variant: "fadeUp",
    delay: 0.2,
  });

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative"
      data-tone="dark"
      data-gutter=""
      style={{
        backgroundColor: "var(--charcoal)",
        /*
          The last section on the page, so it carries extra below it — but
          in multiples of the shared rhythm, not numbers of its own.
        */
        paddingTop: "calc(var(--section-y) * 1.8)",
        paddingBottom: "calc(var(--section-y) * 2.4)",
      }}
    >
      {/* Section label */}{" "}
      <div className="flex items-center gap-4 mb-16">
        <span
          className="text-xs tracking-[var(--track-label)] uppercase"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Contact{" "}
        </span>
        <div
          className="h-px w-12"
          style={{
            backgroundColor: "var(--accent)",
          }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl">
        {/* Left */}
        <div>
          {/*
            This used to read "Let's build something meaningful", with a
            paragraph under it that also said "building something
            meaningful" — the same phrase twice in one eyeline, and neither
            of them a fact. The one line a reader actually needs from this
            page is what work I am looking for, so that is the headline now,
            and the paragraph says who I want to do it with.
          */}
          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--cream)",
              /*
                Smaller than the headline it replaced, and with no forced
                break. "Let's build / something meaningful" was four short
                words that fitted two lines at 3.5rem; this is a sentence,
                and at that size it ran to four lines and swallowed the
                section. It wraps where the column ends instead.
              */
              fontSize: "var(--t-h2)",
            }}
          >
            Open to frontend,{" "}
            <span
              style={{
                color: "rgb(var(--cream-rgb) / 0.4)",
              }}
            >
              full-stack and product engineering work.
            </span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "var(--t-small)",
              color: "rgb(var(--cream-rgb) / 0.55)",
              lineHeight: 1.8,
              maxWidth: "460px",
            }}
          >
            I work thoroughly and take attention to detail seriously. I enjoy
            working with people who know where they want to go, remain open to
            new ideas and are willing to think differently. People whose
            imagination can go far, but who also care about execution and doing
            things well.
          </p>
        </div>

        {/* Right */}
        <div
          ref={listRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col justify-center border-t border-white/10"
        >
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={
                item.download
                  ? "_blank"
                  : item.href.startsWith("http")
                    ? "_blank"
                    : undefined
              }
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              download={item.download}
              className="
            contact-item
            group
            flex
            items-center
            justify-between
            gap-6
            py-5
            transition-all
            duration-300
            hover:pl-2
          "
              style={{
                borderBottom: "1px solid rgb(var(--cream-rgb) / 0.08)",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "var(--t-label)",
                  letterSpacing: "var(--track-label)",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  width: "80px",
                  flexShrink: 0,
                }}
              >
                {item.label}
              </span>

              <span
                className="
              flex-1
              break-words
              transition-colors
              duration-300
              group-hover:text-[var(--cream)]
            "
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "var(--t-caption)",
                  color: "rgb(var(--cream-rgb) / 0.7)",
                  /*
                A flex item's min-width defaults to auto, so this span could
                not shrink below the min-content width of the longest value
                (the email address) and pushed the row 39px past a 360px
                screen. minWidth 0 lets it shrink; anywhere lets it wrap.
              */
                  minWidth: 0,
                  overflowWrap: "anywhere",
                }}
              >
                {item.display}
              </span>

              <span
                className="
              inline-block
              text-base
              transition-all
              duration-300
              group-hover:text-[var(--accent)]
              group-hover:translate-x-1
            "
                style={{
                  color: "rgb(var(--cream-rgb) / 0.25)",
                }}
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
