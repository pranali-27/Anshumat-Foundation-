# Assessly — Assessment Intelligence Platform

A responsive assessment platform starter built from the supplied Design System Notes v1.0. It includes a candidate assessment experience and lightweight admin views.

## Features

- One-question-at-a-time candidate assessment with single choice, multiple choice and 5-point Likert controls.
- Visible countdown timer with a text + warning-colour state at five minutes.
- Numbered question navigator with current, answered, flagged and unanswered states.
- Autosave feedback (saved / saving / failure) and API persistence.
- Review screen and confirmation step that explicitly states the unanswered count.
- Admin overview, searchable/filterable question bank and blueprint quota editor.
- Live available-versus-required quota validation; short rows turn red.
- Results section totals and dimension bars with an “Illustrative only” label and required non-clinical disclaimer.
- Responsive layout and accessible labels for key controls.

## Requirements

- Node.js 18+ and npm

## Run locally

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:4000/api/health

The development command starts the Vite frontend and Express API together. Response data is persisted in `server/data/responses.json`.

## Build

```bash
npm run build
```

## API

- `GET /api/health` — health check
- `GET /api/responses/:candidateId` — retrieve saved responses
- `PUT /api/responses/:candidateId` — save an answer or flagged state. Body: `{ "questionId": "1", "answer": "..." }` or `{ "questionId": "1", "flagged": true }`
- `POST /api/submissions` — submit answers. Body: `{ "candidateId": "demo-candidate", "answers": {}, "unansweredCount": 0 }`

## Project structure

```text
assessment-intelligence-platform/
├── client/
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── styles.css
├── server/
│   ├── data/responses.json
│   └── index.js
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Design decisions

- Calm neutral surfaces, high-contrast text and restrained blue accents keep candidate attention on the question.
- Status is never communicated through colour alone: timer warning includes text, navigator states have labels/legend and save state has text.
- Personality/preference answers are not marked right or wrong.
- Psychometric visualizations are explicitly illustrative and are not clinical or diagnostic outputs.
- Admin data uses dense tables and clear filters; blueprint quota shortages are visible before publishing.

## Production considerations

This is a runnable starter/demo, not a production assessment service. Before deployment, add authentication and role-based authorization, per-candidate access controls, a relational database, server-side timer enforcement, audit logging, rate limiting, input schema validation, CSRF protection where applicable, secure session handling, and automated tests. Replace illustrative result values with validated scoring rules reviewed by qualified assessment specialists. Do not use the demo dimensions for hiring or clinical decisions.
