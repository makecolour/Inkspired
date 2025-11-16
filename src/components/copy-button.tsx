"use client";

import type { MouseEvent } from "react";

interface CopyButtonProps {
  content: string;
}

export default function CopyButton(props: CopyButtonProps) {
  const { content } = props;

  const handleCopyButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        const target = event.target as HTMLButtonElement;
        target.classList.add("copied");

        setTimeout(() => {
          target.classList.remove("copied");
          target.blur(); // Remove focus
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <button
      className="copy"
      onClick={handleCopyButtonClick}
      title="Copy Code"
    ></button>
  );
}
