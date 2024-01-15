# `pver` - A CLI for releasing pragmatic versions

`pver` is a cli tool for releasing [Pragmatic Versions](https://pragmaticversioning.com).

## Installation

TODO

## Usage

```bash
# Automatically compute the latest Pragmatic Version using the
# git history
pver analyze
pver analyze --current-method=package.json --transition-method=simple

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

# Setup a Github repository to automatically release with pragmatic versions
pver setup github
```

## Analysis

Analysis has two steps. Getting the `current_version` and using the `transition_method` to
determine the next version. You can manually specify both the state method and
the transition method.

Usually, the `current_version` is automatically determined by trying any available methods.

### Current Version Methods (`--current-method`)

#### `package.json`

Use the version inside the package.json file.

#### `readme`

Parse two sections of `README.txt` or `README.md` for a version number in the
format `vX.Y.Z`. Here's an example of a README.md with a version number:

```md
# My Package v0.1.1

This is a description of my package!
```

### Transition Methods (`--transition-method`)

#### `pver` Simple Commit Message Standard `simplegit`

By default, `pver` uses parses git commit history and looks for the following patterns:

- `bigrelease: <message>` - A BIGRELEASE, increments the major/first version number
- `announce: <message>` - A ANNOUNCE release, increments the minor/second version number
- Anything else - An INCREMENT release, increments the patch/third version number

`pver` then uses the largest version bump to determine the next version. It will
only increment a version number by a maximum of `1` per run. This means that
intermediate commits are not released.

> Looking for a different commit analysis pattern? [Create an issue!](#)