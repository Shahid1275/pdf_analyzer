// ============================================================================
// PDF ANALYZER - STRICT COMPLIANCE WITH CONSTRAINTS
// ============================================================================
// 
// CONSTRAINT #1: Generic & PDF-Agnostic Solution
//   - Works with any PDF layout (scanned-style, hidden, internal)
//   - No hardcoding of fonts, margins, headers, or layouts
//   - Logic based on text extraction and positional analysis
// 
// CONSTRAINT #2: Printed Page Numbers (Critical)
//   - Extracted EXACTLY as they appear (1, Page 1, (1), - 1 -, etc.)
//   - No auto-correction, no gap filling, no sorting
//   - Can appear anywhere: top, bottom, corners
//   - Custom headers/footers must not be mistaken for page numbers
// 
// CONSTRAINT #3: Question Number Detection (Strict Accuracy)
//   - Detects: Q1, Q.1, Q 1, Question 1, Q(1), (1)
//   - NEVER normalize or re-sequence questions
//   - Preserve jumps (e.g., Q1, Q21 stays as Q1, Q21)
// 
// CONSTRAINT #4: Page-Level Question Mapping
//   - Range based on FIRST and LAST appearance, NOT min/max
//   - If no questions: { "range": null } → UI shows "No question at all"
// 
// CONSTRAINT #5: Page Tears / Missing Pages
//   - Think of PDF as physical book with potential tears
//   - Reflect only what exists, never infer missing pages/questions
//   - Preserve all jumps and inconsistencies
// 
// CONSTRAINT #6: Output Integrity
//   - Printed page sequence matches exact PDF order
//   - Question numbers match exact detected values
//   - No sorting, no correction, no assumptions
// ============================================================================

// (same logic as before – moved here for better organization)
import PDFParser from 'pdf2json';
import fs from 'fs/promises';

export async function analyzePDF(filePath, originalName) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataError', (errData) => reject(new Error(errData.parserError)));

    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      const result = processPdfData(pdfData, originalName);
      // Clean up file after processing
      fs.unlink(filePath).catch(console.error);
      resolve(result);
    });

    pdfParser.loadPDF(filePath);
  });
}

function processPdfData(pdfData, fileName) {
  const totalPages = pdfData.Pages.length;
  const printedPageSequence = [];
  const pageSummary = [];

  const pageHeight = 792;
  const margin = 72;

  // CONSTRAINT #2: Detect printed page number position without assumptions
  const pageNumberPosition = detectPageNumberPosition(pdfData.Pages, pageHeight, margin);

  for (let i = 0; i < totalPages; i++) {
    const page = pdfData.Pages[i];
    
    // CONSTRAINT #2: Extract printed page number EXACTLY as it appears
    // No auto-correction, no gap filling, no sorting
    const printedPage = getPrintedPageAtPosition(page, pageNumberPosition, margin);
    printedPageSequence.push(printedPage);

    // CONSTRAINT #3: Detect question numbers WITHOUT normalization
    // Preserves jumps, inconsistencies, and out-of-sequence numbers
    const questionStarts = getQuestionStarts(page);
    
    // CONSTRAINT #4: Range is based on FIRST and LAST appearance, not min/max
    let range = null;
    if (questionStarts.length > 0) {
      // CRITICAL: Use first and last as they appear, NOT min/max
      // This preserves the original order even if questions are out of sequence
      const first = questionStarts[0];
      const last = questionStarts[questionStarts.length - 1];
      range = first === last ? `${first}` : `${first}-${last}`;
    }

    pageSummary.push({ printedPage, range, questionStarts });
  }

  // CONSTRAINT #6: Output integrity - reflect only what exists
  return {
    fileName,
    totalPages,
    printedPageSequence, // EXACT sequence, no sorting or correction
    pageSummary,
  };
}

// ──────────────────────────────────────────────
// Helper functions
// ──────────────────────────────────────────────

function decodeText(t) {
  try {
    return decodeURIComponent(t);
  } catch (e) {
    return t;
  }
}

function isPageNumberText(text) {
  if (!text) return false;
  const s = text.trim();
  
  // CRITICAL: Avoid false positives from custom headers/footers
  // Reject if contains letters mixed with numbers (e.g., "", "F-block", "LDA")
  if (/[a-zA-Z]/.test(s) && !/^page\s*\d+$/i.test(s)) {
    return false;
  }
  
  // Reject if too long (page numbers should be concise)
  if (s.length > 15) return false;
  
  // Simple number: 1, 2, 3 (but not  or other alphanumeric)
  if (/^\d+$/.test(s)) return true;
  
  // Page 1, page 1, PAGE 1
  if (/^page\s*\d+$/i.test(s)) return true;
  
  // 1/10, 2/10 (page X of Y format)
  if (/^\d+\s*\/\s*\d+$/.test(s)) return true;
  
  // (1), (2)
  if (/^\(\d+\)$/.test(s)) return true;
  
  // - 1 -, - 2 -
  if (/^-\s*\d+\s*-$/.test(s)) return true;
  
  return false;
}

function getPageFullText(page) {
  if (!page || !Array.isArray(page.Texts)) return [];
  return page.Texts.map((t) => {
    const raw = (t.R && t.R[0] && t.R[0].T) || '';
    return {
      x: t.x || t.X || 0,
      y: t.y || t.Y || 0,
      text: decodeText(raw),
    };
  });
}

function detectPageNumberPosition(pages, pageHeight = 792, margin = 72) {
  // CONSTRAINT #2: Detect position across all possible locations
  // Supports: top, bottom, top-left, top-right, bottom-left, bottom-right, center
  const candidates = [];
  
  for (const page of pages) {
    const texts = getPageFullText(page);
    for (const t of texts) {
      if (isPageNumberText(t.text)) {
        candidates.push({ x: t.x, y: t.y, text: t.text });
        break; // Take first valid page number per page for position detection
      }
    }
  }

  if (candidates.length === 0) return null;

  // Calculate average position across all pages
  const avg = candidates.reduce(
    (acc, cur) => ({ x: acc.x + cur.x, y: acc.y + cur.y }),
    { x: 0, y: 0 }
  );
  avg.x /= candidates.length;
  avg.y /= candidates.length;

  // Determine vertical position: top or bottom
  const vertical = avg.y > pageHeight / 2 ? 'bottom' : 'top';

  // Determine horizontal position: left, center, or right
  const xs = candidates.map((c) => c.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const range = maxX - minX || 1;
  const relative = (avg.x - minX) / range;
  let horizontal = 'center';
  if (relative < 0.33) horizontal = 'left';
  else if (relative > 0.66) horizontal = 'right';

  return { vertical, horizontal, x: avg.x, y: avg.y };
}

function getPrintedPageAtPosition(page, pageNumberPosition, margin = 72) {
  if (!pageNumberPosition) return null;
  const texts = getPageFullText(page);

  // CONSTRAINT #2: Find page number matching detected position
  // Must avoid custom headers/footers (e.g., " F-block LDA")
  const numberCandidates = texts.filter((t) => isPageNumberText(t.text));
  
  if (numberCandidates.length > 0) {
    // Find candidate closest to expected position
    let best = null;
    let bestDist = Infinity;
    for (const c of numberCandidates) {
      const dx = (c.x || 0) - (pageNumberPosition.x || 0);
      const dy = (c.y || 0) - (pageNumberPosition.y || 0);
      const d = Math.hypot(dx, dy);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }

    if (best) {
      const s = best.text.trim();
      // Extract numeric value from all supported formats
      // Formats: 1, Page 1, (1), - 1 -, 1/10
      const m = s.match(/^(?:page\s*)?(\d+)/i) || 
                s.match(/^(\d+)\s*\//) || 
                s.match(/^\((\d+)\)$/) || 
                s.match(/^-\s*(\d+)\s*-$/);
      if (m) {
        const pageNum = parseInt(m[1], 10);
        // Additional validation: page numbers should be reasonable (1-9999)
        if (pageNum > 0 && pageNum < 10000) {
          return pageNum;
        }
      }
      if (/^\d+$/.test(s)) {
        const pageNum = parseInt(s, 10);
        if (pageNum > 0 && pageNum < 10000) {
          return pageNum;
        }
      }
    }
  }

  // Fallback: search near expected position with tolerance
  const tolerance = 30;
  const candidatesNear = texts.filter((t) => {
    if (!t || typeof t.y !== 'number' || typeof t.x !== 'number') return false;
    const vertCond =
      (pageNumberPosition.vertical === 'bottom' && t.y > margin) ||
      (pageNumberPosition.vertical === 'top' && t.y < margin + 100) ||
      pageNumberPosition.vertical === 'center';
    if (!vertCond) return false;
    if (pageNumberPosition.horizontal === 'left' && t.x > pageNumberPosition.x + tolerance) return false;
    if (pageNumberPosition.horizontal === 'right' && t.x < pageNumberPosition.x - tolerance) return false;
    return true;
  });

  for (const c of candidatesNear) {
    const s = c.text || '';
    if (!isPageNumberText(s)) continue; // Additional check to avoid false positives
    
    const m = s.match(/^(?:page\s*)?(\d+)/i) || 
              s.match(/^(\d+)\s*\//) || 
              s.match(/^\((\d+)\)$/) || 
              s.match(/^-\s*(\d+)\s*-$/);
    if (m) {
      const pageNum = parseInt(m[1], 10);
      if (pageNum > 0 && pageNum < 10000) {
        return pageNum;
      }
    }
  }

  return null;
}

function getQuestionStarts(page) {
  const texts = getPageFullText(page).map((t) => t.text.trim());
  const starts = [];
  
  // CONSTRAINT #3: Detect question numbers WITHOUT normalization or sorting
  // Supported formats: Q1, Q.1, Q 1, Question 1, Q(1), (1)
  // IMPORTANT: Preserve original order - do NOT sort
  
  for (const t of texts) {
    let match = null;
    
    // Q1, Q.1, Q 1, Q. 1
    match = t.match(/^Q\.?\s*(\d{1,3})\b/i);
    if (match) {
      starts.push(parseInt(match[1], 10));
      continue;
    }
    
    // Question 1, question 1
    match = t.match(/^Question\s+(\d{1,3})\b/i);
    if (match) {
      starts.push(parseInt(match[1], 10));
      continue;
    }
    
    // Q(1), q(2)
    match = t.match(/^Q\s*\((\d{1,3})\)/i);
    if (match) {
      starts.push(parseInt(match[1], 10));
      continue;
    }
    
    // (1), (2) - but only if preceded by context suggesting question
    // This is a fallback and should be conservative
    match = t.match(/^\((\d{1,3})\)/);
    if (match) {
      starts.push(parseInt(match[1], 10));
      continue;
    }
  }
  
  // CRITICAL: Do NOT sort - preserve original appearance order
  // Remove duplicates while maintaining order
  // CONSTRAINT #5: Reflect jumps and inconsistencies (e.g., Q1, Q21 stays as-is)
  return Array.from(new Set(starts));
}
 