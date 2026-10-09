"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type MathContentProps = {
  content: string;
  className?: string;
};

/**
 * MathContent renders text with LaTeX mathematical expressions.
 * 
 * Supported notation:
 * - Inline math: \( ... \)
 * - Display math: \[ ... \]
 * - Plain text and markdown-style formatting
 * 
 * Examples:
 * - \(f(x) = \sqrt{x^2 + 4}\)
 * - \[\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\]
 */
export function MathContent({ content, className = "" }: MathContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Clear previous content
    container.innerHTML = "";

    try {
      // Parse content for LaTeX expressions
      const fragments = parseLatex(content);

      fragments.forEach((fragment) => {
        if (fragment.type === "text") {
          // Regular text - preserve whitespace and line breaks
          const textNode = document.createElement("span");
          textNode.textContent = fragment.content;
          // Convert line breaks to <br> elements
          const html = fragment.content.replace(/\n/g, "<br>");
          textNode.innerHTML = html;
          container.appendChild(textNode);
        } else if (fragment.type === "inline") {
          // Inline math
          const mathSpan = document.createElement("span");
          mathSpan.className = "inline-math";
          try {
            katex.render(fragment.content, mathSpan, {
              displayMode: false,
              throwOnError: false,
              trust: false,
              strict: false,
              output: "html",
            });
          } catch {
            // Fallback: show the raw LaTeX if rendering fails
            mathSpan.textContent = `\\(${fragment.content}\\)`;
            mathSpan.className = "text-[var(--error-500)] font-mono text-sm";
          }
          container.appendChild(mathSpan);
        } else if (fragment.type === "display") {
          // Display math
          const mathDiv = document.createElement("div");
          mathDiv.className = "display-math my-4";
          try {
            katex.render(fragment.content, mathDiv, {
              displayMode: true,
              throwOnError: false,
              trust: false,
              strict: false,
              output: "html",
            });
          } catch {
            // Fallback: show the raw LaTeX if rendering fails
            mathDiv.textContent = `\\[${fragment.content}\\]`;
            mathDiv.className = "text-[var(--error-500)] font-mono text-sm my-4";
          }
          container.appendChild(mathDiv);
        }
      });
    } catch {
      // If parsing fails completely, show the raw content
      container.textContent = content;
    }
  }, [content]);

  return (
    <div 
      ref={containerRef} 
      className={`math-content ${className}`}
      style={{
        overflowX: "auto",
        overflowY: "visible",
        maxWidth: "100%",
      }}
    />
  );
}

type Fragment = {
  type: "text" | "inline" | "display";
  content: string;
};

/**
 * Parse content into text and LaTeX fragments.
 * Supports:
 * - Inline: \( ... \)
 * - Display: \[ ... \]
 */
function parseLatex(content: string): Fragment[] {
  const fragments: Fragment[] = [];
  const remaining = content;
  let position = 0;

  while (position < remaining.length) {
    // Look for inline math: \( ... \)
    const inlineStart = remaining.indexOf("\\(", position);
    const displayStart = remaining.indexOf("\\[", position);

    // Determine which delimiter comes first
    let nextDelimiter: "inline" | "display" | null = null;
    let nextPosition = -1;

    if (inlineStart !== -1 && (displayStart === -1 || inlineStart < displayStart)) {
      nextDelimiter = "inline";
      nextPosition = inlineStart;
    } else if (displayStart !== -1) {
      nextDelimiter = "display";
      nextPosition = displayStart;
    }

    if (nextDelimiter === null) {
      // No more math delimiters, add remaining text
      if (position < remaining.length) {
        fragments.push({
          type: "text",
          content: remaining.slice(position),
        });
      }
      break;
    }

    // Add text before the delimiter
    if (nextPosition > position) {
      fragments.push({
        type: "text",
        content: remaining.slice(position, nextPosition),
      });
    }

    // Find closing delimiter
    const closingDelimiter = nextDelimiter === "inline" ? "\\)" : "\\]";
    const openingLength = 2; // Both \( and \[ are 2 characters
    const closingStart = remaining.indexOf(closingDelimiter, nextPosition + openingLength);

    if (closingStart === -1) {
      // No closing delimiter found, treat as text
      fragments.push({
        type: "text",
        content: remaining.slice(nextPosition),
      });
      break;
    }

    // Extract the LaTeX content
    const latexContent = remaining.slice(nextPosition + openingLength, closingStart);
    fragments.push({
      type: nextDelimiter,
      content: latexContent,
    });

    // Move position past the closing delimiter
    position = closingStart + 2; // \) and \] are both 2 characters
  }

  return fragments;
}
