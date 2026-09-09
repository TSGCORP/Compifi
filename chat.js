/* ============================================================
   Compifi — live chat loader (Social Intents → Slack)

   Loaded on every page. Chats route to #compifi-chat in Slack.

   To change widgets, replace WIDGET_SRC below — it is the only
   place the ID appears. Get a new value from Social Intents:
   Live Chat app → Install Code (copy just the src URL).
   ============================================================ */

var WIDGET_SRC = "https://chat.socialintents.com/api/chat/socialintents.1.5.js#2c9fa899a02ba52e01a047339a0e3229";

(function () {
  // don't try to load an unconfigured widget
  if (!WIDGET_SRC || WIDGET_SRC.indexOf("PASTE_YOUR") === 0) {
    return;
  }
  var s = document.createElement("script");
  s.src = WIDGET_SRC;
  s.async = true;
  document.head.appendChild(s);
})();
