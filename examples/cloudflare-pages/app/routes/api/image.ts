import type { LoaderFunction } from "remix";
import {
  imageLoader,
  MemoryCache,
  fetchResolver,
  Resolver,
} from "remix-image/serverPure";
import { MimeType } from "../../../../../src";

const cache = new MemoryCache({
  maxSize: 5e7,
});

export const loader: LoaderFunction = ({ request, context }) => {
  const SELF_URL = context?.SELF_URL || context?.env?.SELF_URL;

  const resolver: Resolver = async (asset, url, options, basePath) => {
    if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
      console.log("url", url);
      const fetchUrl = new URL("build/" + url, SELF_URL).toString();
      console.log("fetchurl", fetchUrl);
      const imgRequest = new Request(fetchUrl);
      const imageResponse = await context.ASSETS.fetch(
        imgRequest.url,
        imgRequest
      );
      console.log("status", imageResponse.status, imageResponse.statusText);
      const arrBuff = await imageResponse.arrayBuffer();
      console.log("arr", arrBuff);

      const buffer = new Uint8Array(arrBuff);
      const contentType = imageResponse.headers.get(
        "content-type"
      )! as MimeType;

      return {
        buffer,
        contentType,
      };
    } else {
      return fetchResolver(asset, url, options, basePath);
    }
  };

  const config = {
    selfUrl: SELF_URL,
    //cache,
    resolver,
  };

  return imageLoader(config, request);
};
