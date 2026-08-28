import { NextRequest, NextResponse } from "next/server";
import {
  generateScheme,
  schemeToCssVars,
  normalizeHex,
  normalizeVariant,
  variantIds,
} from "@/lib/m3/theme-builder";

/**
 * GET /api/theme-builder
 *
 * Generate a complete Material 3 color scheme (light + dark) from a seed
 * color using Google's official Dynamic Color engine — the same algorithm
 * behind Material Theme Builder. Designed for AI agents and external tools.
 *
 * Query params:
 *   seed      hex color, 3 or 6 digits, "#" optional (default #6750A4)
 *   variant   tonal-spot | vibrant | expressive | content | fidelity | rainbow | fruit-salad
 *   contrast  0 (standard) | 0.5 (medium) | 1 (high) — any number 0..1, clamped
 *
 * 200 → { seed, variant, contrast, light, dark, css: { lightBlock, darkBlock } }
 * 400 → { error } on invalid seed or variant
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const rawSeed = params.get("seed") ?? "#6750A4";
  const rawVariant = params.get("variant") ?? "tonal-spot";
  const rawContrast = params.get("contrast") ?? "0";

  const seed = normalizeHex(rawSeed);
  if (!seed) {
    return NextResponse.json(
      { error: `Invalid seed color "${rawSeed}". Use a 3 or 6 digit hex value, e.g. ?seed=#6750A4.` },
      { status: 400 }
    );
  }

  const variant = normalizeVariant(rawVariant);
  if (!variant) {
    return NextResponse.json(
      { error: `Invalid variant "${rawVariant}". Valid variants: ${variantIds.join(", ")}.` },
      { status: 400 }
    );
  }

  const contrastNum = Number(rawContrast);
  if (rawContrast !== "" && !Number.isFinite(contrastNum)) {
    return NextResponse.json(
      { error: `Invalid contrast "${rawContrast}". Use a number between 0 and 1 (0, 0.5 or 1).` },
      { status: 400 }
    );
  }
  const contrast = Math.min(1, Math.max(0, Number.isFinite(contrastNum) ? contrastNum : 0));

  const result = generateScheme(seed, variant, contrast);
  const css = schemeToCssVars(result);

  return NextResponse.json(
    {
      seed,
      variant,
      contrast,
      light: result.light,
      dark: result.dark,
      css,
    },
    { headers: { "Cache-Control": "public, max-age=3600, immutable" } }
  );
}
