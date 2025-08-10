# Branch protection for `main`

Enable required status checks to satisfy TS-002 acceptance criteria.

Checks to require:
- Typecheck (Node 18)
- Lint (Node 18)
- Test (Node 18)
- Build (Node 18)

Administration steps:
1. Settings → Branches → Add rule for `main`
2. Require pull request and required status checks (add the four above)
3. Optionally enforce admins and linear history
