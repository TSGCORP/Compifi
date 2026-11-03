/* ============================================================
   Compifi — site tracking

   Loaded from <head> on every public page except privacy.html.
   Filename kept as pixel.js so no page markup has to change.

   Loads, in order:
     1. Google Analytics 4   — site behavior, pages, depth
     2. HubSpot              — visitor tracking, ties to CRM contacts
     3. Apollo               — company-level visitor identification
     4. OpenAI Ads Pixel     — ad conversion attribution

   DEBUG logs OpenAI SDK activity to the console. Leave false
   in production.
   ============================================================ */

var GA_ID       = "G-9WRME9V353";
var HUBSPOT_ID  = "246498112";                     // na2 portal
var APOLLO_APP  = "685c7fceafc66c0015b707b8";
var PIXEL_ID    = "HbhFXSxp5jr8GnNmM9v5BG";
var DEBUG       = false;

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

/* ---------------- HubSpot ---------------- */
(function (d, id) {
  if (!id || d.getElementById("hs-script-loader")) return;
  var s = d.createElement("script");
  s.type = "text/javascript";
  s.id = "hs-script-loader";
  s.async = true;
  s.defer = true;
  s.src = "//js-na2.hs-scripts.com/" + id + ".js";
  d.head.appendChild(s);
})(document, HUBSPOT_ID);

/* ---------------- Apollo visitor tracker ---------------- */
(function (w, d, appId) {
  if (!appId) return;
  var n = Math.random().toString(36).substring(7);
  var o = d.createElement("script");
  o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
  o.async = true;
  o.defer = true;
  o.onload = function () {
    if (w.trackingFunctions && w.trackingFunctions.onLoad) {
      w.trackingFunctions.onLoad({ appId: appId });
    }
  };
  d.head.appendChild(o);
})(window, document, APOLLO_APP);

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
   GA4 and HubSpot track page views on their own; this is the
   OpenAI copy, named so Ads Manager shows page depth. */
(function () {
  var p = location.pathname;
  var path = p.replace(/\/$/, "/index.html").split("/").pop() || "index.html";
  var id = path.replace(/\.html$/, "") || "index";
  // /live is a folder with its own index.html — name it for what it is
  if (/\/live\/?$/.test(p) || /\/live\/index\.html$/.test(p)) id = "live";
  oaiq("measure", "page_viewed", {
    type: "contents",
    contents: [{ id: id, name: document.title, content_type: "page" }]
  });
})();


/* ---- HubSpot form submission ----------------------------------
   The free-read form is the primary conversion. HubSpot posts a
   message on submit; that is the signal worth optimizing ads on. */
window.addEventListener("message", function (e) {
  if (!e.data || e.data.type !== "hsFormCallback") return;
  if (e.data.eventName !== "onFormSubmitted") return;
  var ga = window.gtag || function () {};
  oaiq("measure", "lead_created", { type: "customer_action" });
  ga("event", "free_read_submitted", { form_id: e.data.id || "" });
});

/* ---- conversions ----------------------------------------------
   Reported to OpenAI and GA4 together so the two can be
   reconciled. Booking and registration both happen on Zoom, off
   our domain, so the click is the last measurable signal. */
document.addEventListener("click", function (e) {
  var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  var href = a.getAttribute("href") || "";
  var ga = window.gtag || function () {};

  if (href.indexOf("/book") > -1 || href.indexOf("scheduler.zoom.us") > -1) {
    // intent only — the completed booking fires from /book via postMessage
    ga("event", "book_page_click", { link_url: href });
  } else if (href.indexOf("zoom.us/webinar/register") > -1) {
    oaiq("measure", "registration_completed", { type: "customer_action" });
    ga("event", "live_register_click", { link_url: href });
  } else if (href.indexOf("mailto:") === 0) {
    oaiq("measure", "custom", { type: "custom" }, { custom_event_name: "email_clicked" });
    ga("event", "email_click");
  } else if (href.indexOf("tel:") === 0) {
    oaiq("measure", "custom", { type: "custom" }, { custom_event_name: "phone_clicked" });
    ga("event", "phone_click");
  }
}, true);
