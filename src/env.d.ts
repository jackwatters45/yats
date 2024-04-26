/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;

  readonly UPSTASH_REDIS_REST_URL: string;
  readonly UPSTASH_REDIS_REST_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
