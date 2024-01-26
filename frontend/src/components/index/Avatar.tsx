import { JSX } from "solid-js";

interface AvatarProps {
  avatarUrl: string;
}

export default function Avatar({ avatarUrl }: AvatarProps): JSX.Element {
  return (
    <div class="w-10 rounded-full">
      <img
        src={avatarUrl}
        alt="avatar image"
        loading="eager"
        width="64"
        height="64"
      />
    </div>
  );
}
