import { Transition } from 'framer-motion';

declare const springs: {
    /** Spring fast spatial — large element translation */
    fastSpatial: Transition;
    /** Spring fast visual effects — scale/fade of small elements */
    fastVisual: Transition;
    /** Spring fast default */
    fastDefault: Transition;
    /** Spring default spatial */
    defaultSpatial: Transition;
    /** Spring default visual effects */
    defaultVisual: Transition;
    /** Spring slow spatial */
    slowSpatial: Transition;
    /** Spring slow visual effects */
    slowVisual: Transition;
    /** Expressive spatial — energetic move-in of large transitions */
    expressiveSpatial: Transition;
    /** Expressive effects — shape morphs and playful transforms */
    expressiveEffects: Transition;
    /** Expressive default — THE signature bouncy M3E spring */
    expressive: Transition;
    /** Bouncier variant for celebratory moments */
    bouncy: Transition;
};
type M3Spring = (typeof springs)[keyof typeof springs];
declare const easings: {
    readonly standard: "cubic-bezier(0.2, 0, 0, 1)";
    readonly standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)";
    readonly standardDecelerate: "cubic-bezier(0, 0, 0, 1)";
    readonly emphasized: "cubic-bezier(0.2, 0, 0, 1)";
    readonly emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)";
    readonly emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)";
    readonly linear: "linear";
};
declare const durations: {
    readonly short1: 50;
    readonly short2: 100;
    readonly short3: 150;
    readonly short4: 200;
    readonly medium1: 250;
    readonly medium2: 300;
    readonly medium3: 350;
    readonly medium4: 400;
    readonly long1: 450;
    readonly long2: 500;
    readonly long3: 550;
    readonly long4: 600;
    readonly extraLong1: 700;
    readonly extraLong2: 800;
    readonly extraLong3: 900;
    readonly extraLong4: 1000;
};
declare const shapes: {
    readonly none: "0px";
    readonly extraSmall: "4px";
    readonly small: "8px";
    readonly medium: "12px";
    readonly large: "16px";
    readonly largeIncreased: "20px";
    readonly extraLarge: "28px";
    readonly extraExtraLarge: "36px";
    readonly full: "9999px";
};
/** Shape morph pairs used by expressive press interactions */
declare const shapeMorph: {
    /** buttons: rest = full (pill) → pressed = largeIncreased */
    readonly button: {
        readonly rest: "9999px";
        readonly pressed: "20px";
    };
    /** cards: rest = medium → pressed = small */
    readonly card: {
        readonly rest: "12px";
        readonly pressed: "8px";
    };
};
declare const stateOpacities: {
    readonly hover: 0.08;
    readonly focus: 0.1;
    readonly pressed: 0.1;
    readonly dragged: 0.16;
};
declare const typeScale: {
    readonly displayLarge: {
        readonly fontSize: 57;
        readonly lineHeight: 64;
        readonly letterSpacing: -0.25;
        readonly weight: 400;
    };
    readonly displayMedium: {
        readonly fontSize: 45;
        readonly lineHeight: 52;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly displaySmall: {
        readonly fontSize: 36;
        readonly lineHeight: 44;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly headlineLarge: {
        readonly fontSize: 32;
        readonly lineHeight: 40;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly headlineMedium: {
        readonly fontSize: 28;
        readonly lineHeight: 36;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly headlineSmall: {
        readonly fontSize: 24;
        readonly lineHeight: 32;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly titleLarge: {
        readonly fontSize: 22;
        readonly lineHeight: 28;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly titleMedium: {
        readonly fontSize: 16;
        readonly lineHeight: 24;
        readonly letterSpacing: 0.15;
        readonly weight: 500;
    };
    readonly titleSmall: {
        readonly fontSize: 14;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.1;
        readonly weight: 500;
    };
    readonly bodyLarge: {
        readonly fontSize: 16;
        readonly lineHeight: 24;
        readonly letterSpacing: 0.5;
        readonly weight: 400;
    };
    readonly bodyMedium: {
        readonly fontSize: 14;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.25;
        readonly weight: 400;
    };
    readonly bodySmall: {
        readonly fontSize: 12;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.4;
        readonly weight: 400;
    };
    readonly labelLarge: {
        readonly fontSize: 14;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.1;
        readonly weight: 500;
    };
    readonly labelMedium: {
        readonly fontSize: 12;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.5;
        readonly weight: 500;
    };
    readonly labelSmall: {
        readonly fontSize: 11;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.5;
        readonly weight: 500;
    };
};
declare const elevations: readonly [0, 1, 2, 3, 4, 5];
type Elevation = (typeof elevations)[number];
declare const colorRoles: readonly [{
    readonly token: "primary";
    readonly light: "#6750A4";
    readonly dark: "#D0BCFF";
    readonly usage: "Primary actions, key components, FABs";
}, {
    readonly token: "on-primary";
    readonly light: "#FFFFFF";
    readonly dark: "#381E72";
    readonly usage: "Text/icons on primary";
}, {
    readonly token: "primary-container";
    readonly light: "#E9DDFF";
    readonly dark: "#4F378B";
    readonly usage: "Tonal containers, selected states";
}, {
    readonly token: "on-primary-container";
    readonly light: "#22005D";
    readonly dark: "#EADDFF";
    readonly usage: "Content inside primary containers";
}, {
    readonly token: "secondary";
    readonly light: "#625B71";
    readonly dark: "#CCC2DC";
    readonly usage: "Less prominent components";
}, {
    readonly token: "secondary-container";
    readonly light: "#E8DEF8";
    readonly dark: "#4A4458";
    readonly usage: "Secondary tonal containers";
}, {
    readonly token: "tertiary";
    readonly light: "#7E5260";
    readonly dark: "#EFB8C8";
    readonly usage: "Contrasting accents (badges, FABs)";
}, {
    readonly token: "tertiary-container";
    readonly light: "#FFD9E2";
    readonly dark: "#633B48";
    readonly usage: "Tertiary tonal containers";
}, {
    readonly token: "error";
    readonly light: "#B3261E";
    readonly dark: "#F2B8B5";
    readonly usage: "Error states, destructive actions";
}, {
    readonly token: "error-container";
    readonly light: "#F9DEDC";
    readonly dark: "#8C1D18";
    readonly usage: "Error containers and highlights";
}, {
    readonly token: "surface";
    readonly light: "#FEF7FF";
    readonly dark: "#141218";
    readonly usage: "Default backgrounds";
}, {
    readonly token: "surface-container-lowest";
    readonly light: "#FFFFFF";
    readonly dark: "#0F0D13";
    readonly usage: "Lowest emphasis containers (cards)";
}, {
    readonly token: "surface-container-low";
    readonly light: "#F7F2FA";
    readonly dark: "#1D1B20";
    readonly usage: "Low emphasis containers";
}, {
    readonly token: "surface-container";
    readonly light: "#F3EDF7";
    readonly dark: "#211F26";
    readonly usage: "Medium emphasis (sheets, menus)";
}, {
    readonly token: "surface-container-high";
    readonly light: "#ECE6F0";
    readonly dark: "#2B2930";
    readonly usage: "High emphasis (nav drawers)";
}, {
    readonly token: "surface-container-highest";
    readonly light: "#E6E0E9";
    readonly dark: "#36343B";
    readonly usage: "Highest emphasis (dialogs)";
}, {
    readonly token: "on-surface";
    readonly light: "#1D1B20";
    readonly dark: "#E6E0E9";
    readonly usage: "Primary text/icons";
}, {
    readonly token: "on-surface-variant";
    readonly light: "#49454F";
    readonly dark: "#CAC4D0";
    readonly usage: "Secondary text/icons";
}, {
    readonly token: "outline";
    readonly light: "#79747E";
    readonly dark: "#938F99";
    readonly usage: "Borders, dividers, interactive strokes";
}, {
    readonly token: "outline-variant";
    readonly light: "#CAC4D0";
    readonly dark: "#49454F";
    readonly usage: "Decorative strokes, dividers";
}, {
    readonly token: "inverse-surface";
    readonly light: "#322F35";
    readonly dark: "#E6E0E9";
    readonly usage: "Snackbars, tooltips";
}, {
    readonly token: "inverse-on-surface";
    readonly light: "#F5EFF7";
    readonly dark: "#322F35";
    readonly usage: "Text on inverse surfaces";
}, {
    readonly token: "inverse-primary";
    readonly light: "#D0BCFF";
    readonly dark: "#6750A4";
    readonly usage: "Accents on inverse surfaces";
}, {
    readonly token: "scrim";
    readonly light: "#000000";
    readonly dark: "#000000";
    readonly usage: "Scrim over modal content";
}];
/** CSS variable string for a color role token, e.g. "primary-container" → "var(--md-primary-container)" */
declare function colorVar(token: string): string;
/** M3 supported color palettes for components (primary/secondary/tertiary/error) */
declare const paletteColor: {
    readonly primary: "primary";
    readonly secondary: "secondary";
    readonly tertiary: "tertiary";
    readonly error: "error";
};
type PaletteColor = keyof typeof paletteColor;

export { type Elevation, type M3Spring, type PaletteColor, colorRoles, colorVar, durations, easings, elevations, paletteColor, shapeMorph, shapes, springs, stateOpacities, typeScale };
