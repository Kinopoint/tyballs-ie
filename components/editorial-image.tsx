import Image from "next/image";

type EditorialImageProps = {
  alt: string;
  className?: string;
  height: number;
  name: "drive-arrival" | "drive-dance" | "drive-dinner" | "drive-garden" | "drive-group" | "drive-photobooth";
  priority?: boolean;
  sizes?: string;
  width: number;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function EditorialImage({ alt, className, height, name, priority = false, sizes = "(max-width: 760px) 100vw, 50vw", width }: EditorialImageProps) {
  const path = `${basePath}/images/${name}`;

  return (
    <picture className={className}>
      <Image alt={alt} height={height} preload={priority} sizes={sizes} src={`${path}.webp`} width={width} />
    </picture>
  );
}
