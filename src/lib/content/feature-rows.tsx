import {
  Bell,
  Blocks,
  Brain,
  Calendar,
  CalendarCheck,
  Funnel,
  Gift,
  Heart,
  Inbox,
  Link2,
  Moon,
  Repeat,
  Sparkles,
  Workflow,
} from "lucide-react";

import { AppBadges } from "@/components/home/visuals/AppBadges";
import { GlassNotification } from "@/components/home/visuals/GlassNotification";
import { HabitBubbles } from "@/components/home/visuals/HabitBubbles";
import { ProviderConstellation } from "@/components/home/visuals/ProviderConstellation";
import { SecondBrainChat } from "@/components/home/visuals/SecondBrainChat";
import type { FeatureRow } from "@/types/content";

/** The five "What Orchid handles for you" rows, in order. */
export const FEATURE_ROWS: FeatureRow[] = [
  {
    title: "Connect with your stack.",
    description:
      "Orchid learns the way you work, with your tools. Not the other way around.",
    descriptionWidth: 470,
    bullets: [
      { Icon: Link2, text: "Connect once, it just works" },
      { Icon: Blocks, text: "Pulls from all your apps" },
      { Icon: Workflow, text: "A hundred tools, one assistant" },
    ],
    photoSrc: "/branded/coffee-and-phones.jpeg",
    Visual: ProviderConstellation,
  },
  {
    title: "Automate your life using habits.",
    description:
      "Set up any habit just by asking. Anything from a daily news digest to a calorie tracker you text pictures of.",
    descriptionWidth: 470,
    bullets: [
      { Icon: Repeat, text: "Set it once, it repeats" },
      { Icon: Sparkles, text: "Your routines, on autopilot" },
      { Icon: Moon, text: "Runs while you sleep" },
    ],
    photoSrc: "/branded/desk-orchid-night.jpeg",
    Visual: HabitBubbles,
  },
  {
    title: "Stay on top of admin.",
    description:
      "Bills, bookings, follow ups, forms. The boring stuff still gets done, you just stop being the one doing it.",
    descriptionWidth: 460,
    bullets: [
      { Icon: Inbox, text: "Inbox triaged, replies drafted" },
      { Icon: Calendar, text: "Your calendar, always in order" },
      { Icon: Funnel, text: "The busywork, off your plate" },
    ],
    photoSrc: "/branded/day-not-list-photo-01.png",
    Visual: AppBadges,
  },
  {
    title: "Never let anything slip through the cracks.",
    description:
      "The starred email, the deadline, your mom's birthday. Orchid catches it before you even remember to worry.",
    descriptionWidth: 450,
    bullets: [
      { Icon: Bell, text: "A nudge right when it matters" },
      { Icon: CalendarCheck, text: "Nothing slips through the cracks" },
      { Icon: Gift, text: "The thoughtful thing, on time" },
    ],
    photoSrc: "/branded/day-not-list-photo-03.png",
    Visual: GlassNotification,
  },
  {
    title: "Your second brain.",
    description:
      "The wine you loved, your kid's allergy, where you parked. Tell Orchid once and it never forgets.",
    descriptionWidth: 470,
    bullets: [
      { Icon: Brain, text: "Never forgets a detail" },
      { Icon: Sparkles, text: "Recalls it the second you need it" },
      { Icon: Heart, text: "Remembers what matters to you" },
    ],
    photoSrc: "/branded/day-not-list-photo-02.png",
    Visual: SecondBrainChat,
  },
];
