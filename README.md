# CodeQuest: Interactive Coding Challenge Platform

> "CodeQuest empowers programming learners and educators with a modern, collaborative, and AI-assisted learning experience."

## Features

- **Rich Problem Authoring**: Use canvas, block-based rich text, and AI tools to write and format custom algorithmic problems.
- **Multi-language Code Execution**: Supports over 60 programming languages via a self-hosted Judge0 backend.
- **AI Integration (OpenAI)**: Automatically generate problem descriptions, solutions, and explanations in LeetCode style.
- **Real-time Collaboration**: Edit documents simultaneously with live cursor, inline comments, and online status indicators.
- **Document & Problem Management**: Group documents, manage permissions, publish problems, and track user progress.
- **Personalized Practice**: Customize test cases, track progress, and receive AI-driven problem recommendations.
- **Contest Mode**: Organize programming contests with scoring, time constraints, and leaderboards.

## Tech Stack

- **Frontend**: Next.js 15 (App Router, Server Actions), TailwindCSS, Shadcn/UI
- **Editor**:

    - Rich text: Novel (ProseMirror-based)
    - Code: Monaco Editor (VSCode-like)
    - Canvas: Tldraw for visual problem illustrations

- **Realtime**: Convex (realtime DB + serverless functions), Liveblocks (cursor sync, presence)
- **Authentication**: Clerk (email, OAuth, Magic Link, role-based access)
- **Execution Engine**: Judge0 (self-hosted, sandboxed, multi-language)
- **AI Services**: OpenAI API (problem generation, text proofreading, simplification)

## System Architecture

- **Frontend**: SSR/CSR hybrid with Server Actions
- **Backend**: Convex (TypeScript functions and realtime DB)
- **Compiler Sandbox**: Dockerized Judge0 for running and evaluating user code
- **Authentication Layer**: Clerk for session management and access control
- **Realtime Sync**: Liveblocks + Convex for concurrent editing and collaboration
