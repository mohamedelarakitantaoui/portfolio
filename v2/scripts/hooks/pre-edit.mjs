// Claude Code PreToolUse hook (Edit|Write|MultiEdit|NotebookEdit): guardrail files are read-only for the agent.
// The checks must not be loosened quietly to make a change pass; Mamoun edits or approves these himself.
// Reads the hook JSON on stdin; exit 2 + stderr blocks the edit and tells the session why.
const chunks = [];
for await (const c of process.stdin) chunks.push(c);
let input = {};
try { input = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { process.exit(0); }
const file = String(input.tool_input?.file_path ?? input.tool_input?.notebook_path ?? '').replace(/\\/g, '/');
if (!file) process.exit(0);

const GUARDED = [
  [/\/tests\/[^/]*-snapshots\//, 'visual baselines (tests/*-snapshots/)'],
  [/\/lighthouserc\.c?js$/, 'Lighthouse CI thresholds (lighthouserc.cjs)'],
  [/\/scripts\/banned\.json$/, 'the banned-strings list (scripts/banned.json)'],
  [/\/\.github\/workflows\//, 'CI workflows (.github/workflows/)'],
];
const hit = GUARDED.find(([re]) => re.test(file));
if (hit) {
  process.stderr.write(`Guardrail files: ask Mamoun first. "${file}" is ${hit[1]}; it can only change with his OK (CLAUDE.md, Never).\n`);
  process.exit(2);
}
process.exit(0);
