import PocketBase from "pocketbase";

let pbURI = "http://localhost:8090";

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

// Get connected clients from the server
export const getConnectedClients = async () => {
  const clients = await fetch(`${pbURI}/clients`).then((res) => res.json());

  const records = [];
  for (const client of clients) {
    const record = await pb.collection("users").getOne(client.id);
    records.push(record);
  }

  return records;
};
