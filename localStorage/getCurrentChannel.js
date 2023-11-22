import * as SecureStore from "expo-secure-store";

export default async (workspaceId) => {
  const channelId = await SecureStore.getItemAsync(workspaceId);
  return channelId;
};
