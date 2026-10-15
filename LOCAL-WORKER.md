# Local subscription worker

`run-worker.cjs` is a direct local adapter for Google's official Antigravity CLI. It uses the CLI's own subscription authentication, not a Gemini API key or browser-cookie export. This is separate from the Gemini consumer web app.

The adapter runs a bounded analysis or coding request in a new disposable workspace. Only files listed in the task JSON are copied in; credential-shaped names are refused. This filename check is not a secret scanner: select inputs carefully. Responses and diagnostics remain in ignored `local-results/`, never in public GitHub by default.

Task format:

```json
{"prompt":"Analyze the selected input files and cite evidence.","files":[]}
```

Run using `node run-worker.cjs analyze TASK.json` or `node run-worker.cjs code TASK.json`. An optional `model` field pins a model identifier verified in the actual account. Unknown or unavailable models must fail rather than switch to a paid provider.

The adapter enforces `useG1Credits: false`, the default `request-review` tool policy, and `allowNonWorkspaceAccess: false`, with no alternate model provider. CLI 1.3.5 omits default-valued settings on save; the adapter accepts the documented defaults and writes the explicit values before every run. It removes known Gemini API-key and endpoint variables from the child process. No unrestricted permissions are enabled. Shell commands still require review and cannot be approved in a headless run. Denied actions or empty output count as failures, even if the CLI returns success.

Code tasks must name an `outputs` array, such as `["slug.cjs"]`. Antigravity returns a schema-constrained map of file contents; the adapter validates the names and writes only those new files in the disposable workspace. It does not execute returned code. ChatGPT reviews and independently tests the result. The adapter serializes work across local chats while temporary read permissions are active, then restores the prior permissions. A leftover lock after a forced shutdown needs inspection before recovery.

The CLI must first be installed and signed in. Login, permission grants, or terms requiring the human must be completed by the human. The no-overage account setting must also be verified. Do not send a model task before these checks.

Verified on 15 October 2026: official CLI 1.3.5 installed, model enumeration succeeded, Gemini 3.8 Flash Medium returned the connectivity marker, read a selected requirements file, and produced analysis. The coding worker used that analysis plus ChatGPT's review correction to generate a real CommonJS module. The adapter wrote the declared file and ChatGPT ran 16 independent behavior checks successfully. No worker shell commands, API keys, merge or deployment were used. This verifies a small local pipeline; million-token input, large projects, ordinary ChatGPT web/mobile control and GitHub Actions execution remain untested.
