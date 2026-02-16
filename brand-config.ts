/**
 * WHITE-LABEL QR CODE GENERATOR - BRAND CONFIGURATION
 *
 * This is the ONLY file you need to modify for each client.
 * All brand-specific settings are isolated here.
 */

// Import QR options from the JSON file exported from qr-code-styling
import qrOptionsJson from "./qr-options.json";
import { Options } from "qr-code-styling";

// TypeScript interfaces for type safety
interface ClientBranding {
  name: string;
  logo: string | null;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
}

interface FramePosition {
  x: number;
  y: number;
  qrSize: number;
}

interface Frame {
  svg: string;
  position: FramePosition;
  width: number;
  height: number;
}

interface Frames {
  [key: string]: Frame;
}

interface LogoConfig {
  enabled: boolean;
  url: string | null;
}

interface ExportFormat {
  type: string;
  quality: number;
}

interface ExportSettings {
  formats: {
    [key: string]: ExportFormat;
  };
}

export const BRAND_SETTINGS = {
  // ============================================
  // CLIENT BRANDING (UI Appearance)
  // ============================================
  clientBranding: {
    name: "Example Fiverr QR Code Client", // Client name for display in UI
    logo: "/logo.svg", // Path to logo in /public folder (or null if no logo)
    colors: {
      primary: "#1BC073", // Gold
      secondary: "#ffffff", // Deep black
      accent: "#2a2a2aff", // Beige/cream
      background: "#ffffff", // Almost black
      surface: "#ffffff", // Card background
      text: "#404145", // Light text
    },
  } as ClientBranding,

  // ============================================
  // QR CODE STYLING (imported from qr-options.json)
  // ============================================
  qrOptions: {
    width: qrOptionsJson.width,
    height: qrOptionsJson.height,
    type: qrOptionsJson.type,
    margin: qrOptionsJson.margin,
    data: "https://example.com", // Default data, will be overridden

    // QR Code shape and style
    dotsOptions: qrOptionsJson.dotsOptions,

    // Corner squares (position detection patterns)
    cornersSquareOptions: qrOptionsJson.cornersSquareOptions,

    // Corner dots (inner dots of position detection patterns)
    cornersDotOptions: qrOptionsJson.cornersDotOptions,

    // Background
    backgroundOptions: qrOptionsJson.backgroundOptions,

    // QR Options
    qrOptions: {
      ...qrOptionsJson.qrOptions,
      typeNumber: parseInt(qrOptionsJson.qrOptions.typeNumber, 10),
    },

    // Logo in center of QR code (optional)
    imageOptions: qrOptionsJson.imageOptions,
  } as Omit<Options, "data"> & { data: string },

  // ============================================
  // FRAMES (Multiple frame options)
  // ============================================
  frames: {
    none: {
      svg: '<svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg"><rect width="3000" height="3000" fill="white"/></svg>',
      position: { x: 350, y: 350, qrSize: 2300 },
      width: 3000,
      height: 3000,
    },
    elegant: {
      svg: '<svg width="3000" height="4160" viewBox="0 0 3000 4160" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="3000" height="4160" fill="white"/></svg>',
      position: { x: 350, y: 440, qrSize: 2300 },
      width: 3000,
      height: 4160,
    },
    minimal: {
      svg: '<svg width="6335" height="3208" viewBox="0 0 6335 3208" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="6315" height="3188" rx="390" fill="white" stroke="black" stroke-width="20"/><rect x="10" y="10" width="3121" height="3188" rx="390" fill="black" stroke="black" stroke-width="20"/></svg>',
      position: { x: 650, y: 454, qrSize: 2300 },
      width: 6335,
      height: 3208,
    },
  } as Frames,

  // ============================================
  // DEFAULT FRAME
  // ============================================
  defaultFrame: "elegant",

  // ============================================
  // EXPORT SETTINGS
  // ============================================
  exportSettings: {
    formats: {
      png: {
        type: "image/png",
        quality: 1,
      },
      jpeg: {
        type: "image/jpeg",
        quality: 0.95,
      },
      jpg: {
        type: "image/jpeg",
        quality: 0.95,
      },
      webp: {
        type: "image/webp",
        quality: 0.95,
      },
      svg: {
        type: "image/svg+xml",
        quality: 1,
      },
    },
  } as ExportSettings,
} as const;

// ============================================
// LOGO CONFIGURATION
// ============================================
export const BRAND_LOGO: LogoConfig = {
  enabled: true,
  url: "/logo.svg", // Path to logo in /public folder
};
