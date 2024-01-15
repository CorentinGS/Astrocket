/** @jsxImportSource solid-js */

import {createSignal, createEffect, onCleanup, lazy, onMount} from "solid-js";
import {Icon} from "@iconify-icon/solid";
import {pb} from "../utils/pocketbase";

export default function Login() {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [showPassword, setShowPassword] = createSignal(false);
    const [error, setError] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const [success, setSuccess] = createSignal("");


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
                                class="flex justify-center items-center btn btn-accent transition duration-100 gap-2 px-8 py-3">
                                <Icon icon="lucide:github"/>
                                Continue with github
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
