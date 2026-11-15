import { useState } from "react";

export default function LeaderboardUser({ leader, large = false }) {
  const [failedURL, setFailedURL] = useState(null);

  const initial = leader.displayName?.trim()[0]?.toUpperCase() || "S";

  const sizeClass = large ? "size-16 text-2xl sm:size-20" : "size-10 text-sm";

  const showPhoto = leader.photoURL && failedURL !== leader.photoURL;

  return (
    <span
      className={`
        inline-flex shrink-0 items-center justify-center
        overflow-hidden rounded-full border
        border-emerald-300/25 bg-emerald-300
        font-heading font-bold text-emerald-950
        ${sizeClass}
      `}>
      {showPhoto ? (
        <img
          src={leader.photoURL}
          alt=""
          referrerPolicy="no-referrer"
          width={large ? 80 : 40}
          height={large ? 80 : 40}
          loading="lazy"
          onError={() => setFailedURL(leader.photoURL)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initial}</span>
      )}
    </span>
  );
}
