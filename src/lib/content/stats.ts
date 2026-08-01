/**
 * Live counters shown in the home page's "Orchid is working right now." band.
 *
 * The real site resolves these server-side on every request; the values below
 * are the snapshot taken when the page was mirrored. `LiveCounts` accepts them
 * as a prop so a future data source can be swapped in without touching markup.
 */

export interface LiveStat {
  /** Final value the counter animates up to. */
  value: number;
  /** Short heading under the number. */
  label: string;
  /** Supporting line under the label. */
  caption: string;
}

export const LIVE_STATS: LiveStat[] = [
  {
    value: 848195,
    label: "Emails processed",
    caption: "Triaged, drafted, and handled end to end.",
  },
  {
    value: 1760018,
    label: "Actions logged",
    caption: "Every decision Orchid made, on the record.",
  },
];

/** Shared formatter — `848195` → `848,195`. */
export const statNumberFormat = new Intl.NumberFormat("en-US");
