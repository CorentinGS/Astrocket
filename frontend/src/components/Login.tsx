/** @jsxImportSource solid-js */

import { createSignal, createEffect, onCleanup, lazy, onMount } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { pb } from "../utils/pocketbase";

export default function Login() {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const login = async () => {
    await pb.collection("users").authWithPassword(username(), password());
    window.location.href = "/room";
  };

  onMount(async () => {
    const user = JSON.parse(localStorage.getItem("auth")?.toString() || "");
    if (pb.authStore.isValid) {
      window.location.href = "/room";
    }
  });

  return (
    <>
      <div class="py-6 sm:py-8 lg:py-12">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2 class="text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            Login
          </h2>

          <div class="max-w-lg border rounded-lg mx-auto">
            <div class="flex flex-col gap-4 p-4 md:p-8">
              <div class="">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  class="w-full input input-bordered transition duration-100 px-3 py-2"
                  onChange={(ev) => setUsername(ev.currentTarget.value)}
                  value={username()}
                />
              </div>

              <div class="">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  class="w-full input input-bordered transition duration-100 px-3 py-2"
                  onChange={(ev) => setPassword(ev.currentTarget.value)}
                  value={password()}
                />
              </div>

              <button
                onClick={login}
                class="btn btn-primary transition duration-100 px-8 py-3"
              >
                Log in
              </button>

              <div class="flex justify-center items-center relative">
                <span class="h-px bg-base-content absolute inset-x-0"></span>
                <span class="bg-base-100 text-sm relative px-4">
                  Log in with social
                </span>
              </div>

              <button class="flex justify-center items-center btn btn-accent transition duration-100 gap-2 px-8 py-3">
                <Icon icon="lucide:github" />
                Continue with github
              </button>
            </div>

            <div class="flex justify-center items-center p-4">
              <p class=" text-sm text-center">
                Don't have an account?{" "}
                <a href="#" class="text-secondary transition duration-100">
                  Register on our discord
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
