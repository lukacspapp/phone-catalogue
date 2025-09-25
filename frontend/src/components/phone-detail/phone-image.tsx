import { AspectRatio } from '@/components/ui/aspect-ratio'; // if added

interface PhoneImageProps {
  src: string;
  alt: string;
}

export function PhoneImage({ src, alt }: PhoneImageProps) {
  return (
    <div className="space-y-4">
      <AspectRatio ratio={1} className="overflow-hidden rounded-lg border">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}