/** @jsxImportSource solid-js */

import {
    createSignal,
    createEffect,
    onCleanup,
    lazy,
    onMount,
    Suspense,
} from "solid-js";

const Chat = lazy(() => import("./Chat"));

import {pb} from "../utils/pocketbase";

export interface Message {
    id: string;
    text: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
}

export default function Room() {
    const [messages, setMessages] = createSignal([] as Message[]);
    const [text, setText] = createSignal("");

    onMount(async () => {
        const messageList = {
            items: [] as Message[],
        };

        if (!pb.authStore.isValid || !localStorage.getItem("auth")) {
            window.location.href = "/login";
        }

        const resultList = await pb.collection("messages").getList(1, 50, {
            sort: "-created",
            expand: "author",
        });
        for (const record of resultList.items) {
            const user = record.expand.author as any;
            const url = pb.getFileUrl(user, user.avatar, {thumb: "64x64"});
            messageList.items.push({
                id: record.id,
                text: record.content,
                createdAt: record.created,
                user: {
                    id: user.id,
                    name: user.name,
                    avatar: url,
                },
            });
        }

        // reverse order
        messageList.items.reverse();
        setMessages(messageList.items);

        // scroll to bottom
        const chat = document.getElementById("chat");
        if (chat) chat.scrollTop = chat.scrollHeight;

        // listen for new messages
        await pb.realtime.subscribe("messages", async (data) => {
            if (data.action === "create") {
                const author = await pb.collection("users").getOne(data.record.author);
                const url = pb.getFileUrl(author, author.avatar, {thumb: "64x64"});
                const m = {
                    id: data.record.id,
                    text: data.record.content,
                    createdAt: data.record.created,
                    user: {
                        id: author.id,
                        name: author.name,
                        avatar: url,
                    },
                };
                setMessages([...messages(), m]);

                // get html element
                const chat = document.getElementById("chat");
                if (chat)
                    // scroll to bottom
                    chat.scrollTop = chat.scrollHeight;
            }
        });
    });

    const sendMessage = async () => {
        const data = {
            content: text(),
            author: localStorage.getItem("authID"),
        };
        await pb.collection("messages").create(data);
        setText("");

        // scroll to bottom
        const chat = document.getElementById("chat");
        if (chat) chat.scrollTop = chat.scrollHeight;
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <section class="py-2 flex flex-col max-w-6xl mx-auto px-4 sm:px-6 h-[calc(100vh-5rem)]">
            <div
                class="overflow-y-scroll overscroll-contain rounded-box basis-7/10"
                id="chat"
            >
                <Suspense fallback={<div>Loading...</div>}>
                    {messages().map((message) => (
                        <>
                            <Chat
                                id={message.id}
                                user={message.user}
                                text={message.text}
                                createdAt={message.createdAt}
                            />
                        </>
                    ))}
                </Suspense>
            </div>
            <form class="form-control basis-2/10" onSubmit={handleSubmit}>
                <div class="input-group w-full">
                    <input
                        id="messageInput"
                        type="text"
                        placeholder="Type your message"
                        class="input input-bordered w-[90%]"
                        onInput={(ev) => setText(ev.currentTarget.value)}
                        value={text()}
                    />
                    <button onClick={sendMessage} class="btn btn-ghost rounded-box">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 14l11 -11"></path>
                            <path
                                d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </section>
    );
}
