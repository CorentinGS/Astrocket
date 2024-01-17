/** @jsxImportSource solid-js */


import type {Message} from "./Room";

export default function Chat(message: Message) {
    return (
        <div class="chat chat-start" id={message.id}>
            <div class="chat-header">{message.user.name}</div>
            <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                    <img
                        src={message.user.avatar}
                        alt={message.user.name}
                        width={64}
                        loading="lazy"
                        height={64}
                        decoding={"async"}
                    />
                </div>
            </div>
            <div class="chat-bubble chat-bubble-neutral break-words">{message.text}</div>
            <div class="chat-footer opacity-50">
                <time class="text-xs opacity-50">{message.createdAt}</time>
            </div>
        </div>
    );
}
