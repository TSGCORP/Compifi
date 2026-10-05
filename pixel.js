/* ============================================================
   Compifi — OpenAI ChatGPT Ads Measurement Pixel

   Loaded from <head> on every public page except privacy.html.

   DEBUG: set DEBUG = true to log SDK activity to the browser
   console while testing. Set it back to false once verified.
   ============================================================ */

var PIXEL_ID = "HbhFXSxp5jr8GnNmM9v5BG";
var DEBUG    = true;

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

oaiq("init", {
  pixelId: PIXEL_ID,
  debug: DEBUG
});

/* ---- page view ------------------------------------------------
   Names the page, so Ads Manager shows which pages ad traffic
   actually reaches rather than just that someone landed. */
(function () {
  var path = location.pathname.split("/").pop() || "index.html";
  var id = path.replace(/\.html$/, "") || "index";
  oaiq("measure", "page_viewed", {
    type: "contents",
    contents: [{ id: id, name: document.title, content_type: "page" }]
  });
})();

/* ---- conversions ----------------------------------------------
   Booking happens on Zoom, off our domain, so the click on the
   CTA is the last thing we can measure. Fired as lead_created:
   intent, not a confirmed appointment. */
document.addEventListener("click", function (e) {
  var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  var href = a.getAttribute("href") || "";

  if (href.indexOf("scheduler.zoom.us") > -1) {
    oaiq("measure", "lead_created", { type: "customer_action" });
  } else if (href.indexOf("zoom.us/webinar/register") > -1) {
    oaiq("measure", "registration_completed", { type: "customer_action" });
  } else if (href.indexOf("mailto:") === 0) {
    oaiq("measure", "custom", { type: "custom" }, { custom_event_name: "email_clicked" });
  } else if (href.indexOf("tel:") === 0) {
    oaiq("measure", "custom", { type: "custom" }, { custom_event_name: "phone_clicked" });
  }
}, true);
