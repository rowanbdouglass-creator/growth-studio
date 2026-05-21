import type { FetchResult, SecurityHeaders } from "./types";

export function analyseSecurityHeaders(fetch: FetchResult): SecurityHeaders {
  const h = fetch.headers;
  return {
    hsts: !!h["strict-transport-security"],
    csp: !!h["content-security-policy"] || !!h["content-security-policy-report-only"],
    xFrameOptions: !!h["x-frame-options"],
    xContentTypeOptions: !!h["x-content-type-options"],
    referrerPolicy: !!h["referrer-policy"],
    permissionsPolicy:
      !!h["permissions-policy"] || !!h["feature-policy"],
  };
}
