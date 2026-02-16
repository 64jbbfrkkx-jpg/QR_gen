"use client";

import { useState, useEffect, useRef } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";
import { BRAND_SETTINGS, BRAND_LOGO } from "../brand-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Download, Link2, Sparkles } from "lucide-react";

export default function QRGenerator() {
  const [url, setUrl] = useState("https://www.fiverr.com/s/zWaZ2ge");
  const [includeLogo, setIncludeLogo] = useState(BRAND_LOGO.enabled);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<string>(
    BRAND_SETTINGS.defaultFrame || "elegant",
  );
  const qrRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Helper: fetch logo and convert to data URL
  useEffect(() => {
    let cancelled = false;

    const fetchLogo = async () => {
      if (!BRAND_LOGO.enabled || !BRAND_LOGO.url || !includeLogo) {
        setLogoDataUrl(null);
        return;
      }

      try {
        const res = await fetch(BRAND_LOGO.url);
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onload = () => {
          if (!cancelled) setLogoDataUrl(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error("Failed to load logo:", e);
        setLogoDataUrl(null);
      }
    };

    fetchLogo();

    return () => {
      cancelled = true;
    };
  }, [includeLogo]);

  // Initialize QR code (recreate when logo data/other options change)
  useEffect(() => {
    const baseOptions = (BRAND_SETTINGS.qrOptions ?? {}) as Options;
    const qrInstance = new QRCodeStyling({
      ...baseOptions,
      data: url,
      image:
        includeLogo && BRAND_LOGO.enabled
          ? logoDataUrl || undefined
          : undefined,
    });
    setQrCode(qrInstance);
    return () => {
      // cleanup if needed
    };
  }, [logoDataUrl]);

  // Update QR code when URL or logo option changes
  useEffect(() => {
    if (qrCode) {
      const sanitizedData = url
        .split("\n")
        .map((line) => line.trim())
        .join("\r\n");

      qrCode.update({
        data: sanitizedData,
        image:
          includeLogo && BRAND_LOGO.enabled
            ? logoDataUrl || undefined
            : undefined,
      });
    }
  }, [url, includeLogo, qrCode, logoDataUrl]);

  // Render QR code to preview with frame
  useEffect(() => {
    if (qrCode && qrRef.current && previewContainerRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);

      // Select the generated SVG/Canvas and make it responsive
      const child = qrRef.current.firstElementChild as Element | null;
      if (child) {
        // Prefer any inner <svg> if present
        const innerSvg = (child as Element).querySelector
          ? (child as Element).querySelector("svg")
          : null;
        const tag = (child.tagName || "").toString().toUpperCase();
        const svgEl =
          tag === "SVG" ? (child as unknown as SVGElement) : innerSvg;

        if (svgEl) {
          svgEl.setAttribute("width", "100%");
          svgEl.setAttribute("height", "100%");
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
          (svgEl.style as any).display = "block";
        } else if (
          tag === "CANVAS" ||
          (child as HTMLCanvasElement).tagName === "CANVAS"
        ) {
          const canvas = child as HTMLCanvasElement;
          canvas.style.width = "100%";
          canvas.style.display = "block";
        } else {
          (child as HTMLElement).style.width = "100%";
          (child as HTMLElement).style.height = "100%";
          (child as HTMLElement).style.display = "block";
        }
      }

      // Render frame in preview
      const frameData = BRAND_SETTINGS.frames[selectedFrame];
      if (frameData) {
        previewContainerRef.current.innerHTML = frameData.svg;
        const frameElement = previewContainerRef.current.querySelector("svg");
        if (frameElement) {
          frameElement.style.width = "100%";
          frameElement.style.height = "100%";
        }
      }
    }
  }, [qrCode, url, includeLogo, selectedFrame]);

  /**
   * CORE MERGE LOGIC: Combine Frame SVG + QR Code on Canvas
   */
  const handleDownload = async (format: "png" | "jpeg" | "svg") => {
    if (!qrCode) return;

    setIsGenerating(true);

    // Wait for QR code to fully render
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      if (format === "svg") {
        await downloadSVG();
      } else {
        await downloadRaster(format);
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Download as PNG or JPEG (Canvas-based)
   */
  const downloadRaster = async (format: "png" | "jpeg") => {
    if (!qrCode) return;

    const frameData = BRAND_SETTINGS.frames[selectedFrame];
    if (!frameData) return;
    const finalWidth = frameData.width;
    const finalHeight = frameData.height;

    const { x, y, qrSize } = frameData.position;

    // Create high-resolution canvas
    const canvas = document.createElement("canvas");
    canvas.width = finalWidth;
    canvas.height = finalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    // Step 1: Draw the frame SVG
    const frameImg = await loadSVGAsImage(
      frameData.svg,
      finalWidth,
      finalHeight,
    );
    ctx.drawImage(frameImg, 0, 0, finalWidth, finalHeight);

    // Step 2: Generate a high-resolution QR code directly
    const qrImg = await generateHighResQRImage(qrSize);
    ctx.drawImage(qrImg, x, y, qrSize, qrSize);

    // Step 3: Export canvas
    const mimeType = BRAND_SETTINGS.exportSettings.formats[format].type;
    const quality = BRAND_SETTINGS.exportSettings.formats[format].quality;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `qr-code-${Date.now()}.${format}`;
          a.click();
          URL.revokeObjectURL(url);
        }
      },
      mimeType,
      quality,
    );
  };

  /**
   * Generate a high-resolution QR code image with all styling
   */
  const generateHighResQRImage = async (
    size: number,
  ): Promise<HTMLImageElement> => {
    if (!qrCode) throw new Error("QR code not initialized");

    // Create a temporary container for high-res rendering
    const tempContainer = document.createElement("div");
    tempContainer.style.width = `${size}px`;
    tempContainer.style.height = `${size}px`;
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    document.body.appendChild(tempContainer);

    try {
      // Create a new QR code instance with high resolution
      const baseOptions = (BRAND_SETTINGS.qrOptions ?? {}) as Options;
      const highResQR = new QRCodeStyling({
        ...baseOptions,
        width: size,
        height: size,
        data: url
          .split("\n")
          .map((line) => line.trim())
          .join("\r\n"),
        image:
          includeLogo && BRAND_LOGO.enabled
            ? logoDataUrl || undefined
            : undefined,
      });

      // Render to temporary container
      highResQR.append(tempContainer);

      // Wait for rendering to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get the rendered element (prefer element child)
      const renderedElement = tempContainer.firstElementChild as Element | null;
      if (!renderedElement) {
        document.body.removeChild(tempContainer);
        throw new Error("QR render element not found");
      }

      let imageDataUrl: string;

      const renderedTag = (renderedElement.tagName || "")
        .toString()
        .toUpperCase();
      const innerSvg = renderedElement.querySelector
        ? (renderedElement.querySelector("svg") as SVGElement | null)
        : null;

      if (renderedTag === "SVG" || innerSvg) {
        const svgElement =
          renderedTag === "SVG"
            ? (renderedElement as unknown as SVGElement)
            : innerSvg!;
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
        const svgUrl = URL.createObjectURL(svgBlob);

        // Convert SVG to canvas for consistent rendering
        const img = await loadImageFromUrl(svgUrl);
        URL.revokeObjectURL(svgUrl);

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context not available");

        // Fill with white background for better compatibility
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        imageDataUrl = canvas.toDataURL("image/png");
      } else if (renderedTag === "CANVAS") {
        const canvas = renderedElement as HTMLCanvasElement;
        imageDataUrl = canvas.toDataURL("image/png");
      } else {
        document.body.removeChild(tempContainer);
        throw new Error("Unexpected QR code element type");
      }

      document.body.removeChild(tempContainer);

      return await loadImageFromDataUrl(imageDataUrl);
    } catch (error) {
      document.body.removeChild(tempContainer);
      throw error;
    }
  };

  /**
   * Download as SVG (Embed high-res PNG as data URL)
   */
  const downloadSVG = async () => {
    if (!qrCode) return;

    try {
      const frameData = BRAND_SETTINGS.frames[selectedFrame];
      if (!frameData) throw new Error("Frame not found");
      const finalWidth = frameData.width;
      const finalHeight = frameData.height;

      const { x, y, qrSize } = frameData.position;

      // Parse frame SVG
      const parser = new DOMParser();
      const frameDoc = parser.parseFromString(frameData.svg, "image/svg+xml");

      // Create new SVG with frame
      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      svgElement.setAttribute("width", finalWidth.toString());
      svgElement.setAttribute("height", finalHeight.toString());
      svgElement.setAttribute("viewBox", `0 0 ${finalWidth} ${finalHeight}`);
      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      // Add frame elements
      Array.from(frameDoc.documentElement.children).forEach((child) => {
        svgElement.appendChild(child.cloneNode(true));
      });

      // Generate high-res QR code and embed as image
      const qrImg = await generateHighResQRImage(qrSize);
      const qrCanvas = document.createElement("canvas");
      qrCanvas.width = qrSize;
      qrCanvas.height = qrSize;
      const qrCtx = qrCanvas.getContext("2d");
      if (!qrCtx) throw new Error("Canvas context not available");
      qrCtx.drawImage(qrImg, 0, 0, qrSize, qrSize);
      const qrDataUrl = qrCanvas.toDataURL("image/png");

      const imageElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image",
      );
      imageElement.setAttribute("x", x.toString());
      imageElement.setAttribute("y", y.toString());
      imageElement.setAttribute("width", qrSize.toString());
      imageElement.setAttribute("height", qrSize.toString());
      imageElement.setAttribute("href", qrDataUrl);
      svgElement.appendChild(imageElement);

      // Convert SVG element to string and download
      const svgString = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(svgElement)}`;
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-code-${Date.now()}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("SVG download failed:", error);
      alert("Failed to generate SVG. Please try PNG or JPEG instead.");
      throw error;
    }
  };

  /**
   * Helper: Convert SVG string to Image
   */
  const loadSVGAsImage = (
    svgString: string,
    width: number,
    height: number,
  ): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(e);
      };
      img.src = url;
      img.width = width;
      img.height = height;
    });
  };

  /**
   * Helper: Convert data URL to Image
   */
  const loadImageFromDataUrl = (dataUrl: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = dataUrl;
    });
  };

  /**
   * Helper: Convert URL to Image
   */
  const loadImageFromUrl = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = url;
    });
  };

  // Calculate QR code preview size based on frame position
  const getPreviewSizePercentage = (): {
    widthPercent: number;
    heightPercent: number;
  } => {
    const frameData = BRAND_SETTINGS.frames[selectedFrame];
    if (!frameData) return { widthPercent: 80, heightPercent: 80 }; // default fallback

    const finalWidth = frameData.width;
    const finalHeight = frameData.height;
    const { qrSize } = frameData.position;

    const widthPercent = (qrSize / finalWidth) * 100;
    const heightPercent = (qrSize / finalHeight) * 100;
    return {
      widthPercent,
      heightPercent,
    };
  };

  // Calculate QR code position offset for preview
  const getPreviewPosition = () => {
    const frameData = BRAND_SETTINGS.frames[selectedFrame];
    if (!frameData) return { top: "10%", left: "10%" };

    const finalWidth = frameData.width;
    const finalHeight = frameData.height;
    const { x, y } = frameData.position;

    // Calculate percentage position relative to the preview container
    // The preview container is square, so we need to adjust for aspect ratio
    const aspectRatio = finalWidth / finalHeight;

    if (aspectRatio < 1) {
      // Portrait orientation - height is larger
      const topPercent = (y / finalHeight) * 100;
      const leftPercent = (x / finalWidth) * 100;
      return {
        top: `${topPercent}%`,
        left: `${leftPercent}%`,
      };
    } else {
      // Landscape or square - use simpler calculation
      const topPercent = (y / finalHeight) * 100;
      const leftPercent = (x / finalWidth) * 100;
      return {
        top: `${topPercent}%`,
        left: `${leftPercent}%`,
      };
    }
  };

  const { widthPercent, heightPercent } = getPreviewSizePercentage();
  const previewPosition = getPreviewPosition();
  const frameData = BRAND_SETTINGS.frames[selectedFrame];

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-8 overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, ${BRAND_SETTINGS.clientBranding.colors.background} 0%, ${BRAND_SETTINGS.clientBranding.colors.secondary} 100%)`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* FIXED BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z+10 h-full w-full">
        {/* Static Radial Glow */}
        <div
          className="absolute inset-0 h-full w-full opacity-30"
          style={{
            background: `radial-gradient(circle at center, ${BRAND_SETTINGS.clientBranding.colors.primary} 0%, transparent 70%)`,
          }}
        ></div>

        {/* Animated Pulse */}
        <div
          className="absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh] animate-pulse opacity-10"
          style={{
            background: `linear-gradient(135deg, ${BRAND_SETTINGS.clientBranding.colors.primary} 0%, transparent 50%)`,
            transformOrigin: "center center",
            animationDuration: "8s",
          }}
        ></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1
              className="text-5xl font-bold tracking-tight"
              style={{
                color: BRAND_SETTINGS.clientBranding.colors.text,
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontWeight: 700,
              }}
            >
              {BRAND_SETTINGS.clientBranding.name}
            </h1>
          </div>
          <p
            className="text-lg opacity-80"
            style={{ color: BRAND_SETTINGS.clientBranding.colors.accent }}
          >
            Premium QR Code Generator
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Preview */}
          <div className="flex flex-col items-center space-y-6 transition-all duration-500">
            <div
              className="w-full rounded-2xl shadow-2xl p-8 backdrop-blur-sm animate-scale-in relative overflow-hidden transition-all duration-500"
              style={{
                aspectRatio: `${frameData.width} / ${frameData.height}`,
                maxWidth: "100%",
                background: `linear-gradient(145deg, ${BRAND_SETTINGS.clientBranding.colors.surface}dd, ${BRAND_SETTINGS.clientBranding.colors.secondary}dd)`,
                border: `2px solid ${BRAND_SETTINGS.clientBranding.colors.primary}40`,
              }}
            >
              {/* Frame Background */}
              <div
                ref={previewContainerRef}
                className="absolute inset-0 w-full h-full transition-all duration-500"
              />

              {/* QR Code Overlay - Positioned based on frame settings */}
              <div
                className="absolute transition-all duration-500"
                style={{
                  top: previewPosition.top,
                  left: previewPosition.left,
                  width: `${widthPercent}%`,
                  height: `${heightPercent}%`,
                }}
              >
                <div ref={qrRef} className="w-full h-full" />
              </div>
            </div>

            {/* Frame Selection */}
            <div className="w-full space-y-2">
              <Label
                className="text-base font-medium"
                style={{ color: BRAND_SETTINGS.clientBranding.colors.text }}
              >
                Frame Style
              </Label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(BRAND_SETTINGS.frames).map((frameName) => (
                  <button
                    key={frameName}
                    onClick={() => setSelectedFrame(frameName)}
                    className="shadow-none px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize"
                    style={{
                      background:
                        selectedFrame === frameName
                          ? BRAND_SETTINGS.clientBranding.colors.primary
                          : `${BRAND_SETTINGS.clientBranding.colors.primary}30`,
                      color:
                        selectedFrame === frameName
                          ? BRAND_SETTINGS.clientBranding.colors.secondary
                          : BRAND_SETTINGS.clientBranding.colors.text,
                      border: `2px solid ${BRAND_SETTINGS.clientBranding.colors.primary}`,
                    }}
                  >
                    {frameName}
                  </button>
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3 justify-center w-full">
              <Button
                onClick={() => handleDownload("png")}
                disabled={isGenerating}
                className="flex-1 min-w-[120px] h-12 text-base font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: BRAND_SETTINGS.clientBranding.colors.primary,
                  color: BRAND_SETTINGS.clientBranding.colors.secondary,
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                PNG
              </Button>
              <Button
                onClick={() => handleDownload("jpeg")}
                disabled={isGenerating}
                className="flex-1 min-w-[120px] h-12 text-base font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: BRAND_SETTINGS.clientBranding.colors.primary,
                  color: BRAND_SETTINGS.clientBranding.colors.secondary,
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                JPEG
              </Button>
              <Button
                onClick={() => handleDownload("svg")}
                disabled={isGenerating}
                className="flex-1 min-w-[120px] h-12 text-base font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: BRAND_SETTINGS.clientBranding.colors.primary,
                  color: BRAND_SETTINGS.clientBranding.colors.secondary,
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                SVG
              </Button>
            </div>
          </div>

          {/* Right: Controls */}
          <div
            className="rounded-2xl shadow-xl p-8 space-y-6 animate-slide-in"
            style={{
              background: `${BRAND_SETTINGS.clientBranding.colors.surface}dd`,
              border: `1px solid ${BRAND_SETTINGS.clientBranding.colors.primary}30`,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="space-y-2">
              <Label
                htmlFor="url"
                className="text-base font-medium flex items-center gap-2"
                style={{ color: BRAND_SETTINGS.clientBranding.colors.text }}
              >
                <Link2
                  className="w-4 h-4"
                  style={{
                    color: BRAND_SETTINGS.clientBranding.colors.primary,
                  }}
                />
                URL or Text
              </Label>
              <Input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="h-12 text-base transition-all duration-300"
                style={{
                  background: BRAND_SETTINGS.clientBranding.colors.background,
                  border: `2px solid ${BRAND_SETTINGS.clientBranding.colors.primary}40`,
                  color: BRAND_SETTINGS.clientBranding.colors.text,
                }}
              />
            </div>

            {BRAND_LOGO.enabled && (
              <div
                className="flex items-center justify-between p-4 rounded-lg transition-all duration-300"
                style={{
                  background: `${BRAND_SETTINGS.clientBranding.colors.background}80`,
                  border: `1px solid ${BRAND_SETTINGS.clientBranding.colors.primary}20`,
                }}
              >
                <Label
                  htmlFor="logo"
                  className="text-base font-medium cursor-pointer"
                  style={{ color: BRAND_SETTINGS.clientBranding.colors.text }}
                >
                  Include Logo
                </Label>
                <Switch
                  id="logo"
                  checked={includeLogo}
                  onCheckedChange={setIncludeLogo}
                />
              </div>
            )}

            <div
              className="mt-8 p-6 rounded-lg space-y-3"
              style={{
                background: `${BRAND_SETTINGS.clientBranding.colors.background}60`,
                border: `1px solid ${BRAND_SETTINGS.clientBranding.colors.primary}30`,
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: BRAND_SETTINGS.clientBranding.colors.primary }}
              >
                How it works
              </h3>
              <ul
                className="space-y-2 text-sm opacity-90"
                style={{ color: BRAND_SETTINGS.clientBranding.colors.accent }}
              >
                <li className="flex items-start gap-2">
                  <span
                    style={{
                      color: BRAND_SETTINGS.clientBranding.colors.primary,
                    }}
                  >
                    •
                  </span>
                  Enter your URL or text content
                </li>
                <li className="flex items-start gap-2">
                  <span
                    style={{
                      color: BRAND_SETTINGS.clientBranding.colors.primary,
                    }}
                  >
                    •
                  </span>
                  Toggle logo inclusion if available
                </li>
                <li className="flex items-start gap-2">
                  <span
                    style={{
                      color: BRAND_SETTINGS.clientBranding.colors.primary,
                    }}
                  >
                    •
                  </span>
                  Download in your preferred format (PNG, JPEG, or SVG)
                </li>
                <li className="flex items-start gap-2">
                  <span
                    style={{
                      color: BRAND_SETTINGS.clientBranding.colors.primary,
                    }}
                  >
                    •
                  </span>
                  QR code is branded with your custom frame and styling
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-center mt-12 opacity-60"
          style={{ color: BRAND_SETTINGS.clientBranding.colors.accent }}
        >
          <p className="text-sm">
            Made by @magns_oskm on Fiverr • High-Resolution Export (3000×3000px)
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="text-center space-y-4">
            <div
              className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
              style={{
                borderColor: `${BRAND_SETTINGS.clientBranding.colors.primary} transparent transparent transparent`,
              }}
            ></div>
            <p
              className="text-lg font-medium"
              style={{ color: BRAND_SETTINGS.clientBranding.colors.text }}
            >
              Generating your branded QR code...
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
