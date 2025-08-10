# Task Master

A lightweight, repo-native task system for StellarSalesApp. Tasks are defined in `tasks.yaml` as epics → tasks → subtasks with dependencies, estimates, and acceptance criteria.

## Files
- `tasks.yaml`: Source of truth for planning and execution
- `README.md`: This file

## Conventions
- Status values: `todo`, `in-progress`, `blocked`, `in-review`, `done`
- Estimates use `d` (days), `h` (hours). Example: `3d`, `6h`
- IDs are stable. Do not reuse IDs. Append new items with new IDs.
- Use dependencies to model ordering constraints.

## How to work
- Pick a `todo` task with unblocked dependencies.
- Update `status`, add notes in `notes` field as needed.
- Prefer small PRs that close a subtask or a single task.

## Filtering examples (CLI)
- List open tasks: `rg "status: (todo|in-progress|blocked)" task-master/tasks.yaml | cat`
- List tasks for an epic: `rg "^\- id: EP-08$" -n task-master/tasks.yaml -A300 | cat`
- Find tasks assigned to you: `rg "owner: <your-name>" task-master/tasks.yaml | cat`

## Adding tasks
- Add to the appropriate epic. If none fits, create a new epic.
- Include: `title`, `acceptance_criteria`, `dependencies`, and `estimate`.
- Keep `description` succinct and actionable.

## Milestones
Milestones group tasks to track release scope. Dates are placeholders; update as the plan evolves.
