# AI work bridge

ChatGPT coordinates tasks and reviews reports and draft PRs. This initial workflow prepares approved handoff packets; it does not execute Gemini or Antigravity.

## Use after setup is reviewed and merged

1. Create an AI bridge task issue with a public-safe goal, source revisions, scope and acceptance checks. Keep confidential context in private storage.
2. As the personal repository owner, comment `/bridge prepare`.
3. Review the task and post `/bridge approve HASH` using the exact SHA-256 fingerprint returned by the Action. Only the owner's human GitHub identity is accepted. Changes to the issue invalidate the hash; separately pin and review linked file revisions.
4. ChatGPT reads the approved packet and coordinates available authenticated workers. Gemini web and Antigravity are not connected by this workflow; no generated packet is evidence of agent execution.
5. Return reports and a draft PR for review. Merge, deployment, expanded scope and spending require separate human authorization.

## Safeguards

The job only runs in public repositories on the standard Ubuntu runner, with a three-minute timeout, issue-write/content-read token, a pinned action and no checkout, shell execution of issue content, model API calls, cache, artifact storage, merge or deployment. Never publish private code or credentials here. Antigravity subscription use requires verified account authentication and AI Credit Overages set to Never.

## Validation

`node test-bridge.cjs` exercises approval handling with mocked GitHub responses. Eleven local checks passed. Real Actions execution remains unverified until this setup is reviewed, merged and tested with an issue. No model execution has been verified.

The local ai-work-coordinator skill is configured separately to handle routing without repeated instruction prompts. Installing this repository does not change every ChatGPT web/mobile chat or connect external agents.
