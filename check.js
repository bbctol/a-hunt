/*
  ANSWER CHECKER (used by every page)

  How it works, in plain terms:
  - Each puzzle page has an answer form like this:
        <form class="answer" data-puzzle="bet" data-hash="7e99...">
    "data-puzzle" is a short nickname for the puzzle.
    "data-hash" is a scrambled fingerprint of the correct answer, so
    someone reading the page's code can't see the answer itself.
  - When a solver submits a guess, this script tidies the guess
    (capital letters only, no spaces or punctuation), makes the same
    kind of fingerprint, and compares the two.
  - To change an answer, open tools/make-hash.html, type the new
    answer, and paste the fingerprint it gives you into data-hash.

  Solved puzzles are remembered in the solver's own browser, so the
  home page can show their answers. Nothing is sent anywhere.
*/

(function () {

  // Turn "Hello, World!" into "HELLOWORLD"
  function tidy(text) {
    return text.toUpperCase().replace(/[^A-Z]/g, "");
  }

  // Make the fingerprint (a SHA-256 hash) of some text
  async function fingerprint(text) {
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map(function (b) { return b.toString(16).padStart(2, "0"); })
      .join("");
  }

  // Remember / look up a solved answer in this browser.
  // (Wrapped in try/catch because some browsers block storage.)
  function remember(puzzle, answer) {
    try { localStorage.setItem("a-hunt-" + puzzle, answer); } catch (e) {}
  }
  function lookUp(puzzle) {
    try { return localStorage.getItem("a-hunt-" + puzzle); } catch (e) { return null; }
  }

  // Set up every answer form on the page
  document.querySelectorAll("form.answer").forEach(function (form) {
    const input = form.querySelector("input");
    const result = form.querySelector(".result");
    const puzzle = form.dataset.puzzle;

    // If already solved in this browser, say so
    const earlier = lookUp(puzzle);
    if (earlier) {
      result.textContent = "Solved: " + earlier;
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();               // don't reload the page
      const guess = input.value.trim();
      if (!tidy(guess)) return;             // ignore empty guesses

      const hash = await fingerprint(tidy(guess));
      if (hash === form.dataset.hash) {
        const shown = guess.toUpperCase();
        result.textContent = "Correct! " + shown;
        remember(puzzle, shown);
      } else {
        result.textContent = guess.toUpperCase() + " is incorrect.";
      }
    });
  });

  // On the home page: show answers next to solved puzzles
  document.querySelectorAll("[data-solved-for]").forEach(function (spot) {
    const answer = lookUp(spot.dataset.solvedFor);
    if (answer) spot.textContent = answer;
  });

})();
