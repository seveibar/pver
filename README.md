# `pragver` - A CLI for releasing pragmatic versions

`pragver` is a cli tool for releasing [Pragmatic Versions](https://pragmaticversioning.com).

## Installation

TODO

## Usage

```bash
# Automatically compute the latest Pragmatic Version using the
# git history
pragver analyze

# Automatically compute the latest Pragmatic Version using the
# git history and release a new version as a git tag
pragver release --git

# Automatically compute the latest Pragmatic Version using the
# git history and increment the version in the package.json file
pragver release --git --npm

# Also available: --pyproject

# Explicitly release a version
pragver increment --git
pragver announce --git
pragver bigrelease --git
```

## Git History Analysis

### Pragver Simple Commit Message Standard

By default, `pragver` uses parses commit history and looks for the following patterns:

- `bigrelease: <message>` - A BIGRELEASE, increments the major/first version number
- `announce: <message>` - A ANNOUNCE release, increments the minor/second version number
- Anything else - An INCREMENT release, increments the patch/third version number

> Looking for a different commit analysis pattern? [Create an issue!](#)
