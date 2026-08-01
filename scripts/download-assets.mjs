#!/usr/bin/env node
/**
 * Downloads every asset used by the orchid.ai clone into `public/`.
 * Fonts land in `public/fonts/`, favicons/OG images in `public/seo/`,
 * everything else keeps its original path under `public/`.
 *
 * Usage: node scripts/download-assets.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ORIGIN = 'https://orchid.ai';
const PUBLIC = path.join(process.cwd(), 'public');
const CONCURRENCY = 4;

/** [remoteUrl, localPathRelativeToPublic] */
const ASSETS = [
  // ── Fonts ──────────────────────────────────────────────────────────────
  ['/_next/static/media/TWKLausanne_400-s.p.1p1fcm8kbg854.woff2', 'fonts/TWKLausanne_400.woff2'],
  ['/_next/static/media/TWKLausanne_500-s.p.1fp40lvywnz54.woff2', 'fonts/TWKLausanne_500.woff2'],
  ['/_next/static/media/LouizeTrial_Regular-s.p.0zlhpk_xc2n1g.otf', 'fonts/Louize_Regular.otf'],
  ['/_next/static/media/LouizeTrial_Italic-s.p.0mhvnubvrf0wf.otf', 'fonts/Louize_Italic.otf'],
  ['/_next/static/media/LouizeTrial_Medium-s.p.0cjdjwaa26s_q.otf', 'fonts/Louize_Medium.otf'],
  ['/_next/static/media/LouizeTrial_MediumItalic-s.p.1xd1rdcdx-qvz.otf', 'fonts/Louize_MediumItalic.otf'],
  ['/_next/static/media/LouizeTrial_Bold-s.p.1qlndj6xynk0x.otf', 'fonts/Louize_Bold.otf'],
  ['/_next/static/media/LouizeTrial_BoldItalic-s.p.2kmpf4l3hszlj.otf', 'fonts/Louize_BoldItalic.otf'],

  // ── SEO ────────────────────────────────────────────────────────────────
  ['/favicon.ico', 'seo/favicon.ico'],
  ['/opengraph-image.png?opengraph-image.0rcg5hjl7293s.png', 'seo/opengraph-image.png'],
  ['/twitter-image.png?twitter-image.0rcg5hjl7293s.png', 'seo/twitter-image.png'],

  // ── Brand ──────────────────────────────────────────────────────────────
  ['/brand/orchid-symbol-ink.svg', 'brand/orchid-symbol-ink.svg'],
  ['/brand/orchid-symbol-ink.png', 'brand/orchid-symbol-ink.png'],
  ['/brand/orchid-symbol-paper.svg', 'brand/orchid-symbol-paper.svg'],
  ['/brand/orchid-symbol-paper.png', 'brand/orchid-symbol-paper.png'],
  ['/brand/orchid-wordmark-ink.svg', 'brand/orchid-wordmark-ink.svg'],
  ['/brand/orchid-wordmark-ink.png', 'brand/orchid-wordmark-ink.png'],
  ['/brand/orchid-wordmark-paper.svg', 'brand/orchid-wordmark-paper.svg'],
  ['/brand/orchid-wordmark-paper.png', 'brand/orchid-wordmark-paper.png'],
  ['/brand/wallpapers/laptop-handoff.jpg', 'brand/wallpapers/laptop-handoff.jpg'],
  ['/brand/wallpapers/laptop-in-hand.jpg', 'brand/wallpapers/laptop-in-hand.jpg'],
  ['/brand/wallpapers/laptop-orbit.jpg', 'brand/wallpapers/laptop-orbit.jpg'],
  ['/brand/wallpapers/phone-good-company.jpg', 'brand/wallpapers/phone-good-company.jpg'],
  ['/brand/wallpapers/phone-quiet-hours.jpg', 'brand/wallpapers/phone-quiet-hours.jpg'],
  ['/brand/wallpapers/phone-the-practice.jpg', 'brand/wallpapers/phone-the-practice.jpg'],

  // ── Branded photography / editorial imagery ────────────────────────────
  ['/branded/app-icons/calendar.png', 'branded/app-icons/calendar.png'],
  ['/branded/app-icons/mail.png', 'branded/app-icons/mail.png'],
  ['/branded/app-icons/messages.png', 'branded/app-icons/messages.png'],
  ['/branded/app-icons/orchid-square.png', 'branded/app-icons/orchid-square.png'],
  ['/branded/app-icons/phone.png', 'branded/app-icons/phone.png'],
  ['/branded/aruba.webp', 'branded/aruba.webp'],
  ['/branded/aruba_party.webp', 'branded/aruba_party.webp'],
  ['/branded/astronaut-saturn-grass.jpeg', 'branded/astronaut-saturn-grass.jpeg'],
  ['/branded/beach.jpeg', 'branded/beach.jpeg'],
  ['/branded/coffee-and-phones.jpeg', 'branded/coffee-and-phones.jpeg'],
  ['/branded/coffee-table.jpeg', 'branded/coffee-table.jpeg'],
  ['/branded/cta-twilight.jpeg', 'branded/cta-twilight.jpeg'],
  ['/branded/day-not-list-photo-01.png', 'branded/day-not-list-photo-01.png'],
  ['/branded/day-not-list-photo-02.png', 'branded/day-not-list-photo-02.png'],
  ['/branded/day-not-list-photo-03.png', 'branded/day-not-list-photo-03.png'],
  ['/branded/desk-lake.jpeg', 'branded/desk-lake.jpeg'],
  ['/branded/desk-orchid-night.jpeg', 'branded/desk-orchid-night.jpeg'],
  ['/branded/granola-orchid-integration.jpg', 'branded/granola-orchid-integration.jpg'],
  ['/branded/group-convenience-store.jpeg', 'branded/group-convenience-store.jpeg'],
  ['/branded/hand-phone-glow.jpeg', 'branded/hand-phone-glow.jpeg'],
  ['/branded/hands-touching.jpeg', 'branded/hands-touching.jpeg'],
  ['/branded/imessage-icon.png', 'branded/imessage-icon.png'],
  ['/branded/meeting-blur.jpeg', 'branded/meeting-blur.jpeg'],
  ['/branded/next-app.jpeg', 'branded/next-app.jpeg'],
  ['/branded/orchid-icon-3d.png', 'branded/orchid-icon-3d.png'],
  ['/branded/orchids.jpeg', 'branded/orchids.jpeg'],
  ['/branded/people-gathering-dusk.png', 'branded/people-gathering-dusk.png'],
  ['/branded/person-orchid-field.jpeg', 'branded/person-orchid-field.jpeg'],
  ['/branded/running.jpg', 'branded/running.jpg'],
  ['/branded/store-at-dusk.jpeg', 'branded/store-at-dusk.jpeg'],
  ['/branded/tartine.jpeg', 'branded/tartine.jpeg'],
  ['/branded/typewriter-night.jpeg', 'branded/typewriter-night.jpeg'],
  ['/branded/walking-man-papers.jpeg', 'branded/walking-man-papers.jpeg'],
  ['/branded/worldcup.jpeg', 'branded/worldcup.jpeg'],

  // ── Illustrations / device mockups ─────────────────────────────────────
  ['/illustrations/channels/iphone-17-pro-silver.png', 'illustrations/channels/iphone-17-pro-silver.png'],
  ['/illustrations/channels/orchid-icon.png', 'illustrations/channels/orchid-icon.png'],
  ['/illustrations/channels/petal.svg', 'illustrations/channels/petal.svg'],

  // ── Provider logos (all 26 the constellation cycles through) ───────────
  ...[
    'gmail.svg', 'google-calendar.png', 'slack.png', 'notion.png', 'figma.svg',
    'dropbox.png', 'hubspot.png', 'stripe.png', 'jira.svg', 'salesforce.png',
    'intercom.png', 'google-drive.svg', 'google-meet.png', 'asana.svg', 'x.png',
    'cal-com.svg', 'docusign.png', 'granola.png', 'perplexity.webp', 'reddit.png',
    'resend.svg', 'sentry.webp', 'google-sheets.png', 'attio.svg', 'cloudflare.png',
    'vercel.svg',
  ].map((f) => [`/logos/providers/${f}`, `logos/providers/${f}`]),

  // ── Testimonials / case study ──────────────────────────────────────────
  ['/testimonials/maha.png', 'testimonials/maha.png'],
  ['/testimonials/emir.png', 'testimonials/emir.png'],
  ['/testimonials/kosta.png', 'testimonials/kosta.png'],
  ['/testimonials/shubham.png', 'testimonials/shubham.png'],
  ['/testimonials/elsa.png', 'testimonials/elsa.png'],
  ['/testimonials/emanuele.png', 'testimonials/emanuele.png'],
  ['/testimonials/mo.png', 'testimonials/mo.png'],
  ['/goosewin-media-logo.png', 'goosewin-media-logo.png'],
  ['/goosewin-pfp.png', 'goosewin-pfp.png'],
];

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

async function download([remote, local]) {
  const url = remote.startsWith('http') ? remote : ORIGIN + remote;
  const dest = path.join(PUBLIC, local);
  try {
    const stat = await fs.stat(dest).catch(() => null);
    if (stat && stat.size > 0) return { local, status: 'cached', size: stat.size };

    const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: ORIGIN + '/' } });
    if (!res.ok) return { local, status: 'failed', error: `HTTP ${res.status}` };

    const buf = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, buf);
    return { local, status: 'ok', size: buf.length };
  } catch (err) {
    return { local, status: 'failed', error: err.message };
  }
}

async function main() {
  const results = [];
  for (let i = 0; i < ASSETS.length; i += CONCURRENCY) {
    const batch = ASSETS.slice(i, i + CONCURRENCY);
    results.push(...(await Promise.all(batch.map(download))));
    process.stdout.write(`\r${Math.min(i + CONCURRENCY, ASSETS.length)}/${ASSETS.length}`);
  }
  process.stdout.write('\n');

  const failed = results.filter((r) => r.status === 'failed');
  const ok = results.filter((r) => r.status === 'ok');
  const cached = results.filter((r) => r.status === 'cached');
  console.log(`downloaded: ${ok.length}  cached: ${cached.length}  failed: ${failed.length}`);
  for (const f of failed) console.log(`  ✗ ${f.local} — ${f.error}`);
  if (failed.length) process.exitCode = 1;
}

main();
