"use client";

export default function PetSliderImage() {
  return (
    <div className="pet-rules-slider">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="pet-rules-slider__img"
        src="/src/dog_breeds/slide_01.png"
        alt="犬種制限の説明"
        width={276}
        height={191}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}
