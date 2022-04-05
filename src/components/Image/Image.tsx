import React from "react";
import { MimeType } from "../..";
import { useResponsiveImage } from "../../hooks";
import type { ResponsiveSize, SizelessOptions } from "../../types/image";

export interface ImageProps extends React.ComponentProps<"img"> {
  loaderUrl?: string;
  responsive?: ResponsiveSize[];
  options?: SizelessOptions;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      loaderUrl = "/api/image",
      responsive = [],
      options = {},
      ...imgProps
    },
    ref
  ) => {
    const responsiveProps = useResponsiveImage(
      imgProps,
      loaderUrl,
      responsive,
      options
    );

    const avifProps = useResponsiveImage(imgProps, loaderUrl, responsive, {
      ...options,
      contentType: MimeType.AVIF,
    });

    const webpProps = useResponsiveImage(imgProps, loaderUrl, responsive, {
      ...options,
      contentType: MimeType.WEBP,
    });

    // const avifSrc = avifProps.src.replace(/\.(jpg|jpeg|png)&/, '.avif&');
    // const webpSrc = webpProps.src.replace(/\.(jpg|jpeg|png)&/, '.webp&');

    return (
      <picture>
        <source srcSet={avifProps.src} type="image/avif" />
        <source srcSet={webpProps.src} type="image/webp" />
        <img
          ref={ref}
          className={className}
          {...imgProps}
          {...responsiveProps}
        />
      </picture>
    );
  }
);

Image.displayName = "Image";
