# Angular Checkout Animations (`@fullstack.learn`)

Interactive checkout demo built with **Angular 22.3**, **Signals**, and **`@angular/animations`** for the `@fullstack.learn` Instagram reel.

## What it builds

- **Live 3D credit card preview** that formats the card number, detects a demo card brand (`NOVA`, `ORBIT`, `AXIS`), and flips to the back when the CVC field is focused.
- **Multi-stage checkout flow** (`form` → `processing` → `done`) driven by Angular Signals (`signal` and `computed` in `src/app/app.ts`).
- **Three animation triggers** in `src/app/checkout.animations.ts`:
  1. `cardFlip` — `state` + `transition('front<=>back')` 3D `rotateY(180deg)` card flip on CVC focus/blur.
  2. `checkoutFlow` — `group()` + `query()` to slide the form out while centering the card on Pay.
  3. `successPop` — `:enter` transition combining `keyframes()` (bounce check badge) and `stagger()` (fade-in confirmation lines).

## Run locally

Requires **Node.js 22+** (Angular 22.3).

```bash
npm install
npm start
```

Then open [http://localhost:4200/](http://localhost:4200/).

To create a production build:

```bash
npm run build
```

## Project structure

- `src/app/checkout.animations.ts` — `cardFlip`, `checkoutFlow`, and `successPop` animation triggers
- `src/app/app.ts` — standalone `App` component with signals (`name`, `number`, `expiry`, `cvc`, `flipped`, `stage`) and computed values (`flow`, `cardNumber`, `brand`)
- `src/app/app.html` & `src/app/app.css` — checkout UI and 3D card styling
- `src/app/app.config.ts` — registers `provideAnimations()`

## Note on `@angular/animations` in Angular 22.3

This demo uses `@angular/animations` (`provideAnimations()`), which builds and runs cleanly on Angular 22.3. Angular deprecated `@angular/animations` in v20.2 in favor of `animate.enter` / `animate.leave` (CSS and Web Animations) with intent to remove it in v23, so for new production apps targeting Angular 23+, prefer native CSS/Web Animations with `animate.enter` and `animate.leave`.

---

Built for **[@fullstack.learn](https://instagram.com/fullstack.learn)** — follow for Angular, JavaScript, and frontend engineering reels.
