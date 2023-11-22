import * as SecureStore from "expo-secure-store";

export default async (workspaceId, channelId) => {
  await SecureStore.setItemAsync(workspaceId, channelId);
};
