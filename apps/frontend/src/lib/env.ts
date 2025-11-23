import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
	server: {
		// server-only variables (secrets)
		BASE_URL: z.string().url(),
	},
	client: {
		// exposed to browser, must start with NEXT_PUBLIC_
		NEXT_PUBLIC_API_URL: z.string().url(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	}, // where to read envs from
	emptyStringAsUndefined: true, // treat empty strings as undefined
});

export default env;
