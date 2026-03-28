# UI Test Cases

## Test Suite
Automated suite location: `tests/ui.spec.js`

## Preconditions
- Dependencies installed via `npm install`.
- Browser installed via `npx playwright install chromium`.
- Tests run from repository root.
- Local app served at `http://127.0.0.1:4173` (auto-started by Playwright `webServer` config).

## Test Cases

### TC-001: Home page loads with heading
- Requirement Mapping: FR-1
- Steps:
  1. Navigate to `/`.
  2. Locate heading role with name `Welcome to UI Test Sandbox`.
- Expected Result:
  - Heading is visible.

### TC-002: Guest greeting for empty input
- Requirement Mapping: FR-3, FR-4, FR-6
- Steps:
  1. Navigate to `/`.
  2. Click `Generate greeting` without entering a name.
  3. Read text from `#greeting-output`.
- Expected Result:
  - Output equals `Hello, Guest!`.

### TC-003: Personalized greeting for entered name
- Requirement Mapping: FR-2, FR-3, FR-5, FR-6
- Steps:
  1. Navigate to `/`.
  2. Enter `Rahul` in `#name-input`.
  3. Click `Generate greeting`.
  4. Read text from `#greeting-output`.
- Expected Result:
  - Output equals `Hello, Rahul!`.

## Coverage Notes
- Current suite validates the primary happy path and empty-input fallback.
- Additional useful future coverage:
  - Whitespace-only input handling (`"   "` should map to guest).
  - Special characters in names.
  - Keyboard-only interaction flow and focus behavior.
