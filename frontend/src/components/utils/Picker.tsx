/** @jsxImportSource solid-js */
import { Icon } from "@iconify-icon/solid";
import { EmojiPicker } from "solid-emoji-picker";
import { createSignal } from "solid-js";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function Picker({ onEmojiSelect }: EmojiPickerProps) {
  function handleEmojiClick(emojiObject: { emoji: string }) {
    onEmojiSelect(emojiObject.emoji);
    setShowEmojiPicker(false);
  }

  const [showEmojiPicker, setShowEmojiPicker] = createSignal(false);
  const [search, setSearch] = createSignal("");

  return (
    <div class="dropdown dropdown-top dropdown-end">
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker())}
        class="btn btn-ghost rounded-box"
      >
        <Icon icon="twemoji:grinning-face-with-smiling-eyes" class="text-2xl" />
      </button>
      <ul
        tabIndex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box overflow-auto text-xl w-32 h-32 md:w-64 md:h-64"
      >
        {showEmojiPicker() && (
          <>
            <div class="flex flex-col">
              <input
                type="text"
                class="input input-bordered w-full p-2 rounded-lg"
                placeholder="Search emoji"
                onInput={(ev) => setSearch(ev.currentTarget.value)}
                value={search()}
              />
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                filter={(emoji): boolean =>
                  search() !== "" ? emoji.name.includes(search()) : true
                }
              />
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
