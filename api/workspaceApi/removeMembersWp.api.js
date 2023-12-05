import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (workspaceId, userIds) => {
	try {
		const userToken = await SecureStore.getItemAsync("userToken");
		const response = await fetch(baseUrl + "Workspace/" + workspaceId + "/members", {
			method: "DELETE",
			headers: {
				"x-apikey": apiKey,
				"content-type": "application/json",
				accept: "application/json",
				authorization: "Bearer " + userToken,
				"workspace-id": workspaceId,
			},
      body: JSON.stringify(userIds),
		});
		return response.json();
	} catch (error) {
		return error;
	}
};
