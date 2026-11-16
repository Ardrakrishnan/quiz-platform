# Quiz Platform

A responsive quiz creation and participation application built with React, Vite, Redux Toolkit (with thunk middleware), React Router and Material UI.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173).

## Build and test
```bash
npm run build
npm run test:run
```

## Features
- Home dashboard with Create New Quiz, My Quizzes and Play Quiz navigation.
- Create quizzes with single-choice MCQ, multiple-choice MCQ, short-answer and description question types.
- Add/remove options and questions; validate quiz title, question length and minimum option count.
- Save quizzes in browser LocalStorage under the required `question` key (an array).
- List, activate/deactivate, edit and delete quizzes.
- Enter a participant name and play active quizzes.
- One-question-at-a-time navigation, score calculation and results page.
- Responsive Material UI layout.
- Example unit/component tests with React Testing Library and Vitest.

## Notes
- This version intentionally uses LocalStorage; no backend is required yet.
- Data is stored in the browser that runs the app. Clearing browser storage removes saved quizzes.
- The play flow selects one active quiz and presents up to 10 questions. If a quiz has fewer than 10 questions, all available questions are played.
- Authentication is a lightweight participant-name entry flow, not production account authentication.

## Suggested GitHub deployment
1. Create a public GitHub repository.
2. Push this project.
3. For deployment, run `npm run build` and publish the `dist` directory using Netlify, Vercel or GitHub Pages (configure the SPA fallback for client-side routes).
