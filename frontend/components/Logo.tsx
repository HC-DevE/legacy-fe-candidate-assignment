"use client";

import Image from "next/image";

export function Logo({ className = "w-12 h-12 rounded-xl" }: { className?: string }) {
  return (
      <Image
        src="/ethers-logo.webp"
        className={className}
        width={48}
        height={48}
        alt={""}
      />
  );
}
