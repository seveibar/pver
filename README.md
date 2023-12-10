# `pver` - A CLI for releasing pragmatic versions

`pver` is a cli tool for releasing [Pragmatic Versions](https://pragmaticversioning.com).

## Installation

TODO

## Usage

```bash
# Automatically compute the latest Pragmatic Version using the
# git history
pver analyze

# Automatically compute the latest Pragmatic Version using the
# git history and release a new version as a git tag (and push it)
pver release --git

# Automatically compute the latest Pragmatic Version using the
# git history and increment the version in the package.json file, and
# the README.(md|txt) file
pver release --git --npm --readme

# Also available: --pyproject, --setuppy, --versionpy, --versionrb,
#                 --mdfile somefile.md

# Explicitly release a version
pver release increment --git
pver release announce --git
pver release bigrelease --git

# Automatically compute the latest Pragmatic Version using the
# git history, tag the current commit and stage the changes locally
pver stage --git
pver stage increment --git --npm
```

## Git History Analysis

### `pver` Simple Commit Message Standard v0.0.1

By default, `pver` uses parses commit history and looks for the following patterns:

- `bigrelease: <message>` - A BIGRELEASE, increments the major/first version number
- `announce: <message>` - A ANNOUNCE release, increments the minor/second version number
- Anything else - An INCREMENT release, increments the patch/third version number

`pver` then uses the largest version bump to determine the next version.

To determine the current version, `pver` uses the version indicator of the
supplied version providers in the order they were supplied, taking the first
version that it finds. If no version provider was given, it defaults to `--git`.

> Looking for a different commit analysis pattern? [Create an issue!](#)
