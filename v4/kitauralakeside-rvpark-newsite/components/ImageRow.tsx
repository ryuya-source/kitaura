"use client";

import { useEffect, useState } from "react";

type ImageRowProps = {
  folder: string;
  fallbackNames?: string[];
  "aria-label"?: string;
};

export default function ImageRow({
  folder,
  fallbackNames = [],
  "aria-label": ariaLabel,
}: ImageRowProps) {
  const [names, setNames] = useState<string[]>(fallbackNames);
  const [useFolder, setUseFolder] = useState(true);
  const base = `/src/${folder}/`;

  useEffect(() => {
    fetch(`${base}list.json`)
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => [])
      .then((list: unknown) => {
        if (Array.isArray(list) && list.length > 0) {
          setNames(list);
          setUseFolder(true);
        } else if (fallbackNames.length > 0) {
          setNames(fallbackNames);
          setUseFolder(true);
        }
      });
  }, [folder, base, fallbackNames.join(",")]);

  return (
    <div
      className="image-row"
      role="list"
      aria-label={ariaLabel}
    >
      {names.map((name) => (
        <img
          key={name}
          className="thumb-img"
          src={useFolder ? `${base}${name}` : name}
          alt=""
          width={120}
          height={120}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ))}
    </div>
  );
}
