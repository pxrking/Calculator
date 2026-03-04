# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A CLI calculator application built with Node.js. Single-file project (`calculator.js`) using `readline` for interactive user input.

## Running

```bash
node calculator.js
```

No build step, no dependencies beyond Node.js stdlib.

## Architecture

- All calculator functions are standalone pure functions (e.g., `add`, `subtract`, `sin`, `ln`)
- Trig functions accept degrees (converted to radians internally)
- The `main()` function is a recursive async loop handling the interactive menu
- Menu-driven: user selects an operation by number, enters operands, sees result, loops back

## Conventions

- New operations: add a pure function, a menu entry in `main()`, and input handling logic
- Branch naming: feature branches use `add_<feature>` or `add-<feature>` pattern
