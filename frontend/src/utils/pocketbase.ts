import PocketBase from "pocketbase";

let pbURI = '';

if (process.env.NODE_ENV === 'production') {
  pbURI = process.env.POCKETBASE_URI_PROD;
} else if (process.env.NODE_ENV === 'docker') {
  pbURI = process.env.POCKETBASE_URI_DOCKER;
} else {
  pbURI = process.env.RPOCKETBASE_URI_LOCAL;
}
export const pb = new PocketBase(pbURI);

pb.authStore.onChange((auth) => {
  // Store the auth in localStorage
  localStorage.setItem("auth", JSON.stringify(pb.authStore.model));
  localStorage.setItem("authID", <string>pb.authStore.model?.id);
});
