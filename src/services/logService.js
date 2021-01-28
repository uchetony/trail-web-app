import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const init = () => {
  Sentry.init({
    dsn:
      "https://29b545c10da749db90647547dcef4478@o510796.ingest.sentry.io/5606990",
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
};

const log = (error) => {
  Sentry.captureException(error);
};

export default {
  init,
  log,
};
