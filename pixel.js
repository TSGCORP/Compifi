/* ============================================================
   Compifi — site tracking

   Loads two independent things:
     1. Google Analytics 4   (site behavior: pages, depth, flow)
     2. OpenAI Ads Pixel     (ad conversion attribution)

   Loaded from <head> on every public page except privacy.html.
   Filename kept as pixel.js so no page markup has to change.

   DEBUG logs OpenAI SDK activity to the console. Set to false
   once you have verified the install.
   ============================================================ */

var GA_ID    = "G-9WRME9V353";
var PIXEL_ID = "HbhFXSxp5jr8GnNmM9v5BG";
var DEBUG    = false;

/* ---------------- Google Analytics 4 ---------------- */
(function (w, d, id) {
  if (!id) return;
  var s = d.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  d.head.appendChild(s);

  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag("js", new Date());
  w.gtag("config", id);
})(window, document, GA_ID);

/* ---------------- OpenAI Ads Measurement Pixel ---------------- */
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

oaiq("init", { pixelId: PIXEL_ID, debug: DEBUG });

/* ---- page view (OpenAI) ---------------------------------------
   GA4 tracks page views on its own; this is the OpenAI copy. */
(function () {
  var path = location.pathname.split("/").pop() || "index.html";
  var id = path.replace(/\.html$/, "") || "index";
  oaiq("measure", "page_viewed", {
    type: "contents",
    contents: [{ id: id, name: document.title, content_type: "page" }]
  });
})();

/* ---- conversions ----------------------------------------------
   Booking happens on Zoom, off our domain, so the CTA click is the
   last measurable signal. Sent to both platforms so the numbers
   can be reconciled. GA4 also auto-tracks outbound clicks via
   enhanced measurement, so expect some overlap there. */
document.addEventListener("click", function (e) {
  var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  var href = a.getAttribute("href") || "";
  var ga = window.gtag || function () {};

  if (href.indexOf("scheduler.zoom.us") > -1) {
    oaiq("measure", "lead_created", { type: "customer_action" });
    ga("event", "book_walkthrough_click", { link_url: href });
  } else if (href.indexOf("zoom.us/webinar/register") > -1) {
    oaiq("measure", "registration_completed", { type: "customer_action" });
    ga("event", "session_register_click", { link_url: href });
  } else if (href.indexOf("mailto:") === 0) {
    oaiq("measure", "custom", { type: "custom" }, { custom_event_name: "email_clicked" });
    ga("event", "email_click");
  } else if (href.indexOf("tel:") === 0) {
    oaiq("measure", "custom", { type: "custom" }, { custom_event_name: "phone_clicked" });
    ga("event", "phone_click");
  }
}, true);
