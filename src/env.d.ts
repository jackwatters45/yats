/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly RESEND_API_KEY: string;

	readonly UPSTASH_REDIS_REST_URL: string;
	readonly UPSTASH_REDIS_REST_TOKEN: string;

	readonly ASTRO_STUDIO_APP_TOKEN: string;

	readonly PUBLIC_BASE_URL_DEV: string;
	readonly PUBLIC_BASE_URL_PROD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
