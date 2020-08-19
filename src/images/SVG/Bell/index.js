import React, { memo } from "react"
import "../styles.css"

const Bell = ({ className }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 448 512"
    className={className}
  >
    <path
      fill="currentColor"
      d="M448 384c-.1 16.4-13 32-32.1 32H32.08C13 416 .09 400.4 0 384a31.25 31.25 0 0 1 8.61-21.71c19.32-20.76 55.47-52 55.47-154.29 0-77.7 54.48-139.9 127.94-155.16V32a32 32 0 1 1 64 0v20.84C329.42 68.1 383.9 130.3 383.9 208c0 102.3 36.15 133.53 55.47 154.29A31.27 31.27 0 0 1 448 384z"
      className="fa-secondary"
    ></path>
    <path
      fill="#ecf0f1"
      d="M160 448h128a64 64 0 0 1-128 0z"
      className="fa-primary"
    ></path>
  </svg>
)

Bell.defaultProps = {
  className: "DefaultSvgClassName"
}

export default memo(Bell)
