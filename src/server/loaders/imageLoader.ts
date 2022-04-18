import { redirect } from "@remix-run/server-runtime";
import mimeFromBuffer from "mime-tree";
import {
  ImageFit,
  ImagePosition,
  MimeType,
  TransformOptions,
} from "../../types";
import { RemixImageError } from "../../types/error";
import type { AssetLoader } from "../../types/loader";
import { imageResponse, textResponse } from "../../utils/response";
import { decodeQuery, decodeTransformQuery, parseURL } from "../../utils/url";
import { fetchResolver } from "../resolvers/fetchResolver";
import { pureTransformer } from "../transformers";

export const imageLoader: AssetLoader = async (
  {
    selfUrl,
    cache = null,
    resolver = fetchResolver,
    transformer = pureTransformer,
    defaultOptions = {},
    redirectOnFail = false,
    skipFormats = new Set([MimeType.SVG]),
    basePath = "public",
  },
  request
) => {
  const reqUrl = parseURL(request.url);
  let src: string | null = null;

  try {
    if (!selfUrl) {
      throw new RemixImageError(
        "selfUrl is required in RemixImage loader config!",
        500
      );
    }

    src = decodeQuery(reqUrl.searchParams, "src");

    if (!src) {
      throw new RemixImageError("An image URL must be provided!", 400);
    }
    try {
      src = decodeURI(src);
    } catch (error) {
      throw new RemixImageError("An invalid image URL was provided!", 400);
    }

    const decodedQuery = decodeTransformQuery(reqUrl.search);
    const transformOptions: TransformOptions = {
      fit: ImageFit.CONTAIN,
      position: ImagePosition.CENTER,
      background: [0x00, 0x00, 0x00, 0x00],
      quality: 80,
      compressionLevel: 9,
      loop: 0,
      delay: 100,
      blurRadius: null,
      rotate: null,
      flip: null,
      ...defaultOptions,
      ...decodedQuery,
    } as TransformOptions;

    const assetUrl = parseURL(src, selfUrl);

    if (!transformOptions.width) {
      throw new RemixImageError("A width is required!", 400);
    }
    if (transformOptions.width && transformOptions.width > 8000) {
      throw new RemixImageError("Requested Image too large!", 406);
    }
    if (transformOptions.height && transformOptions.height > 8000) {
      throw new RemixImageError("Requested Image too large!", 406);
    }

    const cacheKey = reqUrl.search;
    let isNewImage = true;
    let shouldTransform = true;
    let loadedImg: Uint8Array | undefined;
    let resultImg: Uint8Array | undefined;
    let inputContentType: MimeType | undefined;
    let outputContentType: MimeType | undefined;

    if (cache && (await cache.has(cacheKey))) {
      const cacheValue = await cache.get(cacheKey);

      if (cacheValue) {
        console.log(`Retrieved image [${cacheKey}] from cache.`);
        isNewImage = false;
        shouldTransform = false;

        loadedImg = cacheValue;
        inputContentType = mimeFromBuffer(loadedImg);
      }
    }

    if (!loadedImg) {
      const res = await resolver(
        src,
        assetUrl.toString(),
        transformOptions,
        basePath
      );

      console.log(
        `Fetched image [${cacheKey}] directly using resolver: ${resolver.name}.`
      );
      isNewImage = true;
      shouldTransform = true;

      loadedImg = res.buffer;
      inputContentType = res.contentType;
    }

    if (!loadedImg || !inputContentType) {
      throw new RemixImageError("Failed to transform requested image!", 500);
    }

    // TODO Ignore since we want 3 types by default
    if (!transformOptions.contentType) {
      console.log("here contenttype", inputContentType);
      outputContentType = inputContentType;
    } else {
      outputContentType = transformOptions.contentType;
    }

    if (!shouldTransform || skipFormats?.has(inputContentType)) {
      resultImg = loadedImg;
    } else if (transformer != null) {
      const curTransformer = transformer;

      resultImg = await curTransformer.transform(
        {
          url: assetUrl.toString(),
          data: loadedImg,
          contentType: inputContentType!,
        },
        {
          ...transformOptions,
          width: transformOptions.width,
          height: transformOptions.height,
          contentType: outputContentType!,
        }
      );

      console.log(
        `Successfully transformed image using transformer: ${curTransformer.name}`
      );
    }

    if (!resultImg) {
      throw new RemixImageError("Failed to transform requested image!", 500);
    }

    if (isNewImage && cache) {
      await cache.set(cacheKey, resultImg);
    }

    return imageResponse(
      resultImg,
      200,
      outputContentType,
      cache
        ? `private, max-age=${cache.config.ttl}, max-stale=${cache.config.tbd}`
        : `public, max-age=${60 * 60 * 24 * 365}`
    );
  } catch (error: any) {
    console.error("RemixImage loader error:", error?.message);
    console.error(error);

    if (redirectOnFail && src) {
      return redirect(src);
    }

    if (error instanceof RemixImageError) {
      return textResponse(error.errorCode || 500, error.message);
    } else {
      return textResponse(500, "RemixImage encountered an unknown error!");
    }
  }
};
