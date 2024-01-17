/** @jsxImportSource solid-js */

import {
    createSignal,
    createEffect,
    onCleanup,
    lazy,
    onMount,
    Suspense, JSX,
} from "solid-js";

const Chat = lazy(() => import("./Chat"));
import TextareaAutosize from "solid-textarea-autosize";

import {pb} from "../utils/pocketbase";


/**
 * Message interface represents the structure of a message in the application.
 *
 * @interface
 *
 * @property {string} id - The unique identifier of the message.
 * @property {string} text - The content of the message.
 * @property {string} createdAt - The timestamp when the message was created.
 * @property {Object} user - The user who sent the message.
 * @property {string} user.id - The unique identifier of the user.
 * @property {string} user.name - The name of the user.
 * @property {string} user.avatar - The avatar of the user.
 */
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

/**
 * Room is a functional component that handles the chat room functionality.
 *
 * It maintains the state of the messages in the chat room and provides the functionality to send new messages.
 * It also handles the real-time updates of the messages in the chat room.
 *
 * @returns {JSX.Element} The rendered chat room component.
 */
export default function Room(): JSX.Element {
    /**
     * `messages` is a state variable that holds the list of messages in the chat room.
     * `setMessages` is the function to update the `messages` state.
     *
     * Initially, `messages` is set to an empty array.
     */
    const [messages, setMessages] = createSignal([] as Message[]);

    /**
     * `text` is a state variable that holds the current text input in the chat box.
     * `setText` is the function to update the `text` state.
     *
     * Initially, `text` is set to an empty string.
     */
    const [text, setText] = createSignal("");

    /**
     * `page` is a state variable that holds the current page number for pagination.
     * `setPage` is the function to update the `page` state.
     *
     * Initially, `page` is set to 1, indicating the first page.
     */
    const [page, setPage] = createSignal(1);

    /**
     * `showLoadMore` is a state variable that indicates whether the "Load More" button should be displayed.
     * `setShowLoadMore` is the function to update the `showLoadMore` state.
     *
     * Initially, `showLoadMore` is set to true, indicating that the "Load More" button should be displayed.
     */
    const [showLoadMore, setShowLoadMore] = createSignal(false);

    /**
     * `fetchMoreMessages` is an asynchronous function that fetches older messages from the server.
     *
     * @async
     */
    const fetchMoreMessages = async () => {
        setPage(page() + 1);

        const resultList = await pb.collection("messages").getList(page(), 50, {sort: "-created", expand: "author"});

        const olderMessages = resultList.items.map(record => ({
            id: record.id,
            text: record.content,
            createdAt: record.created,
            user: {
                id: record.expand.author.id,
                name: record.expand.author.name,
                avatar: pb.getFileUrl(record.expand.author, record.expand.author.avatar, {thumb: "64x64"}),
            },
        }));

        setMessages([...messages(), ...olderMessages]);

        if (page() === resultList.totalPages) {
            setShowLoadMore(false);
        }
    };

    let lastNotificationTime = 0;


    /**
     * This function is called when the component is mounted.
     */
    onMount(async () => {
            // Check if the user is authenticated
            if (!pb.authStore.isValid || !localStorage.getItem("auth")) {
                window.location.href = "/login";
            }

            // Fetch the list of messages from the server
            const resultList = await pb.collection("messages").getList(1, 50, {
                sort: "-created",
                expand: "author",
            });

            // Transform the fetched data into the format required by the application
            const messageList = resultList.items.map(record => {
                const user = record.expand.author;
                const url = pb.getFileUrl(user, user.avatar, {thumb: "64x64"});
                return {
                    id: record.id,
                    text: record.content,
                    createdAt: record.created,
                    user: {
                        id: user.id,
                        name: user.name,
                        avatar: url,
                    },
                };
            });

            if (resultList.totalPages > 1) {
                setShowLoadMore(true);
            }

            // Set the `messages` state with the transformed data
            setMessages(messageList);

            if ("Notification" in window) {
                // Request permission to display notifications
                Notification.requestPermission().then((permission) => {
                    // If the user grants permission
                    if (permission === "granted") {
                        console.log("Notification permission granted.");
                    } else {
                        // If the user does not grant permission, still subscribe to the messages
                        console.log("Notification permission not granted.");
                    }
                });
            }


            // Subscribe to real-time updates of the messages
            await pb.realtime.subscribe("messages", async (data) => {
                // When a new message is created
                if (data.action === "create") {
                    // Fetch the data of the new message
                    const newMessage: Message = await createMessageFromRecord(data.record) as Message;

                    // Add the new message to the `messages` state
                    // @ts-ignore
                    setMessages([newMessage, ...messages()]);
                    // Scroll the chat window to the bottom
                    scrollToBottom();

                    // If the user has granted permission, display a notification for the new message
                    if (Notification.permission === "granted" && document.visibilityState === "hidden") {
                        const currentTime = Date.now();
                        // Check if at least 10 seconds have passed since the last notification
                        if (currentTime - lastNotificationTime >= 10000) {
                            new Notification("New message", {
                                body: newMessage.text,
                                icon: newMessage.user.avatar,
                            });
                            // Update the timestamp of the last notification
                            lastNotificationTime = currentTime;
                        }
                    }

                    if (page() === resultList.totalPages) {
                        setShowLoadMore(false);
                    }
                }
            })
        }
    );


    /**
     * `scrollToBottom` is a function that scrolls the chat window to the bottom.
     *
     * It first gets the chat element by its id. If the chat element exists, it sets its scrollTop property to its scrollHeight.
     * This effectively scrolls the chat window to the bottom, showing the most recent messages.
     */
    function scrollToBottom() {
        const chat = document.getElementById("chat");
        if (chat) chat.scrollTop = chat.scrollHeight;
    }


    /**
     * Creates a message object from a record.
     *
     * @param {Object} record - The record from which to create the message object.
     * @returns {Promise<Object>} A promise that resolves to the created message object.
     */
    async function createMessageFromRecord(record: {
        author: string;
        id: any;
        content: any;
        created: any;
    }): Promise<object> {
        const author = await pb.collection("users").getOne(record.author);
        const url = pb.getFileUrl(author, author.avatar, {thumb: "64x64"});
        return {
            id: record.id,
            text: record.content,
            createdAt: record.created,
            user: {
                id: author.id,
                name: author.name,
                avatar: url,
            },
        };
    }


    /**
     * `isSending` is a state variable that indicates whether a message is currently being sent.
     * `setIsSending` is the function to update the `isSending` state.
     *
     * Initially, `isSending` is set to false.
     */
    const [isSending, setIsSending] = createSignal(false);

    /**
     * Checks if a message can be sent based on certain conditions.
     * @returns {boolean} - Returns true if a message can be sent, false otherwise.
     */
    const canSendMessage = (): boolean => !isSending() && text().trim() !== '' && text().length <= 400;


    /**
     * Sends a message to the server.
     *
     * @async
     */
    const sendMessage = async () => {
        if (!canSendMessage()) return;

        setIsSending(true);
        const data = {content: text(), author: localStorage.getItem("authID")};

        try {
            await pb.collection("messages").create(data);
        } finally {
            setIsSending(false);
        }

        setText("");
        scrollToBottom();
    };

    /**
     * Handles the form submission event.
     *
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        sendMessage().catch(console.error);
    };

    return (
        <section class="py-6 flex flex-col max-w-6xl mx-auto px-4 sm:px-6 h-[calc(100vh-5rem)] flex-grow">
            <div
                class="overflow-y-scroll overscroll-contain rounded-box basis-7/10 flex flex-col-reverse flex-grow"
                id="chat"
            >

                <Suspense fallback={<div>Loading...</div>}>
                    {messages().length > 0 ? (
                        <>
                            {messages().map((message) => (
                                <>
                                    <Chat
                                        id={"message-" + message.id}
                                        user={message.user}
                                        text={message.text}
                                        createdAt={message.createdAt}
                                    />
                                </>
                            ))}
                            {showLoadMore() ? (
                                <button onClick={fetchMoreMessages} class="btn btn-ghost rounded-box">
                                    Load More
                                </button>) : null}
                        </>
                    ) : (
                        <div class="flex items-center justify-center h-full">
                            <p class="text-base-content/50">Welcome to Astrocket! Start a conversation here.</p>
                        </div>
                    )}
                </Suspense>
            </div>
            <form class="form-control basis-2/10" onSubmit={handleSubmit}>
                <div class="input-group w-full flex flex-row">
                    <TextareaAutosize
                        onKeyPress={(ev) => {
                            if (ev.key === "Enter" && !ev.shiftKey) {
                                ev.preventDefault();
                                sendMessage().catch(console.error);
                            } else if (ev.key === "Enter" && ev.shiftKey) {
                                ev.preventDefault();
                                setText(text() + "\n");
                            }
                        }}
                        id="messageInput"
                        placeholder="Type your message"
                        class="input input-bordered w-[90%] min-h-[50px] resize-none"
                        onInput={(ev) => {
                            let inputValue = ev.currentTarget.value;
                            if (inputValue.length > 400) {
                                inputValue = inputValue.slice(0, 400);
                            }
                            setText(inputValue);
                        }} value={text()}
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
                    <div
                        class={`text-sm text-gray-500 ${text().length > 400 ? 'text-error' : ''}`}>{text().length}/400
                    </div>
                </div>
            </form>
        </section>
    );
}
