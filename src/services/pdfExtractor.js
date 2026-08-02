import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker via CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;

/**
 * Extract text from a range of pages in parallel (multi-agent worker pattern).
 */
async function extractPageRange(pdfDoc, startPage, endPage) {
  const pagePromises = [];
  for (let i = startPage; i <= endPage; i++) {
    pagePromises.push(
      (async (pageNo) => {
        try {
          const page = await pdfDoc.getPage(pageNo);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map(item => item.str)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
          return { page: pageNo, text: pageText };
        } catch {
          return { page: pageNo, text: '' };
        }
      })(i)
    );
  }
  const results = await Promise.all(pagePromises);
  results.sort((a, b) => a.page - b.page);
  return results;
}

/**
 * Extracts rough topic keywords from extracted text for the "Topics on Test" banner.
 */
export function extractTopicsFromText(text) {
  if (!text || text.length < 20) return [];
  // Strip page markers, lowercase, split into words
  const cleaned = text.replace(/\[Page \d+\]/g, '').toLowerCase();
  // Common English stop-words to skip
  const stopWords = new Set([
    'the','and','or','is','in','of','to','a','an','that','this','it','are',
    'was','be','for','on','with','as','by','from','at','have','has','not',
    'but','they','we','he','she','their','its','also','can','which','these',
    'those','use','used','when','where','how','all','more','one','two','each',
    'into','will','such','between','than','then','if','been','during','using',
    'both','given','takes','take','include','includes','defined','called','known'
  ]);
  const words = cleaned.match(/\b[a-z]{4,}\b/g) || [];
  const freq = {};
  words.forEach(w => {
    if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1;
  });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
}

/**
 * Phase 1: Extract first 10 pages immediately for question generation.
 * Phase 2: Return a background loader for pages 11–20.
 *
 * @param {ArrayBuffer} fileData  – Binary PDF buffer
 * @returns {Promise<{
 *   fullText: string,
 *   totalPages: number,
 *   extractedPagesCount: number,
 *   topics: string[],
 *   loadNextBatch: (() => Promise<{ additionalText: string, pages: number[] }>) | null
 * }>}
 */
export async function extractPdfTextChunked(fileData) {
  const loadingTask = pdfjsLib.getDocument({ data: fileData });
  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;

  // Phase 1: first 10 pages (or all pages if ≤ 10)
  const phase1End = Math.min(totalPages, 10);
  const phase1Results = await extractPageRange(pdfDoc, 1, phase1End);

  const phase1Text = phase1Results
    .filter(p => p.text.length > 0)
    .map(p => `[Page ${p.page}]\n${p.text}`)
    .join('\n\n');

  const topics = extractTopicsFromText(phase1Text);

  // Phase 2 loader (pages 11–20) — called while user is on the test screen
  let loadNextBatch = null;
  if (totalPages > 10) {
    const phase2End = Math.min(totalPages, 20);
    loadNextBatch = async () => {
      const phase2Results = await extractPageRange(pdfDoc, 11, phase2End);
      const additionalText = phase2Results
        .filter(p => p.text.length > 0)
        .map(p => `[Page ${p.page}]\n${p.text}`)
        .join('\n\n');
      return {
        additionalText,
        pages: phase2Results.map(p => p.page)
      };
    };
  }

  return {
    fullText: phase1Text || 'No extractable text found in the first 10 pages.',
    totalPages,
    extractedPagesCount: phase1End,
    topics,
    loadNextBatch
  };
}

// Keep old export for backward compat
export async function extractPdfTextParallel(fileData, maxPages = 20) {
  const result = await extractPdfTextChunked(fileData);
  return result;
}
