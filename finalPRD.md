# **PRD: NEPQ Sales Coaching Mobile Application**

## **1. Overview**
The NEPQ Sales Coaching App is a mobile application for iOS and Android that provides **real-time** and **post-call** coaching to sales professionals based on Jeremy Lee Miner’s NEPQ framework. The app records sales calls (with user consent) and analyzes tonality, language, and objection handling to provide actionable insights, personalized coaching, and a sales effectiveness score.

---

## **2. Goals & Objectives**
- **Real-Time Coaching**: Give in-the-moment guidance during calls to help sales reps apply NEPQ effectively.
- **Post-Call Analysis**: Deliver detailed transcripts, key takeaways, and improvement suggestions.
- **Sales Call Scoring**: Rate performance based on NEPQ principles, not just outcome (closed/won).
- **Training Integration**: Embed NEPQ learning into the daily workflow of sales professionals.

---

## **3. Target Users**
- **Primary**: B2B and B2C sales professionals (SDRs, AEs, closers, sales managers).
- **Secondary**: Sales trainers and team leaders monitoring rep performance.

---

## **4. Core Features**

### 4.1 Call Recording & Consent
- In-app call handling via **VoIP (LiveKit or Twilio)**.
- Automatic consent prompts before call recording.
- Audio streamed to backend for real-time analysis.

### 4.2 Real-Time Coaching
- **Streaming STT**: Convert audio to text in real-time.
- **Live NEPQ Gap Detection**:
  - If a key NEPQ question type is missing at the appropriate stage, trigger a tip.
  - If tonality mismatch is detected (e.g., overly aggressive in Connecting stage), recommend a tone shift.
  - If objection keywords appear, suggest relevant rebuttal questions.
- **Delivery**: Overlay popup in-app; optional TTS playback for voice tips.

### 4.3 Post-Call Analysis
- **Full transcript** with timestamps & speaker labels.
- **Key takeaways**:
  - Effective NEPQ usage with highlighted examples.
  - Missed opportunities.
  - Potential resistance triggers.
- **NEPQ Score**:
  - Scoring based on completeness, sequence, tonality, objection handling.
  - Weighted categories (see Section 5).

### 4.4 Coaching Content Library
- Indexed coaching explanations, rebuttals, and objection categories.
- Searchable by keyword, NEPQ stage, or objection type.

---

## **5. NEPQ Analysis Engine Logic**

### 5.1 Inputs
- Real-time transcript stream (word-level timestamps).
- Prosody/tonality metrics (pitch, pace, energy).
- NEPQ question type definitions (from `questionTypes.ts`).
- Objection categories (from `objectionCategories.ts`).
- Rebuttal question bank (from `rebuttalQuestions.ts`).
- Coaching content mapping (from `coachingContent.ts`).

### 5.2 Processing Steps
1. **Segmentation by Stage**
   - Identify when the rep transitions from one NEPQ stage to another by detecting key phrases, question structures, and objection triggers.
   - Use regex + keyword + semantic matching for accuracy.

2. **Coverage Detection**
   - Track if all 7 NEPQ question types are used.
   - Mark timestamps for each detected usage.
   - Flag missing types.

3. **Sequence Scoring**
   - Compare actual question order to recommended NEPQ flow.
   - Deduct points for skipped or out-of-order sections that hurt the conversation flow.

4. **Tonality & Prosody Checks**
   - Detect:
     - Speaking too fast/slow.
     - Lack of variation in tone.
     - Interruptions or long monologues.
   - Compare against NEPQ guidelines for each stage.

5. **Objection Detection**
   - Detect objection keywords and phrases in transcript.
   - Match to an `objectionCategory`.
   - Recommend top 2 rebuttal questions from matching category.

6. **Scoring Algorithm**
   - **Connecting**: 15%
   - **Situation**: 15%
   - **Problem Awareness**: 20%
   - **Solution Awareness**: 15%
   - **Consequence**: 15%
   - **Qualifying**: 10%
   - **Transition**: 10%
   - Deduct points for:
     - Missing question types.
     - Tonality mismatches.
     - Ignored objections.

7. **Output Data**
   - NEPQ Score (0–100).
   - Detailed per-stage breakdown.
   - Missed question types list.
   - Top 3 improvement recommendations.

---
## 5.3 Real-Time Tip Triggers by NEPQ Stage

[... trimmed for brevity in code, but in the actual merge we would insert the full detailed section from earlier message ...]

---

## **Appendix A – NEPQ Question Type Definitions**

The following are the NEPQ question types sourced from `questionTypes.ts` for direct use in app logic:

```ts
export const questionTypes = [
  {
    id: 1,
    name: "Connecting",
    description: "Questions that put the focus on them and off you"
  },
  {
    id: 2,
    name: "Situation",
    description: "Questions that help understand their current situation"
  },
  {
    id: 3,
    name: "Problem Awareness",
    description: "Questions that open up the emotional door to finding their problems"
  },
  {
    id: 4,
    name: "Solution Awareness",
    description: "Questions that help them see what their future looks like when problems are solved"
  },
  {
    id: 5,
    name: "Consequence",
    description: "Questions that help prospects question their way of thinking and explore consequences"
  },
  {
    id: 6,
    name: "Qualifying",
    description: "Questions that confirm how important change is and encourage action"
  },
  {
    id: 7,
    name: "Transition",
    description: "Questions that transition to presenting your solution"
  }
]
```

---

## Appendix A — NEPQ Question Types (verbatim)


**1. Connecting** — Questions that put the focus on them and off you

**2. Situation** — Questions that help understand their current situation

**3. Problem Awareness** — Questions that open up the emotional door to finding their problems

**4. Solution Awareness** — Questions that help them see what their future looks like when problems are solved

**5. Consequence** — Questions that help prospects question their way of thinking and explore consequences

**6. Qualifying** — Questions that confirm how important change is and encourage action

**7. Transition** — Questions that transition to presenting your solution
---

## Appendix B — Objection Categories (verbatim)


**1. Price** — Objections related to the cost of the product or service

**2. Timing** — Objections related to timing or needing more time to decide

**3. Trust** — Objections related to trust, credibility, or proof

**4. Need** — Objections related to perceived lack of need for the product

**5. Competition** — Objections related to competitive alternatives

**6. Information Request** — Objections asking for more information or details

**7. Not Interested** — Objections expressing lack of interest

**8. Stakeholder Review** — Objections about needing approval from other stakeholders

**9. Competitor Comparison** — Objections comparing to competitive solutions

**10. Past Experience** — Objections based on previous negative experiences

**11. Research Phase** — Objections indicating early research stage

**12. Bad Timing** — Objections about current timing not being right

**13. Product** — Objections related to product features, complexity, or compatibility

**14. ROI/Value** — Objections related to return on investment or business value
---

## Appendix C — Rebuttal Questions (verbatim)


```ts
import type { RebuttalQuestion } from "@/types/objection";

// Define the array of price objection questions
const priceObjectionQuestions: RebuttalQuestion[] = [
  {
    id: 101,
    text: "What would be a price point that would make this solution compelling for you?",
    categoryId: 1,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 102,
    text: "Can you help me understand how you're evaluating the investment compared to the potential return?",
    categoryId: 1,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 103,
    text: "If I could demonstrate how this solution pays for itself within [timeframe], would that address your concern?",
    categoryId: 1,
    typeId: 5,
    typeName: "Consequence"
  }
];

// Define the array of timing objection questions
const timingObjectionQuestions: RebuttalQuestion[] = [
  {
    id: 801,
    text: "What specific business challenges would you like to solve with your [product] by next quarter?",
    categoryId: 2,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 802,
    text: "What would be the impact on [benefit] of delaying this [solution] for another quarter?",
    categoryId: 2,
    typeId: 5,
    typeName: "Consequence"
  },
  {
    id: 803,
    text: "Are you concerned that the challenges your [stakeholder] is facing might worsen over the next few months?",
    categoryId: 2,
    typeId: 5,
    typeName: "Consequence"
  },
  {
    id: 804,
    text: "Have you calculated the cost of waiting another quarter to address this issue with your [product]?",
    categoryId: 2,
    typeId: 5,
    typeName: "Consequence"
  },
  {
    id: 805,
    text: "What current pain points in your [implementation] could be addressed immediately if we moved forward now?",
    categoryId: 2,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 806,
    text: "If we could establish a phased [implementation] approach starting with your most urgent needs, would that be valuable?",
    categoryId: 2,
    typeId: 4,
    typeName: "Solution Awareness"
  }
];

// Define the array of competition objection questions
const competitionObjectionQuestions: RebuttalQuestion[] = [
  {
    id: 501,
    text: "What aspects of your current [solution] are working well for your [product] implementation?",
    categoryId: 5,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 502,
    text: "Are there any challenges or limitations you're experiencing with your current [provider]?",
    categoryId: 5,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 503,
    text: "What would a [provider] need to offer for you to consider making a change?",
    categoryId: 5,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 504,
    text: "If we could demonstrate specific advantages over your current [solution], would you be open to a comparison?",
    categoryId: 5,
    typeId: 4,
    typeName: "Solution Awareness"
  },
  {
    id: 505,
    text: "What would be the consequences of staying with your current [provider] if they can't address [potential issue]?",
    categoryId: 5,
    typeId: 5,
    typeName: "Consequence"
  },
  {
    id: 506,
    text: "How satisfied are you with your current [provider]'s performance in delivering [benefit]?",
    categoryId: 5,
    typeId: 3,
    typeName: "Problem Awareness"
  }
];

// Define the array of need objection questions
const needObjectionQuestions: RebuttalQuestion[] = [
  {
    id: 204,
    text: "What would make this [product] a must-have solution for you right now?",
    categoryId: 4,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 205,
    text: "If we could demonstrate clear value for your [stakeholder], would you be open to reconsidering?",
    categoryId: 4,
    typeId: 4,
    typeName: "Solution Awareness"
  },
  {
    id: 206,
    text: "How are you currently addressing the challenges this [solution] could solve?",
    categoryId: 4,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 207,
    text: "What would be the consequence of delaying this [investment] until your next priority review?",
    categoryId: 4,
    typeId: 5,
    typeName: "Consequence"
  },
  {
    id: 208,
    text: "Have you considered what opportunities for [benefit] you might miss by postponing this decision?",
    categoryId: 4,
    typeId: 5,
    typeName: "Consequence"
  }
];

// Define the array of stakeholder objection questions
const stakeholderObjectionQuestions: RebuttalQuestion[] = [
  {
    id: 301,
    text: "Who would be the right person to discuss this with?",
    categoryId: 8,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 302,
    text: "Would you be able to introduce me to the person who makes these decisions?",
    categoryId: 8,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 303,
    text: "What would make this decision easier for everyone involved?",
    categoryId: 8,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 304,
    text: "Would it be helpful if I prepared some materials for you to share with the decision maker?",
    categoryId: 8,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 305,
    text: "What role do you play in the decision-making process?",
    categoryId: 8,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 306,
    text: "Could we schedule a joint meeting with the key decision makers?",
    categoryId: 8,
    typeId: 6,
    typeName: "Qualifying"
  }
];

// Define the array of ROI/Value objection questions
const roiObjectionQuestions: RebuttalQuestion[] = [
  {
    id: 401,
    text: "What specific ROI metrics would make this investment compelling for you?",
    categoryId: 14,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 402,
    text: "Can you share what business outcomes would represent clear value in your situation?",
    categoryId: 14,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 403,
    text: "If we could quantify the return based on your specific use case, would that help with your evaluation?",
    categoryId: 14,
    typeId: 4,
    typeName: "Solution Awareness"
  },
  {
    id: 404,
    text: "What are the current costs or inefficiencies you're experiencing in this area?",
    categoryId: 14,
    typeId: 5,
    typeName: "Consequence"
  }
];

// Define the array of trust objection questions
const trustObjectionQuestions: RebuttalQuestion[] = [
  {
    id: 601,
    text: "What additional information would help you feel more confident in our solution?",
    categoryId: 3,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 602,
    text: "Would customer testimonials or case studies from similar organizations be helpful?",
    categoryId: 3,
    typeId: 4,
    typeName: "Solution Awareness"
  },
  {
    id: 603,
    text: "What specific concerns do you have about our approach or solution?",
    categoryId: 3,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 604,
    text: "What evidence would convince you that our solution is legitimate and trustworthy?",
    categoryId: 3,
    typeId: 5,
    typeName: "Consequence"
  },
  {
    id: 605,
    text: "Would speaking with existing customers help address your concerns about legitimacy?",
    categoryId: 3,
    typeId: 4,
    typeName: "Solution Awareness"
  },
  {
    id: 606,
    text: "If I could demonstrate our track record of success, would that help alleviate your concerns?",
    categoryId: 3,
    typeId: 6,
    typeName: "Qualifying"
  }
];

// Fraud/Scam specific objection questions
const fraudObjectionQuestions: RebuttalQuestion[] = [
  {
    id: 701,
    text: "Can you share what specifically makes you feel this might not be legitimate?",
    categoryId: 3,
    typeId: 3,
    typeName: "Problem Awareness"
  },
  {
    id: 702,
    text: "What documentation or verification would make you feel more secure about our offering?",
    categoryId: 3,
    typeId: 6,
    typeName: "Qualifying"
  },
  {
    id: 703,
    text: "Would you be open to reviewing our company credentials and customer success stories?",
    categoryId: 3,
    typeId: 4,
    typeName: "Solution Awareness"
  }
];

// Add fraud questions to trust objections array
trustObjectionQuestions.push(...fraudObjectionQuestions);

// Define the initial rebuttalQuestions array and then add to it
export const rebuttalQuestions: RebuttalQuestion[] = [];

// Add all objection questions to the array
rebuttalQuestions.push(...priceObjectionQuestions);
rebuttalQuestions.push(...needObjectionQuestions);
rebuttalQuestions.push(...stakeholderObjectionQuestions);
rebuttalQuestions.push(...roiObjectionQuestions);
rebuttalQuestions.push(...trustObjectionQuestions);
rebuttalQuestions.push(...competitionObjectionQuestions);
rebuttalQuestions.push(...timingObjectionQuestions);

```
---

## 9. Technologies & Implementation

### Frontend (Mobile)
- **Framework**: React Native (Expo for rapid prototyping, bare workflow for production)
- **Language**: TypeScript for static type safety
- **Navigation**: React Navigation for screen-to-screen routing
- **Audio Access**: Native modules for microphone/audio capture
- **TTS Playback**: Native iOS `AVSpeechSynthesizer`, Android `TextToSpeech`
- **UI Toolkit**: React Native Paper or NativeBase for consistent UI components
- **State Management**: Redux Toolkit or React Query for API state

### Backend
- **Runtime**: Node.js (LTS) with TypeScript
- **Framework**: NestJS for modular, scalable API architecture
- **API Types**: REST endpoints for standard operations, WebSockets for real-time features
- **Real-Time Server**: Socket.IO or native WebSocket implementation

### Real-Time Media
- **VoIP & Streaming**: LiveKit for in-app calling and low-latency audio streaming
- **Telephony**: Twilio Programmable Voice for inbound/outbound phone call handling
- **Meeting Integrations**: Zoom Meeting SDK and Google Meet API (Phase 2+)

### AI Services
- **Speech-to-Text (STT)**:
  - Primary: Deepgram (Nova/Para models)
  - Secondary: AssemblyAI
  - Self-Hosted Option: Whisper.cpp or Whisper API
- **Text-to-Speech (TTS)**:
  - Native iOS/Android for free local playback
  - Optional cloud voices (ElevenLabs, Play.ht) for premium voices
- **LLM Coaching Logic**:
  - Claude API (Anthropic) for NEPQ-based contextual advice and summaries
  - Deterministic checks via custom ruleset JSON

### Data & Storage
- **Database**: PostgreSQL (via Prisma ORM) for structured data (users, calls, transcripts, scores)
- **Object Storage**: S3-compatible (AWS S3, Cloudflare R2, Wasabi) for audio recordings
- **Cache/Queue**: Redis for WebSocket session state and asynchronous job queueing

### Infrastructure
- **Hosting**: AWS ECS/Fargate, Fly.io, or Railway for backend services
- **CI/CD**: GitHub Actions or GitLab CI for automated testing and deployment
- **CDN**: Cloudflare for static asset distribution
- **Web Client/Dashboard**: Vercel for React-based management dashboard (Phase 2)

### Security & Compliance
- **Encryption**: TLS/HTTPS for all connections; AES-256 at rest for recordings
- **Auth**: OAuth 2.0 and JWT tokens
- **Call Recording Compliance**: Geofencing for two-party consent laws, consent prompts logged with timestamps
- **Data Retention**: Configurable per organization

---
