/** @jsxImportSource solid-js */
import { createSignal, onMount } from "solid-js";
import { pb } from "../../utils/pocketbase";

export default function Avatar() {
  let user = {} as any;
  const [url, setUrl] = createSignal("");

  onMount(async () => {
    console.log("Avatar mounted");
    user = JSON.parse(localStorage.getItem("auth")?.toString() || "");
    if (!user) {
      window.location.href = "/login";
    }
    setUrl(pb.getFileUrl(user, user.avatar, { thumb: "64x64" }));
  });

  const logout = async () => {
    await pb.authStore.clear();
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <div class="dropdown dropdown-end">
      <label tabIndex={0} class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            src={url()}
            alt="mock image"
            loading="lazy"
            width="64"
            height="64"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onclick={logout}>Logout</a>
        </li>
      </ul>
    </div>
  );
}
