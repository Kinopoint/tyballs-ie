export const site = {
  name: "TY Balls",
  domain: "TYBalls.ie",
  description:
    "TY Ball venue and event planning enquiries in Ireland, operated by DebsGuru Ltd.",
  email: "info@debsguru.ie",
  whatsappDisplay: "087 343 1732",
  whatsappHref: "https://wa.me/353873431732",
  address: [
    "DebsGuru Ltd",
    "St Brendans, East End",
    "Ballybunion, Co Kerry",
    "V31 CF61, Ireland",
  ],
  instagram: "https://www.instagram.com/debsguru/",
  facebook: "https://www.facebook.com/DebsGuru",
} as const;

export const navigation = [
  { href: "/#experience", label: "What can be included" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/cost-guide", label: "Cost guide" },
  { href: "/parents-schools", label: "Parents & schools" },
] as const;
