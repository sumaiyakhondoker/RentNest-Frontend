
"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  title: string;
  picture: string | null;
};

const PLACEHOLDER = "/property-placeholder.png";

const PropertyImage=({
  title,
  picture,
}: Props)=> {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const imageUrl = picture?.trim() || "";

  let validUrl = false;

  try {
    const url = new URL(imageUrl);
    validUrl =
      url.protocol === "https:" ||
      url.protocol === "http:";
  } catch {
    validUrl = false;
  }

  const imageSrc =
    validUrl && failedUrl !== imageUrl
      ? imageUrl
      : PLACEHOLDER;

  return (
    <section aria-label="Property image">
      <div className="relative h-70 overflow-hidden rounded-xl bg-muted sm:h-95 lg:h-112.5">
        <Image
          key={imageSrc}
          src={imageSrc}
          alt={title}
          fill
          priority
          unoptimized
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          onError={() => {
            if (imageSrc !== PLACEHOLDER) {
              setFailedUrl(imageUrl);
            }
          }}
        />
      </div>
    </section>
  );
}


export default  PropertyImage