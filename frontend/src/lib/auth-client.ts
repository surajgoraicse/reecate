import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
	baseURL: "http://localhost:8000",
	plugins: [
		inferAdditionalFields({
			user: {
				role: {
					type: "string",
					required: true,
					default: "USER",
					input: false,
				},
			},
		}),
	],
});
