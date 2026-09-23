import { media } from "@/lib/media";

export const experiences = [
  {
    id: "fuji",
    index: "01",
    title: "Mount Fuji",
    lede: "The mountain, before the car parks.",
    body: "We do not send you to a coach park at noon. The Alphard leaves while the city is still dark. The stop is chosen for that morning’s cloud, then the return is slow — Hakone if you want the night.",
    holds: ["Out before the coaches", "Viewpoint set to the morning", "Hakone only if you want it"],
    media: media.fuji,
  },
  {
    id: "sakura",
    index: "02",
    title: "Sakura",
    lede: "The right trees, the right week.",
    body: "Bloom is a week, not a postcard. We watch the forecast and put you under the trees that are actually on, early, before the ropes go up. Tea after. No picnic-mat battle.",
    holds: ["Grove matched to that week", "Early, before the ropes", "Tea, not a timetable"],
    media: media.sakura,
  },
  {
    id: "tower",
    index: "03",
    title: "Tokyo Tower",
    lede: "A photograph, not a stamp.",
    body: "Blue hour from a roof we use, or the deck if you want the height — booked, not queued on a hope. The picture is the point. The souvenir shop is not.",
    holds: ["Blue hour, not noon haze", "A roof used for photographs", "Deck tickets only if you ask"],
    media: media.tower,
  },
  {
    id: "kimono",
    index: "04",
    title: "Kimono",
    lede: "Dressed by hand. Not a rental dash.",
    body: "A house that still ties the obi properly. Time for the garden or a back street, then the day continues in your own clothes. No sprint between temples in borrowed silk.",
    holds: ["Obi tied by hand", "Garden or a side street", "Change back without a sprint"],
    media: media.kimono,
  },
  {
    id: "kaiseki",
    index: "05",
    title: "Kaiseki",
    lede: "A small room. The week’s kitchen.",
    body: "High-end means a counter or a private room, and a kitchen cooking what the week actually brought. We ask how you eat before we reserve. Not a set menu in six languages.",
    holds: ["Counter or a private room", "The season, discussed ahead", "How you eat, asked first"],
    media: media.kaiseki,
  },
] as const;

export type ExperienceId = (typeof experiences)[number]["id"];
