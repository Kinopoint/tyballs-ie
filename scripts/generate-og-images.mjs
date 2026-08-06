import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDirectory = path.join(root, "public", "og");
const logoPath = path.join(root, "public", "brand", "tyballs-client-logo-sign.jpg");

const cards = [
  { file: "home.jpg", title: ["TY Ball organisers", "across Ireland"], photo: "drive-arrival.jpg" },
  { file: "how-it-works.jpg", title: ["How TY Ball", "planning works"], photo: "drive-dinner.jpg" },
  { file: "cost-guide.jpg", title: ["TY Ball cost guide", "for Ireland"], photo: "drive-garden.jpg" },
  { file: "enquire.jpg", title: ["Booking Enquiry", "Form"], photo: "drive-group.jpg" },
  { file: "for-committees.jpg", title: ["Planning for student", "committees"], photo: "drive-photobooth.jpg" },
  { file: "parents-schools.jpg", title: ["Information for parents", "and schools"], photo: "drive-arrival.jpg" },
];

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function overlay(title) {
  const titleLines = title
    .map((line, index) => `<text x="64" y="${322 + index * 70}" class="title">${escapeXml(line)}</text>`)
    .join("");

  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#101321" stop-opacity="1"/>
          <stop offset="0.54" stop-color="#151728" stop-opacity="0.98"/>
          <stop offset="0.78" stop-color="#151728" stop-opacity="0.62"/>
          <stop offset="1" stop-color="#151728" stop-opacity="0.22"/>
        </linearGradient>
        <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ff35bd"/>
          <stop offset="0.52" stop-color="#b67cff"/>
          <stop offset="1" stop-color="#43c8ff"/>
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <style>
          .title { fill: #f7f6fb; font-family: Arial, Helvetica, sans-serif; font-size: 58px; font-weight: 600; letter-spacing: -1.5px; }
          .eyebrow { fill: #b9b2dd; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 600; letter-spacing: 3px; }
          .footer { fill: #d7d4e4; font-family: Arial, Helvetica, sans-serif; font-size: 22px; font-weight: 500; }
        </style>
      </defs>
      <rect width="1200" height="630" fill="url(#shade)"/>
      <rect x="0" y="0" width="8" height="630" fill="url(#neon)"/>
      <path d="M65 231 H538" stroke="url(#neon)" stroke-width="3" filter="url(#glow)"/>
      <text x="64" y="267" class="eyebrow">TY BALL EVENTS</text>
      ${titleLines}
      <text x="64" y="556" class="footer">10+ years of event experience across Ireland</text>
      <circle cx="1086" cy="74" r="5" fill="#ff35bd" filter="url(#glow)"/>
      <circle cx="1113" cy="74" r="5" fill="#b67cff" filter="url(#glow)"/>
      <circle cx="1140" cy="74" r="5" fill="#43c8ff" filter="url(#glow)"/>
    </svg>
  `);
}

await mkdir(outputDirectory, { recursive: true });

const logo = await sharp(logoPath).resize({ width: 360, height: 166, fit: "cover" }).jpeg({ quality: 90 }).toBuffer();

for (const card of cards) {
  const photoPath = path.join(root, "public", "images", card.photo);
  const background = await sharp(photoPath)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.84, brightness: 0.72 })
    .toBuffer();

  await sharp(background)
    .composite([
      { input: overlay(card.title), left: 0, top: 0 },
      { input: logo, left: 54, top: 42 },
    ])
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    .toFile(path.join(outputDirectory, card.file));
}

console.log(`Generated ${cards.length} Open Graph cards in ${outputDirectory}`);
