import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(50, '1 h'),
  analytics: true,
});

export const useRateLimit = async (key?: string) => {
  const { success } = await ratelimit.limit(key ?? 'default');
  if (!success)
    throw new Error('Rate limit exceeded. Try again in 10 seconds.');
};
