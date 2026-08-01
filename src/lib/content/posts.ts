import type { ArticleBlock, BlogPost } from "@/types/content";

/**
 * Blog content, transcribed from the captured orchid.ai markup.
 *
 * `slug`, `title`, `excerpt` and `image` are verbatim for all fourteen posts
 * (source: `docs/research/orchid.ai/markup/blog.txt`).
 *
 * Only `the-next-app-is-no-app` was captured as a full article
 * (`docs/research/orchid.ai/markup/blogpost.txt`); it carries the real
 * `category` / `date` / `readingTime` / `body`.
 *
 * Every other entry is a template stub: identical shape, real card content, an
 * explicitly-marked placeholder `body`, and empty `category` / `date` /
 * `readingTime` because those values were never exposed on the index page and
 * are not ours to invent. The post page skips empty meta fields, so filling a
 * post in later means editing those four fields — nothing else.
 */

/** Body used for posts whose article text has not been transcribed yet. */
function draftBody(excerpt: string): ArticleBlock[] {
  return [
    { type: "paragraph", text: excerpt },
    {
      type: "paragraph",
      text: "[Placeholder] The full text of this post has not been transcribed from the source site yet. Layout, typography, metadata and routing are final — only the body copy is pending.",
    },
  ];
}

export const POSTS: BlogPost[] = [
  {
    slug: "i-lost-15-pounds-by-texting-an-ai",
    title: "I Lost 15 Pounds by Texting an AI",
    excerpt:
      "I've quit more meal-tracking apps than I can count. The one thing that stuck wasn't an app at all. It was a text thread that remembered my goal, logged my meals from a photo, and checked in on me when I needed it.",
    lede: "I've quit more meal-tracking apps than I can count. The one thing that stuck wasn't an app at all. It was a text thread that remembered my goal, logged my meals from a photo, and checked in on me when I needed it.",
    image: "/branded/running.jpg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "I've quit more meal-tracking apps than I can count. The one thing that stuck wasn't an app at all. It was a text thread that remembered my goal, logged my meals from a photo, and checked in on me when I needed it.",
    ),
  },
  {
    slug: "the-people-you-mean-to-call",
    title: "The People You Mean to Call",
    excerpt:
      "Orchid remembers the people who matter to you. Their birthdays, what they care about, when you last spoke. So you can stay in touch without keeping it all in your head.",
    lede: "Orchid remembers the people who matter to you. Their birthdays, what they care about, when you last spoke. So you can stay in touch without keeping it all in your head.",
    image: "/branded/people-gathering-dusk.png",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Orchid remembers the people who matter to you. Their birthdays, what they care about, when you last spoke. So you can stay in touch without keeping it all in your head.",
    ),
  },
  {
    slug: "the-next-app-is-no-app",
    title: "The Next App Is No App",
    excerpt:
      "For thirty years the deal was simple: capability in exchange for your attention, one screen at a time. The next app isn't a smarter app or a better grid. It's a message, in the thread you never close.",
    lede: "For thirty years the deal was simple: capability in exchange for your attention, one screen at a time. The next app isn't a smarter app or a better grid. It's a message, in the thread you never close.",
    image: "/branded/next-app.jpeg",
    category: "Essay",
    date: "June 18, 2026",
    readingTime: "4 min read",
    body: [
      {
        type: "paragraph",
        text: "If you opened your phone right now and counted the apps, you might find forty. Maybe eighty. Maybe two hundred.",
      },
      {
        type: "paragraph",
        text: "Every one of them was a promise. Download me and your life gets easier. And every one of them came with the same fine print: first, learn everything about me.",
      },
      {
        type: "paragraph",
        text: "We accepted this. We accepted that wanting to do something meant first finding the right rectangle on a grid, opening it, remembering how it works, and navigating to the part that does the thing. A different app for the flight. A different app for the bank. A different app for the food, the ride, the calendar, the doctor, the dry cleaner.",
      },
      {
        type: "paragraph",
        text: "We naively called this convenience, but it was just a filing system for intentions.",
      },
      { type: "heading", text: "The app was always a workaround" },
      { type: "paragraph", text: "We honestly learned this the hard way." },
      {
        type: "paragraph",
        text: "Some of you might remember 0.email. It was an email client, and it was a really good one. But it became really clear that it is just a middleman between you and your goals. It became this monster we 1) couldn't tame, and 2) couldn't make an impact on the world with. Then we built orchid.ai, a different take on what an email client is. Also good, but in the end, just a middle man between you and your objectives. It was one more thing asking you to come to it, learn it, operate it. No matter how perfectly we nailed the UI, or how well thought out our experiences were, we had this feeling that something was still missing.",
      },
      {
        type: "paragraph",
        text: "Looking back, it's clear that that feeling was that we never wanted another app.",
      },
      {
        type: "paragraph",
        text: "Each time, we'd built another workaround and called it a product. The thing we kept making was the very thing people didn't want: a place to go, a tool to wield, a manual to memorize. It took us a while to see that we were solving the wrong problem. The problem was never that the apps were bad. It was that there was an app at all.",
      },
      {
        type: "paragraph",
        text: "Well… what did we want? We wanted to book the flight. We wanted to handle the refunds. We wanted dinner at 8...",
      },
      { type: "heading", text: "So what replaces it" },
      {
        type: "paragraph",
        text: "Not a better app. Not a smarter grid. Not an app that finally, after all these years, has good search.",
      },
      { type: "paragraph", text: "A conversation." },
      {
        type: "paragraph",
        text: "We already know how to do this. We've been doing it our whole lives. You tell a competent person what you want, and they handle it. You don't open them. You don't navigate them. You don't learn their interface. You just say the thing.",
      },
      { type: "paragraph", text: '"Book me Aruba, soon."' },
      {
        type: "paragraph",
        text: '"What was that restaurant we loved last March?"',
      },
      { type: "paragraph", text: '"Remind me to take my meds at 9."' },
      {
        type: "paragraph",
        text: "There's no screen to learn here because there's no screen. There's intent, and there's outcome, and nothing in between that you have to operate. The interface disappears, because the best interface was never an interface. It was someone who already understood you.",
      },
      { type: "heading", text: "Why messages?" },
      {
        type: "paragraph",
        text: "If the next app is no app, it has to live somewhere. And the somewhere is already on your phone, already open, already the most-used thing you touch all day.",
      },
      { type: "paragraph", text: "Your messages." },
      {
        type: "paragraph",
        text: "Think about what the messaging thread actually is. It's the one place on your phone with no learning curve, because it's the purest form of human expression. It's where your real life already happens, the group chats, the plans, the people who matter. It's the app you check first in the morning and last at night, not because anyone gamified it, but because that's where the people are.",
      },
      {
        type: "paragraph",
        text: "Now imagine an assistant there. Not as another icon to find. As another thread. The same place you text your partner, you text the thing that books the flight, tracks the calories, drafts the reply, catches the deadline before it slips. No new app to download. No new place to check. No new behavior to build.",
      },
      {
        type: "paragraph",
        text: "And it's everywhere you are. Your phone, your watch, your laptop, the same thread following you across all of it. No context to rebuild. No tab to find. The assistant lives in the channel you never close.",
      },
      {
        type: "paragraph",
        text: "The app asked you to come to it. The thread is already where you are.",
      },
      { type: "heading", text: "The quiet part" },
      {
        type: "paragraph",
        text: "This isn't a smaller version of the app era. It might be the end of it.",
      },
      {
        type: "paragraph",
        text: "For thirty years the deal was: we give you capability, you give us your attention, one screen at a time. The app store was the field of that deal; discovery, downloads, icons, badges, with the express purpose of capturing your attention.",
      },
      {
        type: "paragraph",
        text: "The next era doesn't have icons. It has a thread, and on the other end of it, something that does the work the app used to make you do.",
      },
      {
        type: "paragraph",
        text: "You probably won't miss the apps. The same way few people miss the filing cabinet, or the phone book, or the travel agent's printout. You'll just notice, one day, that you've stopped opening things. That you started asking instead. That the gap between wanting and having got so small you can text it.",
      },
      { type: "paragraph", text: "The next app is no app." },
      { type: "paragraph", text: "It's a message." },
      { type: "paragraph", text: "---" },
      {
        type: "paragraph",
        text: "If your phone has started to feel like a grid of chores you have to operate yourself, we built Orchid for exactly this. One thread, in the messages you already use, that handles the rest. [Say hi](sms:+14152999916) and let it run 🌸",
      },
    ],
  },
  {
    slug: "the-world-cup-in-your-messages",
    title: "The World Cup, In Your Messages",
    excerpt:
      "Our World Cup experience is live. Text Orchid and get live scores, goals, red cards, and final whistles for every match. And if you're going to a game, it doubles as the best local guide in town.",
    lede: "Our World Cup experience is live. Text Orchid and get live scores, goals, red cards, and final whistles for every match. And if you're going to a game, it doubles as the best local guide in town.",
    image: "/branded/worldcup.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Our World Cup experience is live. Text Orchid and get live scores, goals, red cards, and final whistles for every match. And if you're going to a game, it doubles as the best local guide in town.",
    ),
  },
  {
    slug: "orchid-and-granola",
    title: "Orchid + Granola",
    excerpt:
      "Our Granola integration is live. Meeting notes, action items, and decisions now flow straight into Orchid, so the most valuable context in your company doesn't disappear the moment a meeting ends.",
    lede: "Our Granola integration is live. Meeting notes, action items, and decisions now flow straight into Orchid, so the most valuable context in your company doesn't disappear the moment a meeting ends.",
    image: "/branded/granola-orchid-integration.jpg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Our Granola integration is live. Meeting notes, action items, and decisions now flow straight into Orchid, so the most valuable context in your company doesn't disappear the moment a meeting ends.",
    ),
  },
  {
    slug: "knowledge-work-is-becoming-coordination-work",
    title: "Knowledge Work Is Becoming Coordination Work",
    excerpt:
      "Models keep getting smarter, but people still feel overwhelmed. The bottleneck in modern work is no longer intelligence. It is coordination, the constant work of moving context between people, systems, and decisions.",
    lede: "Models keep getting smarter, but people still feel overwhelmed. The bottleneck in modern work is no longer intelligence. It is coordination, the constant work of moving context between people, systems, and decisions.",
    image: "/branded/hands-touching.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Models keep getting smarter, but people still feel overwhelmed. The bottleneck in modern work is no longer intelligence. It is coordination, the constant work of moving context between people, systems, and decisions.",
    ),
  },
  {
    slug: "the-operator",
    title: "The Operator",
    excerpt:
      "Every piece of software ever built assumed you'd be the one doing the work. The operator era was a tax on getting what you want. It's over.",
    lede: "Every piece of software ever built assumed you'd be the one doing the work. The operator era was a tax on getting what you want. It's over.",
    image: "/branded/astronaut-saturn-grass.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Every piece of software ever built assumed you'd be the one doing the work. The operator era was a tax on getting what you want. It's over.",
    ),
  },
  {
    slug: "introducing-voice-notes",
    title: "Introducing Voice Notes: You don't think in sentences",
    excerpt:
      "Voice notes are live on Orchid SMS. Hold the mic, talk, and the work gets done while you're already doing something else.",
    lede: "Voice notes are live on Orchid SMS. Hold the mic, talk, and the work gets done while you're already doing something else.",
    image: "/branded/hand-phone-glow.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Voice notes are live on Orchid SMS. Hold the mic, talk, and the work gets done while you're already doing something else.",
    ),
  },
  {
    slug: "the-true-cost-of-hiring-an-executive-assistant-in-2026",
    title: "The True Cost of Hiring an Executive Assistant in 2026",
    excerpt:
      "The salary is the easy number. Benefits, ramp, turnover, and the hours you spend managing them are the rest. Here is what an EA actually costs in 2026, and how to think about the math.",
    lede: "The salary is the easy number. Benefits, ramp, turnover, and the hours you spend managing them are the rest. Here is what an EA actually costs in 2026, and how to think about the math.",
    image: "/branded/group-convenience-store.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "The salary is the easy number. Benefits, ramp, turnover, and the hours you spend managing them are the rest. Here is what an EA actually costs in 2026, and how to think about the math.",
    ),
  },
  {
    slug: "run-your-week-like-you-have-a-world-class-ea",
    title:
      "How to Run Your Week Like You Have a World-Class EA (Without Hiring One)",
    excerpt:
      "Your time is a company asset. The real question isn't 'how do I get more done?' It's 'how do I stop spending my most expensive hours on work an EA should own?' A playbook.",
    lede: "Your time is a company asset. The real question isn't 'how do I get more done?' It's 'how do I stop spending my most expensive hours on work an EA should own?' A playbook.",
    image: "/branded/coffee-table.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Your time is a company asset. The real question isn't 'how do I get more done?' It's 'how do I stop spending my most expensive hours on work an EA should own?' A playbook.",
    ),
  },
  {
    slug: "this-is-not-what-you-were-hired-for",
    title: "This Is Not What You Were Hired For",
    excerpt:
      "The productivity industry made management lighter. It never made it gone. There's a different model, one where you stop managing and start deciding.",
    lede: "The productivity industry made management lighter. It never made it gone. There's a different model, one where you stop managing and start deciding.",
    image: "/branded/walking-man-papers.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "The productivity industry made management lighter. It never made it gone. There's a different model, one where you stop managing and start deciding.",
    ),
  },
  {
    slug: "orchid-beta-is-here",
    title: "Orchid Beta: Your Proactive Agent for Work",
    excerpt:
      "Orchid connects to your inbox, calendar, and other tools. It reads what's coming in, prepares the next action, and waits for you to approve.",
    lede: "Orchid connects to your inbox, calendar, and other tools. It reads what's coming in, prepares the next action, and waits for you to approve.",
    image: "/branded/person-orchid-field.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Orchid connects to your inbox, calendar, and other tools. It reads what's coming in, prepares the next action, and waits for you to approve.",
    ),
  },
  {
    slug: "the-end-of-inbox-zero",
    title: "The End of Inbox Zero and What Replaces It",
    excerpt:
      "Inbox Zero made you the processor. The future is an agent that treats email as context, not a destination.",
    lede: "Inbox Zero made you the processor. The future is an agent that treats email as context, not a destination.",
    image: "/branded/desk-lake.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Inbox Zero made you the processor. The future is an agent that treats email as context, not a destination.",
    ),
  },
  {
    slug: "a-new-generation-of-ai-applications",
    title: "Rethinking AI In Applications",
    excerpt:
      "Most apps copy the chat-box model. The future is invisible, effortless AI.",
    lede: "Most apps copy the chat-box model. The future is invisible, effortless AI.",
    image: "/branded/orchids.jpeg",
    category: "",
    date: "",
    readingTime: "",
    body: draftBody(
      "Most apps copy the chat-box model. The future is invisible, effortless AI.",
    ),
  },
];

/** The post for a slug, or `undefined` when nothing matches. */
export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}

/** Other posts shown under an article, in index order. */
export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return POSTS.filter((post) => post.slug !== slug).slice(0, count);
}
