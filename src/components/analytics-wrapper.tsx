"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

export function AnalyticsWrapper() {
  return <GoogleAnalytics trackPageViews strategy="lazyOnload" />;
}
