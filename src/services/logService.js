// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

export function init() {
  // Sentry.init({
  //   dsn: "https://846d69ad26334c18814070235acc5e3e@o1166580.ingest.sentry.io/6257061",
  //   integrations: [new BrowserTracing()],
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // });
}

export function log(error) {
  console.error(error);
  // Sentry.captureException(error);
}
