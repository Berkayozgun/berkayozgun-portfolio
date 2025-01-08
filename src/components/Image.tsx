interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const Image = ({ src, alt, width, height, className }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading='lazy'
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/placeholder.png"; // Yedek resim
      }}
    />
  );
};

export default Image;
