/** @jsxImportSource solid-js */

import {Icon} from "@iconify-icon/solid";
import {createSignal, JSX, onMount} from "solid-js";
import {pb} from "../utils/pocketbase";

/**
 * Login component
 *
 * This component handles user login functionality. It maintains several state variables
 * for managing user input and providing feedback to the user.
 *
 * @returns {JSX.Element} The rendered login component.
 */
export default function Login(): JSX.Element {
    /**
     * `username` is state variables for the username and password input fields.
     * `setUsername` is the functions for updating the state variables.
     *
     *  Initially, `username` is set to empty strings.
     */
    const [username, setUsername] = createSignal("");

    /**
     * `password` is a state variable for the password input field.
     * `setPassword` is the function to update the `password` state.
     *
     * Initially, `password` is set to an empty string.
     */
    const [password, setPassword] = createSignal("");

    /**
     * `showPassword` is a state variable that determines the visibility of the password input field.
     * `setShowPassword` is the function to update the `showPassword` state.
     *
     * Initially, `showPassword` is set to false.
     */
    const [showPassword, setShowPassword] = createSignal(false);

    /**
     * `error` is a state variable for displaying error messages to the user.
     * `setError` is the function to update the `error` state.
     *
     * Initially, `error` is set to an empty string.
     */
    const [error, setError] = createSignal("");

    /**
     * `loading` is a state variable that indicates whether a login request is in progress.
     * `setLoading` is the function to update the `loading` state.
     *
     * Initially, `loading` is set to false.
     */
    const [loading, setLoading] = createSignal(false);

    /**
     * `success` is a state variable for displaying success messages to the user.
     * `setSuccess` is the function to update the `success` state.
     *
     * Initially, `success` is set to an empty string.
     */
    const [success, setSuccess] = createSignal("");

    /**
     * Asynchronously logs in a user with a specified provider.
     *
     * @async
     * @function
     * @param {string} provider - The provider to authenticate the user with.
     * @throws Will throw an error if the authentication process fails.
     */
    const loginWithProvider = async (provider: string) => {
        setLoading(true);
        setError("");
        setSuccess("");

        // Open a new window before calling the .authWithOAuth2() function to prevent the popup blocker from blocking the login popup.
        // See https://github.com/pocketbase/pocketbase/discussions/2429#discussioncomment-5943061 for more details.
        const newWindow = window.open("", "_blank");

        try {
            const authData = await pb.collection("users").authWithOAuth2({
                provider,
                urlCallback: (url) => {
                    newWindow.location.href = url;
                },
            });
            setSuccess("Login successful! Redirecting...");

            const {name = "", avatarUrl = ""} = authData?.meta ?? {};
            const avatar = await fetchAvatar(avatarUrl);

            await pb.collection("users").update(authData.record.id, {name, avatar});

            setTimeout(() => (window.location.href = "/room"), 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Asynchronously fetches an avatar image from a given URL and returns it as a File object.
     *
     * @async
     * @function
     * @param {string} avatarUrl - The URL of the avatar image to fetch.
     * @returns {Promise<File|null>} The fetched avatar image as a File object, or null if an error occurred.
     * @throws Will throw an error if the fetch or Blob conversion process fails.
     */
    const fetchAvatar = async (avatarUrl: string): Promise<File | null> => {
        try {
            const response = await fetch(avatarUrl);
            const blob = await response.blob();
            const fileExtension = avatarUrl.split(".").pop();
            return new File([blob], `image.${fileExtension}`, {type: blob.type});
        } catch (fetchError) {
            console.error(
                `Failed to fetch avatar from URL: ${avatarUrl}`,
                fetchError,
            );
            return null;
        }
    };

    const loginDiscord = async () => {
        await loginWithProvider("discord");
    };

    const loginGithub = async () => {
        await loginWithProvider("github");
    };

    /**
     * Asynchronously logs in a user with the provided username and password.
     *
     * @async
     * @function
     */
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
            setTimeout(() => (window.location.href = "/room"), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    onMount(async () => {
        const authItem = localStorage.getItem("auth");
        if (authItem && authItem !== "") {
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
                                            icon={
                                                showPassword()
                                                    ? "material-symbols:visibility-off"
                                                    : "material-symbols:visibility"
                                            }
                                        />
                                    </button>
                                </div>
                            </div>

                            {error() && <div class="alert alert-error">{error()}</div>}
                            {success() && <div class="alert alert-success">{success()}</div>}

                            <button
                                onClick={login}
                                class="btn btn-primary transition duration-100 px-8 py-3"
                                disabled={loading()}
                                data-umami-event={"Login button click"}
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
                                class="flex justify-center items-center btn btn-accent transition duration-100 gap-2 px-8 py-3"
                                data-umami-event={"Login with github button click"}
                            >
                                <Icon icon="lucide:github"/>
                                {loading() ? "Loading..." : "Continue with github"}
                            </button>

                            <button
                                onClick={loginDiscord}
                                disabled={loading()}
                                class="flex justify-center items-center btn btn-accent transition duration-100 gap-2 px-8 py-3"
                                data-umami-event={"Login with discord button click"}
                            >
                                <Icon icon="ic:baseline-discord"/>
                                {loading() ? "Loading..." : "Continue with Discord"}
                            </button>
                        </div>

                        <div class="flex justify-center items-center p-4">
                            <p class=" text-sm text-center">
                                Don't have an account?{" "}
                                <a
                                    href="https://corentings.dev"
                                    class="text-secondary transition duration-100"
                                    data-umami-event={"Contact me button click"}
                                    rel={"noopener"}
                                    target={"_blank"}
                                >
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
