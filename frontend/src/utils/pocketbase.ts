import PocketBase from "pocketbase";
export const pb = new PocketBase("http://0.0.0.0:8090"); // local
// export const pb = new PocketBase("https://chat.memnix.app"); // production

pb.authStore.onChange((auth) => {
  // Store the auth in localStorage
  localStorage.setItem("auth", JSON.stringify(pb.authStore.model));
  localStorage.setItem("authID", <string>pb.authStore.model?.id);
});
