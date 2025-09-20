Project name: unzip-wendy-click

Project scope:

1. This app is being developed to meet the needs of a single specific client (Wendy).
2. I have full administrative access to the client's device.

Development environment:

- OS: Windows 11 (latest)
- Editor: VS Code (latest)
- Default terminal: Git Bash

Ignore:

- all folders and files in the `_dev` directory and its subdirectories, unless specifically instructed otherwise.

When generating code ALWAYS:

1. Provide the simplest, most straightforward solution, and
2. list optional enhancements, if any, in a separate section.

When suggesting changes that involve copying existing values:

- Explicitly verify that values match exactly
- Use checksum/diff tools when appropriate
- List any changes you make to existing values

Before providing a response:

- Double-check all file paths are correct
- Verify all code snippets compile/parse
- Confirm any quoted values match source exactly
- Highlight any assumptions being made

When showing code changes:

- Mark critical values that must not be altered
- Highlight security-sensitive sections
- Include validation steps for the user

When code changes are located inside a single function:

- Provide a complete copy/paste-ready version of the updated function

When code changes are not located inside a single function:

- Provide a complete copy/paste-ready version of the updated file
- If the first line of the original file is a comment, ALWAYS include the commented line
- If the first commented line in a file includes a version number (e.g.: v1, Version: 1, v1.0.1, etc.), ALWAYS increment the version number when making changes of any sort whatsoever to the file, unless instructed otherwise.
- ALWAYS format first line header comments with this pattern: `  // <path>.js - vX.Y.Z`
- If you increment the version number of a JavaScript file, ALWAYS update the files "History" list (last update first) in the file's top-level comment

Format responses with clear sections:

1. What changes are being made
2. Why they are needed
3. How to verify the changes
4. Potential risks or considerations
5. Optional enhancements

Format sections in a nested fashion (i.e., `##`, `###`, etc.) to facilitate file navigation.

When generating the top-level section (i.e., `#`):

1. insert an empty line before the heading, and
2. use `# Response` as the top-level heading
