A — PUZZLE HUNT SITE
====================

WHAT'S IN THIS FOLDER
  index.html        Home page: the list of puzzles
  bet.html          Puzzle "Bet"
  tom.html          Puzzle "Tom"
  24.html           Puzzle "24"
  final.html        The final puzzle
  style.css         The look of every page (fonts, sizes, spacing)
  check.js          The answer checker (you shouldn't need to touch it)
  images/           All puzzle images
  tools/make-hash.html   Makes answer "fingerprints" (see below)

EDITING TEXT
  Open any .html file in a plain text editor (TextEdit in plain-text
  mode, Notepad, VS Code...). Each part is labeled with a comment that
  looks like <!-- like this -->. Change the words, save, done.

SWAPPING AN IMAGE
  Replace the file in images/ with a new one of the same name.

CHANGING THE LOOK (style.css)
  Browsers keep a saved copy of style.css, so visitors may not see
  your changes right away. After editing style.css, open each .html
  file and raise the number in  style.css?v=2  (to v=3, then v=4...).
  That tells every browser to fetch the new version.
  To check your own changes, do a hard refresh: Cmd+Shift+R (Mac)
  or Ctrl+Shift+R (Windows).

CHANGING AN ANSWER
  1. Open tools/make-hash.html in your browser (double-click it).
  2. Type the new answer and click "Make fingerprint".
  3. Copy the long code it shows.
  4. In the puzzle's .html file, find data-hash="..." in the answer
     box and replace the code between the quotes.
  The checker ignores spaces, punctuation and capitalization, so
  "Hello World" and "HELLOWORLD" both count.

PREVIEWING ON YOUR COMPUTER
  Double-click index.html to open it in your browser.

PUTTING IT ONLINE (Netlify)
  Drag this whole folder onto https://app.netlify.com/drop
  To update it later, drag the folder onto your site's "Deploys"
  page on Netlify.

NOTE
  The answers can't be read from the page code, but a determined
  solver could test guesses offline. That's normal for small hunts.
