import PocketBase from "pocketbase";

export let pbURI = "http://localhost:8090";

if (process.env.NODE_ENV === "production") {
    pbURI = "https://pocketbase.corentings.dev";
} else {
    pbURI = "http://localhost:8090";
}
export const pb = new PocketBase(pbURI);

pb.authStore.onChange((auth) => {
    // Store the auth in localStorage
    localStorage.setItem("auth", JSON.stringify(pb.authStore.model));
    localStorage.setItem("authID", <string>pb.authStore.model?.id);
});

