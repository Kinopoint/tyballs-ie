type EditorialImageProps = {
  alt: string;
  className?: string;
  height: number;
  name: "drive-arrival" | "drive-dance" | "drive-dinner" | "drive-garden" | "drive-group" | "drive-photobooth";
  priority?: boolean;
  width: number;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function EditorialImage({ alt, className, height, name, priority = false, width }: EditorialImageProps) {
  const path = `${basePath}/images/${name}`;

  return (
    <picture className={className}>
      <source srcSet={`${path}.webp`} type="image/webp" />
      <img alt={alt} decoding={priority ? "sync" : "async"} height={height} loading={priority ? "eager" : "lazy"} src={`${path}.jpg`} width={width} />
    </picture>
  );
}
