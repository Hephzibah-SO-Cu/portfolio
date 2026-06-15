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
className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 pb-32 md:pb-40"
style={{ backgroundColor: "var(--charcoal)" }}
>
{/* Section label */} <div className="flex items-center gap-4 mb-16">
<span
className="text-xs tracking-[0.25em] uppercase"
style={{
color: "var(--accent)",
fontFamily: "var(--font-inter)",
}}
>
Contact </span>

```
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
      <h2
        className="font-bold leading-tight mb-6"
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--cream)",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
        }}
      >
        Let&apos;s build
        <br />
        <span
          style={{
            color: "rgba(245, 240, 232, 0.4)",
          }}
        >
          something meaningful.
        </span>
      </h2>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.95rem",
          color: "rgba(245, 240, 232, 0.55)",
          lineHeight: 1.8,
          maxWidth: "420px",
        }}
      >
        Open to frontend, full-stack and product engineering
        opportunities. If you&apos;re building something meaningful and need
        someone who cares about both the code and the craft, let&apos;s talk.
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
            item.href.startsWith("http")
              ? "noopener noreferrer"
              : undefined
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
            borderBottom: "1px solid rgba(245, 240, 232, 0.08)",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
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
              fontSize: "0.875rem",
              color: "rgba(245, 240, 232, 0.7)",
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
              color: "rgba(245, 240, 232, 0.25)",
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
