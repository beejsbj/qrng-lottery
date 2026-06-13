# Opus Design Proposals: QRNG Lottery

Opus 4.8 read the design handoff and frontend files, then returned these four faithful frontend/design improvement proposals. The focus is to deepen the current paper/ink/carnival lottery-machine language without redesigning from scratch.

## 1. Collage Layout Lock

### What To Change

Give the skewed cards and scaled/rotated dials the breathing room they already silently demand, so the imperfection reads as intentional collage instead of accidental overflow.

- In `lottery.css`, the dial labels hover/check to `transform: scale(1.2) rotate(+/-15deg)`, and `bid-card` / `past-card` carry `transform: rotate(-2deg)` plus `box-shadow: -5px -5px black`.
- None of these are accounted for in the `inner-column` track sizing, so at roughly 1160px the right column's scaled dials and offset shadows push past the `--standard: 1140px` clamp and get sheared by `body { overflow-x: hidden }`.
- Add an inner gutter so rotated cards and shadows live inside the clamp.
- Constrain the dial `ul` so a scaled corner dial never exceeds the grid cell.
- Add a mobile breakpoint under 600px that explicitly orders and sizes the board, cards, instructions, and countdown without relying on hidden overflow.

### Why It Deepens The Existing Idea

The skew and rotation are the aesthetic. The bug is that they can be clipped, which makes the handmade style look broken rather than deliberate. Locking the collage lets the imperfect geometry survive intact at every width.

### Key Files Likely Touched

- `frontend/src/styles/structure.css`
- `frontend/src/styles/lottery.css`
- `frontend/src/styles/site.css`
- `frontend/src/components/LotteryApp/Lottery.jsx`, only if a wrapper class is needed

### How To Verify Visually

- Desktop at 1140px, 1160px, and 1280px: hover/select corner dials, especially top-right; no shearing at the right edge.
- Tablet 600-925px: existing 12-column grid still reads intentionally.
- Mobile around 390px: no horizontal scrollbar; all five dial columns fit.
- Temporarily disable `overflow-x: hidden` in devtools and confirm nothing actually overflows.

## 2. Punched And Shaken Lottery Slips

### What To Change

Make `ROLL` and number selection feel like physical paper slips being punched and shaken, replacing the stock shake with motion that uses the motifs already in the app.

- Re-time `handleRoll` so the whole dial board briefly shuffles first.
- Stagger the five selected numbers so they punch in one at a time instead of landing all at once.
- Reuse the existing `jolt`, `jelly`, `joltalt`, red/cyan ink layers, and checked-state pseudo-elements for selected dials.
- Wire the existing `stamp.mp3` asset to the roll-result landing for a punch/stamp sound.

### Why It Deepens The Existing Idea

The handmade ink-stamp vocabulary already exists, but today it mostly fires on hover. Routing roll and selected states through the same jolt/skew language makes the dials feel like one consistent physical object.

### Key Files Likely Touched

- `frontend/src/components/LotteryApp/Lottery.jsx`
- `frontend/src/styles/animation.css`
- `frontend/src/styles/lottery.css`

### How To Verify Visually

- Click `ROLL` repeatedly: the board shuffles, then five results land in a stagger.
- Select and deselect manually: ink layers fire on checked state, audio plays once per pick.
- Tablet and mobile: roll motion stays inside the layout from proposal 1.
- Reduced motion: shake/jelly collapse to a simple snap.

## 3. Receipt-Printing Contract Ritual

### What To Change

Turn the loading/contract moment from large text plus spinning stars into a receipt/contract-confirmation print.

- Reframe the transaction state surface as a printed slip on the existing paper texture.
- Make the transaction message type or print line by line.
- Reduce the stars from infinite spinner to a stamped seal that lands once when a step completes.
- Use `steps()` deliberately so the motion reads as mechanical printing.
- Fix dev-only asset references such as `/src/assets/stars.svg` so the seal renders correctly in production builds.

### Why It Deepens The Existing Idea

The stamp, print, paper, and star motifs are the project's strongest physical language. A contract confirmation should feel like the machine printing proof, not like a generic loading screen.

### Key Files Likely Touched

- `frontend/src/components/LotteryApp/Loading.jsx`
- `frontend/src/styles/site.css`
- `frontend/src/assets/`
- `frontend/public/`, if assets are moved for stable production references

### How To Verify Visually

- Trigger submit and reset/draw flows: the contract state prints line by line.
- The seal lands once on completion, then the overlay fades.
- `yarn build` plus preview: no broken seal image.
- Mobile 390px: text stays on the slip.
- Reduced motion: print appears instantly and no infinite rotation remains.

## 4. Intentional Motion And Comfort Pass

### What To Change

Tame perpetual jitter and stock entrances so the chaos reads as choreographed, then add motion comfort.

- Calm or settle the forever-running `passiveSkew` on all 50 dials.
- Rework the long `slide-in-left/right/top` entrances into shorter "dealt onto the table" motions.
- Preserve the existing stagger delays, but tighten travel distance and skew.
- Add a single `@media (prefers-reduced-motion: reduce)` block that disables infinite jitter, heartbeat, loading rotation, and heavy roll shake.

### Why It Deepens The Existing Idea

Playful chaotic motion is core, but constant motion and stock entrances make the UI feel unfinished. Letting motion settle keeps the carnival energy while making the app feel more polished and demoable.

### Key Files Likely Touched

- `frontend/src/styles/animation.css`
- `frontend/src/styles/lottery.css`
- `frontend/src/styles/site.css`
- `frontend/src/components/LotteryApp/BidCard.jsx`, if the heartbeat class is gated

### How To Verify Visually

- Load the app: cards deal in with a tight stagger, not 1000px slides.
- Idle dial jitter remains present but calmer.
- With OS reduced motion enabled: no infinite spin/jitter; entrances are instant or opacity-only; `ROLL` snaps results without shake.
- Pot value changes still pop without competing against constant background motion.

## Priority Recommendation

Implement **Collage Layout Lock** first. Layout fixes should precede more effects, and the right-edge clipping plus mobile overflow are the most visible "this looks broken" problems. Once the collage is stable, the punched-slip motion, receipt ritual, and calmer motion pass can deepen the same visual language without fighting the frame.

After that, implement **Receipt-Printing Contract Ritual**. It gives the biggest demo payoff because it turns the Web3/contract state into a physical proof moment while also fixing fragile asset handling.
