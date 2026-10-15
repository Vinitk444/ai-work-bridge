# AI work bridge

A working local controller adapter for Google Antigravity CLI, using Gemini analysis and coding roles, plus an optional owner-approved GitHub handoff workflow.

## Verified local worker

Official CLI 1.3.5 completed a real connectivity request, read a selected requirements file and returned analysis. ChatGPT reviewed the analysis and corrected a Unicode edge case. The coding worker returned structured code, the adapter wrote its declared output file, and 16 independent behavior checks passed on that generated module. See VERIFIED-RESULT.md and LOCAL-WORKER.md.

The local ai-work-coordinator skill invokes the adapter automatically for substantive local work. No repeated human-written routing prompts are needed. Both Google roles use Gemini through Antigravity CLI; this does not control the Gemini consumer web app, ordinary ChatGPT web/mobile chats, or a computer that is offline. A million-token input has not been tested.

The adapter disables personal-credit overages, does not configure API keys, removes known API-key variables from child processes, isolates task files and serializes local calls. Model commands still require review; code is returned as structured text and only declared filenames are written by the adapter. ChatGPT must review and test before applying changes to the actual project. Billing dashboard balances were not audited.

## Optional GitHub approval packets

After human review and merge to main, create a public-safe task issue and, as the personal repository owner, comment `/bridge prepare`. Review the issue and approve its exact returned fingerprint with `/bridge approve HASH`. The Action posts a handoff packet; it does not run the local worker. Linked context revisions require separate review.

The job runs only in public repositories on standard Ubuntu with a pinned action, issue-write/content-read token, three-minute timeout, no checkout, paid model API, artifact storage, cache, automatic merge or deployment. Never publish private files or credentials here.

Validation: 11 local mocked approval checks passed. Real Actions execution remains unverified; the setup PR is deliberately unmerged. Merge and deployment require separate human authorization.
