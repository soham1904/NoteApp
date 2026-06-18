📓 NoteTag — Notes App with Tagging

A fully client-side React + Vite web application for creating, organizing, and searching notes using a tag-based system. No backend required — all data persists in the browser via localStorage.


Features


Create notes — title, content, and multiple tags
Edit & delete notes with confirmation
Tag filtering — click any tag to filter the note list instantly
Full-text search — searches across title, content, and tags simultaneously
Persistent storage — notes survive page refresh via localStorage
Colour-coded tags — each unique tag gets a consistent colour
Form validation — title and body are required before saving
Dark mode — follows your OS preference automatically
Responsive — works on mobile, tablet, and desktop
Accessible — ARIA roles, labels, and keyboard navigation



Tech Stack

TechnologyPurposeReact 18Component-based UIVite 5Build tool and dev serverVanilla CSSAll styling — no UI librarieslocalStorageClient-side data persistenceJavaScript ES2022+Application logic and utilities


Setup & Run Instructions

Prerequisites


Node.js v18+ — https://nodejs.org
npm v9+ (bundled with Node.js)
Git — https://git-scm.com


Step 1 — Clone the repository

bashgit clone https://github.com/your-username/notetag.git
cd notetag

Step 2 — Install dependencies

bashnpm install

Step 3 — Start the development server

bashnpm run dev

Open http://localhost:5173 in your browser.

Step 4 — Build for production (optional)

bashnpm run build

Output is written to the dist/ folder. Deploy to Vercel, Netlify, or GitHub Pages.


Project Structure

notetag/
├── public/
├── src/
│   ├── components/
│   │   ├── EmptyState.jsx     # Empty list state UI
│   │   ├── NoteCard.jsx       # Individual note card
│   │   ├── NoteModal.jsx      # Create / edit modal with tag input
│   │   ├── SearchBar.jsx      # Search input + result count
│   │   └── TagFilter.jsx      # Tag filter pill row
│   ├── utils/
│   │   ├── noteHelpers.js     # filterNotes, getAllTags, formatDate
│   │   ├── storage.js         # localStorage read / write with defaults
│   │   └── tagColors.js       # Deterministic tag colour palette
│   ├── App.css                # Full design system (tokens, layout, dark mode)
│   ├── App.jsx                # Root component and state management
│   └── main.jsx               # React entry point
├── index.html
├── package.json
└── vite.config.js


Assumptions


No backend or database required — localStorage is sufficient for this scope
Single user per browser session — no authentication needed
Notes are identified by Date.now() timestamp IDs
Tags are stored as lowercase hyphenated strings — special characters are sanitised on input
Dark mode follows the OS preference — no manual toggle
No pagination needed — note count stays manageable in localStorage
The "checkout" step in the brief refers to deliverable submission, not e-commerce



AI-Assisted Development Note

Tools Used


Claude (Anthropic) — Primary assistant for architecture, component design, CSS design system, bug diagnosis, and documentation
ChatGPT (OpenAI) — Secondary reference for React patterns and localStorage edge cases
GitHub Copilot — In-editor autocomplete for repetitive JSX and utility boilerplate


How AI Helped

AI tools dramatically accelerated development by handling scaffolding and boilerplate that typically consumes the most time in a new project. I used Claude to design the overall component architecture and build a CSS custom-property design token system that supports both light and dark mode without any external library. Rather than spending hours on layout decisions and colour choices, I described what I needed in plain English and refined the output through short feedback loops. This kept my focus on the product logic: tag filtering, search behaviour, form validation, and localStorage persistence. GitHub Copilot complemented this by autocompleting repetitive patterns inside VS Code, such as the tag colour palette mapping and the filterNotes utility.

The most valuable aspect of AI-assisted development was catching and fixing bugs through conversation rather than lengthy debugging sessions. For example, when the tag filter bar was only displaying one tag instead of all tags, I described the symptom to Claude and received an immediate diagnosis: the default notes in localStorage had only one tag each, and the getAllTags utility needed a defensive Array.isArray guard. The fix was applied in under a minute. The key skill I applied throughout was evaluating AI output critically — reviewing every code block, understanding each decision, and asking follow-up questions when something was unclear, rather than blindly accepting generated code.

Challenges


localStorage stale data — default seed data didn't update after I added more notes. Fixed by clearing localStorage in DevTools and versioning the storage key.
Stale closure in handleDelete — the notes array in the useCallback closure was out of date. Fixed with a functional state update pattern.
Tag colour consistency — ensuring the same tag always maps to the same colour. Fixed with a deterministic hash function over the tag string.
AI output validation — generated code occasionally missed edge cases. Every output was manually reviewed and tested before being kept.
