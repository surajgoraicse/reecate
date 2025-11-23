// lib/axiosInstance.ts

import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// ----------------------------------------------------------------------

/**
 * Request Interceptor
 *
 * @description
 * This interceptor runs before each request is sent.
 * It's used here to add the authentication token to the request headers.
 */
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Check if the code is running on the client side before accessing localStorage
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("authToken");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error: AxiosError) => {
		// Handle request errors
		return Promise.reject(error);
	}
);

// ----------------------------------------------------------------------

/**
 * Response Interceptor
 *
 * @description
 * This interceptor runs after a response is received.
 * It's used for global error handling, like redirecting on 401 Unauthorized errors.
 */
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		// If the request was successful, just return the response
		return response;
	},
	(error: AxiosError) => {
		// Check if the error is a response error from the server
		if (error.response) {
			const { status } = error.response;

			// Handle 401 Unauthorized Error
			// This is typically where you'd redirect the user to the login page
			if (status === 401) {
				// Only run on the client-side
				if (typeof window !== "undefined") {
					console.error("Unauthorized. Redirecting to login...");
					localStorage.removeItem("authToken"); // Clear expired token
					// Redirect to login page
					window.location.href = "/login";
					// You could also show a notification to the user
					toast.error(
						"Your session has expired. Please log in again."
					);
				}
			}

			// Handle other common errors (e.g., 403, 404, 500)
			else if (status === 403) {
				toast.error(
					"You do not have permission to perform this action."
				);
			} else if (status === 500) {
				toast.error("A server error occurred. Please try again later.");
			}
		}

		// Reject the promise so that the error can be caught by a .catch() block in the component
		return Promise.reject(error);
	}
);

export default axiosInstance;
