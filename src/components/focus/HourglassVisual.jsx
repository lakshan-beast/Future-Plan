import { useId } from "react";

export default function HourglassVisual({ progress = 0, running = false }) {
  const id = useId();

  const glassId = `${id}-glass`;
  const sandId = `${id}-sand`;
  const clipId = `${id}-clip`;

  const value = Math.min(1, Math.max(0, progress));

  return (
    <div aria-hidden="true" className="relative mx-auto h-56 w-52">
      <div className="absolute inset-x-5 bottom-5 top-8 rounded-full bg-emerald-400/10 blur-2xl" />

      <svg
        viewBox="0 0 200 220"
        focusable="false"
        className="relative h-full w-full">
        <defs>
          <linearGradient id={glassId} x1="0" x2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity=".15" />
            <stop offset="50%" stopColor="#a7f3d0" stopOpacity=".06" />
            <stop offset="100%" stopColor="#34d399" stopOpacity=".25" />
          </linearGradient>

          <linearGradient id={sandId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>

          <clipPath id={clipId}>
            <path d="M57 37H143C143 75 130 88 106 106C102 109 102 113 106 116C130 134 143 147 143 184H57C57 147 70 134 94 116C98 113 98 109 94 106C70 88 57 75 57 37Z" />
          </clipPath>
        </defs>

        <ellipse
          cx="100"
          cy="204"
          rx="74"
          ry="9"
          fill="#34d399"
          opacity=".12"
        />

        <ellipse
          cx="100"
          cy="202"
          rx="66"
          ry="6"
          fill="none"
          stroke="#6ee7b7"
          strokeOpacity=".45"
        />

        <path
          d="M57 37H143C143 75 130 88 106 106C102 109 102 113 106 116C130 134 143 147 143 184H57C57 147 70 134 94 116C98 113 98 109 94 106C70 88 57 75 57 37Z"
          fill={`url(#${glassId})`}
          stroke="#6ee7b7"
          strokeOpacity=".6"
          strokeWidth="2"
        />

        <g clipPath={`url(#${clipId})`}>
          <rect
            x="55"
            y={45 + value * 63}
            width="90"
            height={(1 - value) * 63}
            fill={`url(#${sandId})`}
            opacity=".9"
          />

          {running && value < 1 && (
            <path
              d="M100 108V180"
              stroke="#d9f99d"
              strokeWidth="2"
              strokeDasharray="2 4"
            />
          )}

          <path
            d={`M48 188L100 ${184 - value * 55}L152 188Z`}
            fill={`url(#${sandId})`}
          />
        </g>

        <path
          d="M65 45C65 73 75 86 88 96"
          fill="none"
          stroke="#ecfdf5"
          strokeOpacity=".4"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M134 140C139 151 139 162 139 176"
          fill="none"
          stroke="#ecfdf5"
          strokeOpacity=".25"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <rect
          x="43"
          y="24"
          width="114"
          height="14"
          rx="7"
          fill="#1b4544"
          stroke="#6ee7b7"
          strokeOpacity=".5"
        />
        <rect
          x="43"
          y="184"
          width="114"
          height="14"
          rx="7"
          fill="#1b4544"
          stroke="#6ee7b7"
          strokeOpacity=".5"
        />

        <path
          d="M49 31H151M49 191H151"
          stroke="#a7f3d0"
          strokeOpacity=".45"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
