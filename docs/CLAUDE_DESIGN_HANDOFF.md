# Claude Design Handoff: QRNG Lottery

## Purpose

Generate four faithful frontend/design improvement proposals for the current QRNG Lottery app.

This is a design/frontend refinement pass only. Do not implement changes yet. Do not redesign the product from scratch. The goal is to smooth out and deepen the existing visual ideas so the app feels more polished, intentional, and demoable while staying recognizably itself.

## Repo

- Path: `/Users/burooj/Projects/qrng-lottery`
- App: Vite + React frontend under `frontend/`
- Main UI entry points:
  - `frontend/src/App.jsx`
  - `frontend/src/components/LotteryApp/`
  - `frontend/src/store/`
  - `frontend/src/styles/`

## Canonical Framing

Treat this project as a unified QRNG Lottery history:

1. early static lottery prototype
2. standalone app
3. React/Web3/API3 QRNG contract-backed app
4. current demoable QRNG Lottery

The original API3/live contract infrastructure is gone, so the app should remain a faithful demo of the original Web3/contract experience rather than a live dApp. Do not frame the repo as reconstructed, migrated, or separate from itself.

## Current Visual Direction

Preserve and deepen the current handmade lottery-machine feel:

- paper, ink, carnival, and zine-like energy
- skewed panels and imperfect geometry
- stark red / black / white / yellow contrast
- animated number dials
- click/stamp/star audio and visual motifs
- bold display type
- playful, chaotic motion

The app should feel like the same object, just more finished.

Do not replace this with a generic casino dashboard, Web3 SaaS UI, neon template, glassmorphism panel set, or clean fintech interface.

## Known Design/Frontend Issues To Consider

These were observed during investigation:

- The desktop lottery grid can clip off the right edge around a roughly 1160px viewport.
- Mobile has horizontal scroll and the main content order can feel awkward: instructions can dominate before the playable board.
- Some current animations are stock-ish and abrupt; they work as sketches but could be made more intentional.
- The loading overlay currently communicates transaction states with large text and spinning stars, but it does not yet feel like a polished contract/wallet moment.
- The existing visual language is strongest when it feels handmade and physical: stamped, printed, jittered, shuffled, rolled, scratched, or punched.
- Layout fixes should probably come before adding more effects.

## Important Constraint

Do not invent new ideas just to be impressive. Improve the ideas already here.

Good direction:

- "Make the current dials feel like physical lottery slips being punched and shaken."
- "Make the existing skewed cards feel like a controlled paper collage instead of accidental overflow."
- "Make the loading/stars/stamp motif feel like a receipt-printing or contract-confirmation ritual."

Bad direction:

- "Replace it with a futuristic glass Web3 app."
- "Add a whole new mascot/story/world."
- "Switch to a polished casino sportsbook dashboard."
- "Create a landing page."

## Requested Output

Return exactly four frontend/design improvement proposals.

For each proposal include:

1. **Name**
2. **What To Change**
3. **Why It Deepens The Existing Idea**
4. **Key Files Likely Touched**
5. **How To Verify Visually**

Keep each proposal concrete and implementable. Mention specific components/styles where useful.

End with a short priority recommendation: which proposal should be implemented first, and why.

## Suggested Areas To Inspect

- `frontend/src/components/LotteryApp/Lottery.jsx`
- `frontend/src/components/LotteryApp/Loading.jsx`
- `frontend/src/components/LotteryApp/BidCard.jsx`
- `frontend/src/components/LotteryApp/PastWinners.jsx`
- `frontend/src/components/LotteryApp/RulesCard.jsx`
- `frontend/src/styles/lottery.css`
- `frontend/src/styles/components.css`
- `frontend/src/styles/animation.css`
- `frontend/src/styles/site.css`
- `frontend/src/styles/typography.css`
- `frontend/src/assets/`
- `frontend/public/`

## Verification Expectations

For any proposed design work, include visual verification ideas across:

- desktop viewport
- tablet or mid-width viewport
- mobile viewport around 390px wide
- interaction states: hover, selected numbers, roll animation, submit/loading overlay
- reduced-motion or motion-comfort considerations where relevant

If implementation follows later, it should be verified with local browser screenshots, not only `yarn build`.
