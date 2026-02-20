# Specification

## Summary
**Goal:** Add a Mood Music section that lets users browse and play bundled local tracks by mood, including a “Latest” view, while keeping existing authentication/profile behavior.

**Planned changes:**
- Add a clearly labeled “Mood Music” entry point (e.g., a new tab) and a Mood Music screen/section.
- Implement mood selection (Happy, Calm, Sad, Energetic) that filters the displayed track list based on mood tags.
- Bundle a small local music catalog as static assets and expose track metadata (title, artist/Unknown Artist, mood tags, date) to power browsing and “Latest” sorting.
- Add in-browser audio playback (play/pause) for selected tracks using standard audio controls.
- Add a “Latest” mode that shows/sorts tracks newest-first using the bundled metadata date field.
- Update header branding text (title/subtitle) to match the mood-based music focus while preserving existing login/logout and greeting behavior.
- Add an English info notice in the Mood Music section clarifying playback uses bundled/local audio files (no external streaming), while keeping the existing speech InfoNotice present.
- Integrate generated mood icon images as static assets and display them in the mood selection UI, using existing Tailwind/Shadcn components and current theme tokens (no new blue/purple primary branding).

**User-visible outcome:** Users can open “Mood Music,” pick a mood to see matching local tracks, switch to a “Latest” view, and play/pause tracks in the browser with clear English UI and updated mood-music-focused header branding.
