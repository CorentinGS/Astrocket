import {APIRoute} from "astro";
import {pb, pbURI} from "../utils/pocketbase";

let cachedRecords = null;
let eTag = null;

export const GET: APIRoute = async ({params, request}) => {
    const cache = request.headers.get("cache") || "";

    let clients = await getConnectedClients();
    if (!clients && cache != "no-cache") {
        return new Response(null, {
            status: 304
        })
    }

    if (!clients) {
        clients = cachedRecords;
    }

    return new Response(JSON.stringify(clients), {
            headers: {
                "content-type": "application/json"
            }
        }
    )
}


// Get connected clients from the server
const getConnectedClients = async () => {
    const headers = new Headers();
    if (eTag) {
        headers.append("If-None-Match", eTag);
    }

    const response = await fetch(`${pbURI}/clients`, {headers})
    if (response.status === 304) {
        return null;
    }
    eTag = response.headers.get("ETag");
    const clients = await response.json();

    const records = [];
    for (const client of clients) {
        const record = await pb.collection("users").getOne(client.id);
        records.push(record);
    }

    // sort by name
    records.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        return 1;
    })

    cachedRecords = records;
    return records;
};
