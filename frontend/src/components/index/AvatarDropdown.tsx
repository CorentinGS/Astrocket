/** @jsxImportSource solid-js */
import { createSignal, JSX, onMount, Suspense } from "solid-js";
import { pb } from "../../utils/pocketbase";
import Avatar from "./Avatar";

/**
 * AvatarDropdown component.
 *
 * This component displays the avatar of the currently logged in user.
 * It also provides a dropdown menu with options to view the profile, settings, and logout.
 *
 * @returns {JSX.Element} The rendered avatar component.
 */
export default function AvatarDropdown(): JSX.Element {
  let user = {} as any;
  const [url, setUrl] = createSignal("");

  /**
   * This function is called when the component mounts.
   * It retrieves the user data from local storage and updates the user object and the avatar URL.
   */
  onMount(async () => {
    user = JSON.parse(localStorage.getItem("auth")?.toString() || "");
    // check if user is logged in
    if (!user) {
      window.location.href = "/login";
    }
    setUrl(pb.getFileUrl(user, user.avatar, { thumb: "64x64" }));
  });

  /**
   * This function is called when the user clicks on the logout option in the dropdown menu.
   * It clears the user data from the auth store and local storage, and redirects the user to the login page.
   */
  const logout = async () => {
    pb.authStore.clear();
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <div class="dropdown dropdown-end">
      <label tabIndex={0} class="btn btn-ghost btn-circle avatar">
        <Suspense fallback={<div>Loading...</div>}>
          {url() && <Avatar avatarUrl={url()} />}
        </Suspense>
      </label>
      <ul
        tabIndex={0}
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
      >
        <li>
          <a class="justify-between">
            Profile
            <span class="badge badge-ghost">Soon</span>
          </a>
        </li>
        <li>
          <a onclick={logout}>Logout</a>
        </li>
      </ul>
    </div>
  );
}
