export interface BeyondCodeItem {
  title: string;
  image: string;
  subtitle: string[];
}

export const beyondCodeItems: BeyondCodeItem[] = [
  {
    title: "MEDIA",
    image: "/beyond/media.webp",
    subtitle: ["Photography", "Videography", "Livestream Production"],
  },

  {
    title: "VOICE",
    image: "/beyond/voice.webp",
    subtitle: ["Hosting", "Script Writing", "Voice Work"],
  },

  {
    title: "AFTER HOURS",
    image: "/beyond/after-hours.webp",
    subtitle: ["Graphic Design", "Fitness", "Music"],
  },

  {
    title: "TINKERING",
    image: "/beyond/consulting.webp",
    subtitle: ["Consulting", "Troubleshooting", "Recommendations"],
  },

  {
    title: "PLAY",
    image: "/beyond/play.webp",
    subtitle: ["Gaming", "Recreation", "Exploration"],
  },
];
