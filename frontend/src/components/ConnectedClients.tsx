/** @jsxImportSource solid-js */
import {createSignal, onCleanup, onMount, Suspense} from "solid-js";
import {pb} from "../utils/pocketbase";
import Avatar from "./index/Avatar";


export default function ConnectedClients() {
    const [connectedClients, setConnectedClients] = createSignal([] as any[]);
    let avatarUrl: string | undefined;

    onMount(async () => {
        const headers = new Headers();
        headers.append("cache", "no-cache");

        const clients = await fetch("/connected.json", {headers}).then((res) => res.json());
        setConnectedClients(clients);

        // Start polling for connected clients every 5 seconds
        const intervalId = setInterval(async () => {
            const updatedClients = await fetch("/connected.json").then((res) => res.json());
            if (updatedClients.length !== connectedClients().length || updatedClients.some((client: any) => !connectedClients().includes(client))) {
                setConnectedClients(updatedClients);
            }
        }, 5000);

        // Clear the interval when the component is unmounted
        onCleanup(() => {
            clearInterval(intervalId);
        });

    });

    return (
        <section class="bg-base-200 hidden md:block">
            <h2 class="text-xl font-bold pt-4 text-center">Connected Users</h2>
            <span class={'divider'}></span>
            <ul>
                {connectedClients().map(
                    (client) => (
                        (avatarUrl = pb.getFileUrl(client, client.avatar, {
                            thumb: "64x64",
                        })),
                            (
                                <li class="flex items-center space-x-2 px-2">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        {avatarUrl && (
                                            <div
                                                class={"btn btn-ghost btn-disabled btn-circle avatar"}
                                            >
                                                <Avatar avatarUrl={avatarUrl}/>
                                            </div>
                                        )}
                                    </Suspense>
                                    <span>{client.name}</span>
                                </li>
                            )
                    ),
                )}
            </ul>
        </section>
    )
}
