// Tiny shimmer SVG used as blurDataURL — gives a soft beige flash while images load
const shimmerSvg = (w: number, h: number) => `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g"><stop stop-color="#ebe3cf" offset="0%"/><stop stop-color="#faf5e8" offset="50%"/><stop stop-color="#ebe3cf" offset="100%"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#f3eedf"/><rect width="${w}" height="${h}" fill="url(#g)" opacity="0.55"/></svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const shimmer = (w = 600, h = 400) =>
  `data:image/svg+xml;base64,${toBase64(shimmerSvg(w, h))}`;
