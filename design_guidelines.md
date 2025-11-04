# AI Tutor with Live2D Avatar - Design Guidelines

## Design Approach

**Hybrid Approach**: Drawing from educational platforms (Duolingo, Khan Academy) for engagement + conversational AI interfaces (ChatGPT) for chat patterns + Material Design principles for structure and accessibility.

**Core Philosophy**: Create a welcoming, distraction-free learning environment where the Live2D avatar serves as an engaging companion without overwhelming the educational content.

---

## Layout System

### Primary Layout Structure
**Split-Screen Design** (Desktop):
- Left Panel (40% width): Live2D Avatar display with stage-like presentation
- Right Panel (60% width): Chat interface with message history and input

**Mobile/Tablet Stack**:
- Avatar panel collapses to top (fixed height ~40vh)
- Chat interface flows below, full width

### Spacing System
Use Tailwind units: **4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Message gaps: gap-4 to gap-6
- Inline spacing: px-4, mx-6

---

## Typography

### Font Families
**Primary**: Inter (via Google Fonts) - Clean, modern, highly readable
**Accent**: Fredoka (via Google Fonts) - Friendly, approachable for headings

### Hierarchy
- **App Title/Header**: Fredoka, 2xl-3xl, semibold
- **Avatar Status Text**: Inter, sm, medium (e.g., "Listening...", "Speaking...")
- **User Messages**: Inter, base, normal
- **AI Messages**: Inter, base, normal
- **Educational Content** (Math/Physics): Inter, base, code blocks with monospace font
- **Input Placeholder**: Inter, sm, text-gray-500
- **Timestamps**: Inter, xs, text-gray-400

---

## Component Library

### 1. Header Bar
- Full-width top bar with app branding
- Left: "AI Tutor" title with graduation cap icon (Heroicons)
- Right: Subject selector dropdown (Math, Physics, Chemistry, Biology)
- Clean, minimal design with subtle bottom border

### 2. Avatar Panel (Left Side)
**Container**:
- Full-height panel with centered avatar display
- Gradient background (subtle, calming tones)

**Avatar Stage**:
- Centered Pixi.js canvas (700x700px recommended)
- Live2D model display area with subtle drop shadow
- Status indicator below avatar: circular pulse animation when speaking

**Controls Below Avatar**:
- Microphone toggle button (voice input - future feature)
- Volume slider for TTS output
- Avatar emotion selector (happy, neutral, thinking)

### 3. Chat Interface (Right Side)

**Message Container**:
- Scrollable area with auto-scroll to latest
- Maximum width constraint (max-w-3xl) for readability
- Message bubbles with distinct styles:

**User Messages**:
- Aligned right
- Rounded bubbles with solid background
- Tail pointing right
- User icon (small circle with letter)

**AI Messages**:
- Aligned left
- Rounded bubbles with border and light fill
- Tail pointing left
- AI avatar icon (robot/graduation cap)
- Code blocks for mathematical formulas (syntax highlighted)
- Inline LaTeX rendering for equations

**Special Message Types**:
- Loading state: Animated typing indicator (three dots)
- Error messages: Warning icon with helpful recovery text
- Welcome message: Larger, centered card on initial load

### 4. Input Area (Bottom of Chat)

**Composition**:
- Fixed bottom position with backdrop blur effect
- Text input field with multi-line support (textarea, auto-expand)
- Send button (paper plane icon) on right
- Voice input button (microphone icon) on left
- Character count indicator (subtle, appears when typing)

**Input Field Design**:
- Rounded corners (rounded-2xl)
- Border with focus ring animation
- Placeholder: "Ask me anything about Math, Physics..."
- Height: Starts at h-12, expands to max-h-32

### 5. Educational Content Rendering

**Math/Physics Specific Elements**:
- Equation blocks: Centered, larger text, monospace
- Step-by-step solutions: Numbered list with clear visual hierarchy
- Diagrams placeholder: Image containers with lazy loading
- Formula highlighting: Inline code style with accent background

### 6. Auxiliary Components

**Quick Topics Cards** (Above Input):
- Horizontal scrollable chips
- Pre-written questions like "Explain quadratic equations", "What is Newton's law?"
- Click to auto-populate input

**Session History** (Collapsible Sidebar):
- Previous chat sessions
- Date grouping
- Search functionality
- Delete/archive actions

---

## Animations & Interactions

### Avatar Synchronization
- Mouth movements synced to TTS audio playback
- Idle breathing animation (subtle)
- Eye blink every 3-5 seconds
- Head tilt during "thinking" state

### Chat Animations
- Message slide-in from respective sides
- Smooth scroll to new messages
- Typing indicator fade-in/out
- Send button scale on click

### Transitions
- Panel resize: smooth 300ms ease-in-out
- Message appearance: 200ms ease-out
- Input focus: 150ms border color transition

**Keep animations subtle** - educational focus over flashy effects

---

## Accessibility

- Keyboard navigation: Tab through input, send button, topics
- Screen reader announcements for new AI messages
- ARIA labels on all interactive elements
- Focus indicators visible and clear (2px offset ring)
- Contrast ratios: Minimum 4.5:1 for all text
- Voice input alternative to typing

---

## Responsive Behavior

**Desktop (≥1024px)**:
- Split-screen layout as described
- Avatar panel fixed width (40%)

**Tablet (768px - 1023px)**:
- Avatar panel collapses to top drawer (expandable)
- Chat interface full width
- Input area remains fixed bottom

**Mobile (<768px)**:
- Avatar minimized to floating button (bottom-left corner)
- Expands to full-screen modal on click
- Chat interface optimized for single column
- Quick topics stack vertically

---

## Visual Hierarchy Principles

1. **Avatar as Companion**: Visible but not dominating - supporting the learning experience
2. **Content First**: Educational responses are the star, formatting enhances comprehension
3. **Clear Conversation Flow**: Distinct user/AI message styles prevent confusion
4. **Guided Interaction**: Input area always accessible, quick topics suggest engagement
5. **Minimal Chrome**: Reduce UI clutter, maximize content area

---

## Icon Library
**Heroicons** (via CDN) - consistent, clean iconography
- Graduation cap, microphone, speaker, send arrow, ellipsis menu, search, trash

---

## Special Considerations

### Loading States
- Avatar panel: Skeleton loader while Live2D model loads
- Chat: "Preparing your tutor..." with animated progress bar
- TTS generation: Pulsing speaker icon

### Error Handling
- API failures: Friendly error card with retry button
- Audio playback issues: Fallback to text-only mode with notification
- Avatar loading failure: Static placeholder image with educational icon

### Performance
- Lazy load chat history (virtualized scrolling for 100+ messages)
- Optimize Live2D model (single model, efficient rendering)
- Preload common TTS responses (greetings, confirmations)

---

This design creates an **engaging, professional educational experience** where technology enhances learning without creating cognitive overload. The Live2D avatar provides personality and engagement while the chat interface maintains clarity and usability for serious study.