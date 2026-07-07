/** Mix a channel toward white (0–1). */
function lightenChannel(value: number, amount: number): number {
  return Math.round(value + (255 - value) * amount);
}

export function lightenRgb(
  r: number,
  g: number,
  b: number,
  amount = 0.84,
): string {
  return `rgb(${lightenChannel(r, amount)}, ${lightenChannel(g, amount)}, ${lightenChannel(b, amount)})`;
}

export function rgbFromImageData(data: Uint8ClampedArray): {
  r: number;
  g: number;
  b: number;
} | null {
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 40) continue;

    const pr = data[i];
    const pg = data[i + 1];
    const pb = data[i + 2];

    // Skip near-white / near-black pixels for a more representative hue.
    if (pr > 245 && pg > 245 && pb > 245) continue;
    if (pr < 12 && pg < 12 && pb < 12) continue;

    r += pr;
    g += pg;
    b += pb;
    count += 1;
  }

  if (!count) return null;

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}

export function sampleColorFromCanvas(
  source: CanvasImageSource,
  width: number,
  height: number,
): string | null {
  const canvas = document.createElement("canvas");
  const size = 48;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(source, 0, 0, width, height, 0, 0, size, size);
  const rgb = rgbFromImageData(ctx.getImageData(0, 0, size, size).data);
  return rgb ? lightenRgb(rgb.r, rgb.g, rgb.b) : null;
}
