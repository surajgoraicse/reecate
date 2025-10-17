"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const page =  () => {
	const [data, setData] = useState<any>();

	useEffect(() => {
		(async function getSession() {
			const { data: session, error } = await authClient.getSession();

			if (error) {
				console.log("error fetching session ", error);
				return;
			}
			console.log("session ", session?.user);
			setData(session?.user);
		})();
	}, []);

	return <div>{JSON.stringify(data)}</div>;
};

export default page;
