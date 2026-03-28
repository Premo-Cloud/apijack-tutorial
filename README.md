# apijack Tutorial — TODO API

A simple TODO API with a real-time UI, built for the [apijack](https://github.com/Premo-Cloud/apijack) tutorial.

## Prerequisites

- [Bun](https://bun.sh) installed
- [Claude Code](https://claude.ai/code) installed

## Quick Start

1. Clone and start the API:

   ```bash
   git clone https://github.com/Premo-Cloud/apijack-tutorial.git
   cd apijack-tutorial
   bun install
   bun run start
   ```

2. Open http://localhost:3456 in your browser — you should see an empty TODO grid.

3. In a new terminal, install the apijack plugin:

   ```bash
   cd apijack-tutorial
   bunx @apijack/core plugin install
   ```

4. Open Claude Code in the `apijack-tutorial` directory and connect to the API:

   > "Connect to the TODO API at http://localhost:3456 with username admin and password admin, then generate the CLI."

5. Try the demo prompt — watch your browser while Claude works:

   > "Create 50 TODOs with creative titles. After all 50 are created, update each one in a random order to have a random background color. After all 50 have been colored, delete them all in reverse order."
