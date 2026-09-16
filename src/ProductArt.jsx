import { useId } from "react";

export default function ProductArt({
  type = "counter",
  color = "Chalk",
  className = "",
}) {
  const id = useId().replaceAll(":", "");
  const body =
    color === "Ocean" ? "#64838a" : color === "Sage" ? "#a7b7a3" : "#e8e8df";
  return (
    <svg
      className={`product-art ${className}`}
      viewBox="0 0 500 520"
      role="img"
      aria-label={`${color} Filtra ${type === "counter" ? "countertop water purifier" : type === "pitcher" ? "filter pitcher" : "replacement filter"}`}
    >
      <defs>
        <linearGradient id={`${id}body`} x1="0" x2="1">
          <stop stopColor={body} />
          <stop offset=".45" stopColor="#fffef5" />
          <stop offset="1" stopColor={body} />
        </linearGradient>
        <linearGradient id={`${id}dark`}>
          <stop stopColor="#284247" />
          <stop offset=".5" stopColor="#132b2e" />
          <stop offset="1" stopColor="#3c5354" />
        </linearGradient>
        <linearGradient id={`${id}glass`} x1="0" x2="1">
          <stop stopColor="#8dc0bc" stopOpacity=".6" />
          <stop offset=".3" stopColor="#ecfffa" stopOpacity=".6" />
          <stop offset=".8" stopColor="#7cb5b2" stopOpacity=".5" />
          <stop offset="1" stopColor="#d4ece7" stopOpacity=".9" />
        </linearGradient>
        <filter
          id={`${id}shadow`}
          x="-50%"
          y="-100%"
          width="200%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <ellipse
        cx="255"
        cy="468"
        rx="145"
        ry="17"
        fill="#143d3c"
        opacity=".15"
        filter={`url(#${id}shadow)`}
      />
      {type === "counter" ? (
        <g>
          <path
            d="M127 128Q127 92 165 88L330 74Q367 72 374 106L397 408Q400 438 367 447L179 468Q141 469 138 435Z"
            fill={`url(#${id}body)`}
          />
          <path
            d="M330 75Q366 72 374 106L397 408Q400 438 367 447L335 451L320 111Z"
            fill="#8f9f95"
            opacity=".32"
          />
          <path
            d="M141 133Q141 110 164 108L308 97Q332 95 334 121L344 288L149 306Z"
            fill={`url(#${id}dark)`}
          />
          <path d="M154 147L324 134" stroke="#7c8c86" strokeWidth="1" />
          <text
            x="238"
            y="184"
            fill="#eff5ec"
            textAnchor="middle"
            fontSize="20"
            fontFamily="Arial"
            letterSpacing="2"
          >
            filtra.
          </text>
          <circle
            cx="242"
            cy="220"
            r="16"
            fill="none"
            stroke="#acc9b4"
            strokeWidth="1.5"
          />
          <path d="M242 209V220" stroke="#d2edc8" strokeWidth="2" />
          <path
            d="M236 215a9 9 0 1012 0"
            fill="none"
            stroke="#d2edc8"
            strokeWidth="1.5"
          />
          <rect x="222" y="260" width="42" height="12" rx="4" fill="#0b2528" />
          <path
            d="M151 309L343 291L349 416L159 438Z"
            fill="#607671"
            opacity=".3"
          />
          <path d="M181 412L320 398L337 417L165 437Z" fill="#7d8b81" />
          <path
            d="M175 422L325 408M190 428L334 414"
            stroke="#344e47"
            opacity=".5"
          />
          <path
            d="M205 326L283 320L280 396Q245 414 213 401Z"
            fill={`url(#${id}glass)`}
            stroke="#d6e7db"
            strokeWidth="2"
          />
          <ellipse
            cx="244"
            cy="324"
            rx="39"
            ry="7"
            fill="#eaf5ec"
            opacity=".7"
          />
          <path
            d="M210 355L282 350L280 396Q245 414 213 401Z"
            fill="#a7d8d0"
            opacity=".6"
          />
          <path
            d="M220 333L225 390"
            stroke="#fff"
            strokeWidth="3"
            opacity=".65"
          />
          <circle cx="308" cy="272" r="3" fill="#c2e6b9" />
          <text
            x="246"
            y="451"
            fill="#64796d"
            fontSize="8"
            textAnchor="middle"
            letterSpacing="3"
          >
            PURE, BY NATURE.
          </text>
        </g>
      ) : type === "pitcher" ? (
        <g>
          <path
            d="M304 176Q412 157 404 264Q400 327 329 337"
            fill="none"
            stroke={body}
            strokeWidth="28"
          />
          <path
            d="M139 166L331 156L315 414Q239 450 157 421Z"
            fill={`url(#${id}glass)`}
            stroke="#d8eee5"
            strokeWidth="3"
          />
          <path
            d="M147 287L323 278L315 414Q239 450 157 421Z"
            fill="#7bbcb7"
            opacity=".42"
          />
          <path
            d="M199 177L278 173L270 307Q236 321 207 310Z"
            fill={`url(#${id}body)`}
          />
          <path
            d="M127 155Q137 127 178 127L302 121Q332 125 339 151L332 183L150 195Z"
            fill={`url(#${id}body)`}
          />
          <path d="M127 156L107 142L118 182L151 195" fill={body} />
          <path
            d="M175 218L185 397"
            stroke="white"
            strokeWidth="5"
            opacity=".5"
          />
          <text
            x="235"
            y="372"
            fontSize="27"
            fill="#39665f"
            textAnchor="middle"
          >
            filtra.
          </text>
        </g>
      ) : (
        <g>
          <rect
            x="168"
            y="129"
            width="156"
            height="305"
            rx="38"
            fill={`url(#${id}body)`}
          />
          <ellipse cx="246" cy="133" rx="76" ry="22" fill="#f6f6ec" />
          <ellipse cx="246" cy="128" rx="37" ry="12" fill="#72958c" />
          <rect x="168" y="206" width="156" height="112" fill="#b9cec0" />
          <text
            x="246"
            y="254"
            textAnchor="middle"
            fill="#214b44"
            fontSize="30"
          >
            filtra.
          </text>
          <text
            x="246"
            y="277"
            textAnchor="middle"
            fill="#214b44"
            fontSize="9"
            letterSpacing="2"
          >
            FRESH START
          </text>
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d={`M${182 + i * 12} 335v65`}
              stroke="#bcc4b7"
              strokeWidth="2"
            />
          ))}
        </g>
      )}
    </svg>
  );
}
