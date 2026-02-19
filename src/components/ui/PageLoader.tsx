"use client";

import { useEffect, useState } from "react";

/**
 * Smooth page loading animation with H2O text
 * Shows on initial mount, fades out when content is ready
 */
export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Minimum loading time for smooth experience
    const minLoadTime = 800;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        setIsLoading(false);
        // Remove from DOM after fade animation
        setTimeout(() => setShouldRender(false), 600);
      }, remaining);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        background: "linear-gradient(135deg, #7CB9D6 0%, #5a9cb8 100%)",
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
      }}
    >
      {/* Empty - Just gradient background */}
    </div>
  );
}
