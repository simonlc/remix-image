"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[449],{3905:function(e,r,t){t.d(r,{Zo:function(){return c},kt:function(){return f}});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=n.createContext({}),u=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},c=function(e){var r=u(e.components);return n.createElement(i.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=u(t),f=o,d=m["".concat(i,".").concat(f)]||m[f]||p[f]||a;return t?n.createElement(d,s(s({ref:r},c),{},{components:t})):n.createElement(d,s({ref:r},c))}));function f(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=m;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l.mdxType="string"==typeof e?e:o,s[1]=l;for(var u=2;u<a;u++)s[u]=t[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6889:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return l},contentTitle:function(){return i},metadata:function(){return u},toc:function(){return c},default:function(){return m}});var n=t(7462),o=t(3366),a=(t(7294),t(3905)),s=["components"],l={sidebar_position:3},i="Cloudflare",u={unversionedId:"tutorial-extras/cloudflare",id:"tutorial-extras/cloudflare",title:"Cloudflare",description:"Some platforms like Cloudflare Workers do not support file-systems and Node packages.",source:"@site/docs/tutorial-extras/cloudflare.md",sourceDirName:"tutorial-extras",slug:"/tutorial-extras/cloudflare",permalink:"/docs/tutorial-extras/cloudflare",editUrl:"https://github.com/Josh-McFarlin/remix-image/tree/master/docs/templates/shared/docs/tutorial-extras/cloudflare.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Sharp",permalink:"/docs/tutorial-extras/sharp"},next:{title:"Creating a Cache",permalink:"/docs/advanced/creating-a-cache"}},c=[{value:"Transformer",id:"transformer",children:[],level:2},{value:"Resolver for Cloudflare Workers",id:"resolver-for-cloudflare-workers",children:[],level:2},{value:"Resolver for Cloudflare Pages",id:"resolver-for-cloudflare-pages",children:[],level:2}],p={toc:c};function m(e){var r=e.components,t=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"cloudflare"},"Cloudflare"),(0,a.kt)("p",null,"Some platforms like Cloudflare Workers do not support file-systems and Node packages.\nTherefore, you must setup Remix-Image to not use any of these packages."),(0,a.kt)("h2",{id:"transformer"},"Transformer"),(0,a.kt)("p",null,"To use ",(0,a.kt)("inlineCode",{parentName:"p"},"remix-image")," on Cloudflare and similar, use ",(0,a.kt)("inlineCode",{parentName:"p"},"MemoryCache")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"pureTransformer")," because they are pure JavaScript."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Note"),": Because of bundling issues, you must import this package from ",(0,a.kt)("inlineCode",{parentName:"p"},"remix-image/serverPure"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},'import type { LoaderFunction } from "remix";\nimport { imageLoader, MemoryCache, pureTransformer } from "remix-image/serverPure";\n\nconst config = {\n  selfUrl: "http://localhost:3000",\n  cache: new MemoryCache(),\n  transformer: pureTransformer\n};\n\nexport const loader: LoaderFunction = ({ request }) => {\n  return imageLoader(config, request);\n};\n')),(0,a.kt)("p",null,"Also, ",(0,a.kt)("inlineCode",{parentName:"p"},"pureTransformer")," is used by default, it does not need to be specified in the config.\nThis is only shown in the following example to show it must be used instead of other ",(0,a.kt)("inlineCode",{parentName:"p"},"transformer")," options."),(0,a.kt)("h2",{id:"resolver-for-cloudflare-workers"},"Resolver for Cloudflare Workers"),(0,a.kt)("p",null,"By default, ",(0,a.kt)("inlineCode",{parentName:"p"},"remix-image")," will work on Cloudflare Workers if all assets are being fetched from another server.\nIf you are trying to serve assets stored in your app's ",(0,a.kt)("inlineCode",{parentName:"p"},"public")," directory, you must use the ",(0,a.kt)("inlineCode",{parentName:"p"},"kvResolver"),"."),(0,a.kt)("p",null,"If you would like to use both ",(0,a.kt)("inlineCode",{parentName:"p"},"fetchResolver")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"fsResolver"),", you can create a custom resolver as shown below:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},'import {\n  imageLoader,\n  MemoryCache,\n  kvResolver,\n  fetchResolver,\n  Resolver\n} from "remix-image/serverPure";\n\nexport const myResolver: Resolver = async (asset, url, options) => {\n  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {\n    return kvResolver(asset, url, options);\n  } else {\n    return fetchResolver(asset, url, options);\n  }\n};\n\nconst config = {\n  selfUrl: "http://localhost:3000",\n  cache: new MemoryCache(),\n  resolver: myResolver,\n};\n\nexport const loader: LoaderFunction = ({ request }) => {\n  return imageLoader(config, request);\n};\n')),(0,a.kt)("p",null,"For an example project hosted on Cloudflare Workers, look at ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Josh-McFarlin/remix-image/tree/master/examples/cloudflare"},"this example"),"."),(0,a.kt)("h2",{id:"resolver-for-cloudflare-pages"},"Resolver for Cloudflare Pages"),(0,a.kt)("p",null,"By default, ",(0,a.kt)("inlineCode",{parentName:"p"},"remix-image")," will work on Cloudflare Pages if all assets are being fetched from another server.\nIf you are trying to serve assets stored in your app's ",(0,a.kt)("inlineCode",{parentName:"p"},"public")," directory, you must create a custom resolver that uses info from the request:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},'import {\n  imageLoader,\n  MemoryCache,\n  kvResolver,\n  fetchResolver,\n  Resolver,\n  MimeType,\n  RemixImageError\n} from "remix-image/serverPure";\n\nconst cache = new MemoryCache({\n  maxSize: 5e7,\n});\n\nexport const loader: LoaderFunction = ({ request, context }) => {\n  const SELF_URL = context?.env?.SELF_URL || context?.SELF_URL;\n\n  const resolver: Resolver = async (asset, url, options, basePath) => {\n    if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {\n      const imageResponse = await context.ASSETS.fetch(url, request.clone());\n      const arrBuff = await imageResponse.arrayBuffer();\n\n      if (!arrBuff || arrBuff.byteLength < 2) {\n        throw new RemixImageError("Invalid image retrieved from resolver!");\n      }\n\n      const buffer = new Uint8Array(arrBuff);\n      const contentType = imageResponse.headers.get(\n        "content-type"\n      )! as MimeType;\n\n      return {\n        buffer,\n        contentType,\n      };\n    } else {\n      return fetchResolver(asset, url, options, basePath);\n    }\n  };\n\n  const config = {\n    selfUrl: SELF_URL,\n    cache,\n    resolver,\n  };\n\n  return imageLoader(config, request);\n};\n')),(0,a.kt)("p",null,"This setup also requires setting an environment variable ",(0,a.kt)("inlineCode",{parentName:"p"},"SELF_URL")," with the URL of your server.\nFor development, you can set the following script in your ",(0,a.kt)("inlineCode",{parentName:"p"},"package.json"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'"dev:wrangler": "cross-env NODE_ENV=development wrangler pages dev ./public --binding \\"SELF_URL\\"=\\"http://localhost:8788\\"",\n')),(0,a.kt)("p",null,"For production, you should create the environment variable ",(0,a.kt)("inlineCode",{parentName:"p"},"SELF_URL")," on the ",(0,a.kt)("a",{parentName:"p",href:"https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables"},"Cloudflare website"),"."),(0,a.kt)("p",null,"For an example project hosted on Cloudflare Pages, look at ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Josh-McFarlin/remix-image/tree/master/examples/cloudflare-pages"},"this example"),"."))}m.isMDXComponent=!0}}]);