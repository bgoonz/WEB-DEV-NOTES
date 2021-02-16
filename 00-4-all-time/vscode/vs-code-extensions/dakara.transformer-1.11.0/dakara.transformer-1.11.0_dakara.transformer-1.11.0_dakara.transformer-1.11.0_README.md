# Transformer

- Provides enhanced editing capabilities which operate on either current document or can pipe output to a new document.
- Most commands implement auto scoping to select current block, document or selection as the target of an operation.
   - A block refers to code that has an empty line above and below.

## Features

* [Unique Lines](#unique-lines)
* [Unique Lines As New Document](#unique-lines-as-new-document)
* [Filter Lines](#filter-lines)
* [Filter Lines As New Document](#filter-lines-as-new-document)
* [Sort Lines](#sort-lines)
* [Sort Lines By Length](#sort-lines-by-length)
* [Align To Cursor](#align-to-cursor)
* [Align CSV](#align-csv)
* [Compact CSV](#compact-csv)
* [Copy To New Document](#copy-to-new-document)
* [Select Lines](#select-lines)
* [Lines As JSON](#lines-as-json)
* [Selection As JSON String](#selection-as-json-string)
* [Trim Lines](#trim-lines)
* [Randomize Lines](#randomize-lines)
* [Count Duplicate Lines As New Document](#count-duplicate-lines-as-new-document)
* [Encode / Decode](#encode-/-decode)
* [JSON String As Text](#json-string-as-text)
* [Selection As JSON String](#selection-as-json-string)
* [Split Lines](#split-lines)
* [Split Lines After](#split-lines)
* [Split Lines Before](#split-lines)
* [Join Lines](#split-lines)
* [Select Highlights](#select-highlights)
* [Randomize Selections](#randomize-selections)
* [Reverse Selections](#reverse-selections)
* [Sort Selections](#sort-selections)
* [Trim Selections](#trim-selections)
* [Rotate Forward Selections](#rotate-forward-selections)
* [Rotate Backward Selections](#rotate-backward-selections)
* [Normalize Diacritical Marks](#normalize-diacritical-marks)

* [Macros](#macros)

### Unique Lines
- Removes duplicate lines from the document
- Operates on selection or current block if no selection

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/unique-lines.gif)

### Unique Lines As New Document
- Unique lines are opened in a new document
- Operates on selection or current block if no selection

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/unique-lines-document.gif)

### Filter Lines
- Keep matching lines of filter
- Operates on selection or entire document if no selection
- Filter using regex or literal

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/filter.gif)

### Filter Lines As New Document
- A new document is created with lines matching filter
- Gutter decorators show original line number from original document
- Operates on selection or entire document if no selection
- Filter using regex or literal
- Add lines relative to filtered lines by count and regular expression match
- `Parent Levels` add context by indentation level.  Similar to vscode folding levels. 
  - Examples:
    - `0` will include all siblings of the matched lines.  Where a sibling is determined by being at the same indentation level next to the matched line.
    - `1` will include all siblings + the parent siblings ( one less indentation level )

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/filter-new-document.gif)

### Sort Lines
- Sorts by column when there is a vertical stack of multiple cursors using the cursor position to determine sort text for the line.
- Operates on selection or entire document if no selection

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/sort-lines.gif)

### Sort Lines By Length
- Sorts by length of the line
- Operates on selection or current block if no selection

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/sort-lines-length.gif)

### Align To Cursor
- Aligns text right of cursor to cursor position
- Single cursor will auto expand vertically to block

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/align-cursor.gif)

### Align CSV
- Aligns CSV text into columns.  Can also specify custom delimiter.

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/align-csv.gif)

### Compact CSV
- Does the opposite of `Align CSV`, removes white space between columns.

### Copy To New Document
- Copies selections to a new document
- Operates on selections or find match results or entire document

### Select Lines
- Expands all current find match results or cursors to full line selections

### Lines As JSON
- Converts each line to a JSON string
- Useful for easily creating snippet bodies with selected text

![ScreenShot](https://github.com/dakaraphi/vscode-extension-transformer/raw/master/readme-images/lines-as-json.gif)

### Selection As JSON String
- Transform all contents of selection as a single JSON String

### Trim Lines
- Remove whitespace at beginning and end of lines

### Randomize Lines
- Randomize the order of selected lines

### Count Duplicate Lines As New Document
- Count the number of instances of each unique line

### Encode / Decode
- Encode Base64
- Decode Base64
- Encode URL Segment
- Decode URL Segment
- Encode x-www-form-urlencoded
- Decode x-www-form-urlencoded
- Hash MD5

### JSON String As Text
- unescapes a JSON string to text

### Selection As JSON String
- escape selection to single JSON string

### Split Lines
- split lines using specified delimeter

### Split Lines After 
- splits lines after the delimeter while keeping the delimeter

### Split Lines Before
- splits lines before the delimeter while keeping the delimeter

### Join Lines
- join lines using specified delimeter

### Select Highlights
- make selections of all text highlighted in the editor

### Randomize Selections
 - replace selections with random order of selected text
### Reverse Selections
 - replace selections with reverse order of selected text
### Sort Selections
 - replace selections with sorted order of selected text
### Trim Selections
 - replace selections with trimmed selected text
### Rotate Forward Selections
 - rotates the order of the selections forward
### Rotate Backward Selections
 - rotates the order of the selections backward
### Normalize Diacritical Marks
 - transforms accented characters to non-accented versions

### Macros
- [Experimental feature to provide text editor macros as scripts](https://github.com/dakaraphi/vscode-extension-transformer/issues/13)