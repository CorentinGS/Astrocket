/** @jsxImportSource solid-js */

import {createSignal, createEffect, onCleanup, lazy, onMount} from "solid-js";
import {Icon} from "@iconify-icon/solid";
import {pb} from "../utils/pocketbase";
import * as buffer from "buffer";

export default function Login() {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [showPassword, setShowPassword] = createSignal(false);
    const [error, setError] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const [success, setSuccess] = createSignal("");

    const loginWithProvider = async (provider: string) => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const authData = await pb.collection('users').authWithOAuth2({provider});
            setSuccess("Login successful! Redirecting...");

            let name = authData?.meta?.name ?? '';
            let avatarUrl = authData?.meta?.avatarUrl ?? '';

            let avatar;

            try {
                const response = await fetch(avatarUrl);
                const blob = await response.blob();

                const fileExtension = avatarUrl.split('.').pop();

                avatar = new File([blob], `image.${fileExtension}`, {type: blob.type});
            } catch (fetchError) {
                console.error(`Failed to fetch avatar from URL: ${avatarUrl}`, fetchError);
                // Handle the error as needed, e.g., set a default avatar
                avatar = null;
            }


            await pb.collection('users').update(authData.record.id, {
                name,
                avatar
            });

            setTimeout(() => {
                window.location.href = "/room";
            }, 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const loginDiscord = async () => {
        await loginWithProvider('discord');
    }

    const loginGithub = async () => {
        await loginWithProvider('github');
    }
    const login = async () => {
        if (!username() || !password()) {
            setError("Username and password are required");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await pb.collection("users").authWithPassword(username(), password());
            setSuccess("Login successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/room";
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    onMount(async () => {
        const authItem = localStorage.getItem("auth");
        if (authItem && authItem !== "") {
            const user = JSON.parse(authItem);
            if (pb.authStore.isValid) {
                window.location.href = "/room";
            }
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
                                <label class="label" for={"email"}>
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
                                <label class="label" for={"password"}>
                                    <span class="label-text">Password</span>
                                </label>
                                <div class="relative">
                                    <input
                                        type={showPassword() ? "text" : "password"}
                                        placeholder="Enter your password"
                                        class="w-full input input-bordered transition duration-100 px-3 py-2"
                                        onChange={(ev) => setPassword(ev.currentTarget.value)}
                                        value={password()}
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword())}
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <Icon
                                            icon={showPassword() ? "material-symbols:visibility-off" : "material-symbols:visibility"}/>
                                    </button>
                                </div>
                            </div>

                            {error() && <div class="alert alert-error">{error()}</div>}
                            {success() && <div class="alert alert-success">{success()}</div>}

                            <button
                                onClick={login}
                                class="btn btn-primary transition duration-100 px-8 py-3"
                                disabled={loading()}
                            >
                                {loading() ? "Loading..." : "Log in"}
                            </button>

                            <div class="flex justify-center items-center relative">
                                <span class="h-px bg-base-content absolute inset-x-0"></span>
                                <span class="bg-base-100 text-sm relative px-4">
                  Log in with social
                </span>
                            </div>

                            <button
                                onClick={loginGithub}
                                disabled={loading()}

                                class="flex justify-center items-center btn btn-accent transition duration-100 gap-2 px-8 py-3">

                                <Icon icon="lucide:github"/>
                                {loading() ? "Loading..." : "Continue with github"}
                            </button>

                            <button
                                onClick={loginDiscord}
                                disabled={loading()}

                                class="flex justify-center items-center btn btn-accent transition duration-100 gap-2 px-8 py-3">

                                <Icon icon="ic:baseline-discord"/>
                                {loading() ? "Loading..." : "Continue with Discord"}
                            </button>
                        </div>

                        <div class="flex justify-center items-center p-4">
                            <p class=" text-sm text-center">
                                Don't have an account?{" "}
                                <a href="https://corentings.dev" class="text-secondary transition duration-100">
                                    Contact me
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
