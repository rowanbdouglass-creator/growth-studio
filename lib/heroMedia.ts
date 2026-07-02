/**
 * Crowd media config for the YOU / eyes / BOOKED hero scene.
 *
 * Drop files in public/hero/ then point a beat at them, e.g.
 *   walk:   { video: "/hero/v1-walk.mp4",  image: null }
 *   lookUp: { video: null, image: "/hero/still-a.png" }
 *
 * Videos win over images when both are set. The `resume` beat falls
 * back to the `walk` media when both of its entries are null, so a
 * two-asset setup (walk + lookUp) works out of the box. Any beat with
 * neither set renders a labelled placeholder strip.
 */
export type BeatMedia = { video: string | null; image: string | null };

export const HERO_MEDIA: { walk: BeatMedia; lookUp: BeatMedia; resume: BeatMedia } = {
  walk: { video: null, image: null },
  lookUp: { video: null, image: null },
  resume: { video: null, image: null },
};
