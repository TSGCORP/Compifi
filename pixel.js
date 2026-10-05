/* ============================================================
   Compifi — OpenAI conversion pixel

   Loaded on index.html only. To disable, remove the
   <script src="pixel.js" defer></script> tag from the page,
   or set PIXEL_ID to "" below. Nothing else is affected.

   NOTE: the ID below has no angle brackets. The snippet from
   the docs wraps it in < > as a placeholder — those are not
   part of the ID and must be removed.
   ============================================================ */

var PIXEL_ID = "HbhFXSxp5jr8GnNmM9v5BG";

(function (w, d, s, u) {
  if (!PIXEL_ID || w.oaiq) return;

  var q = function () { q.q.push(arguments); };
  q.q = [];
  w.oaiq = q;

  var js = d.createElement(s);
  js.async = true;
  js.src = u;
  var f = d.getElementsByTagName(s)[0];
  f.parentNode.insertBefore(js, f);
})(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");

if (typeof oaiq === "function") {
  oaiq("init", { pixelId: PIXEL_ID });
}
