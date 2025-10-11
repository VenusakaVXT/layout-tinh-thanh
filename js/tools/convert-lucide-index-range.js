const fs = require('fs');
const path = require('path');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function getDataLucideNameFromClass(classAttr) {
  if (!classAttr) return null;
  const lucideMatches = Array.from(classAttr.matchAll(/(?:^|\s)lucide-([a-z0-9-]+)/g)).map((m) => m[1]);
  if (lucideMatches.length === 0) return null;
  // Prefer names not ending with -icon if multiple are present
  const nonIcon = lucideMatches.find((n) => !n.endsWith('-icon'));
  return (nonIcon || lucideMatches[0] || '').trim();
}

function extractSize(attrs) {
  const width = /\bwidth\s*=\s*"(\d+)"/i.exec(attrs);
  const height = /\bheight\s*=\s*"(\d+)"/i.exec(attrs);
  return {
    width: width ? width[1] : null,
    height: height ? height[1] : null,
  };
}

function buildClassList(classAttr) {
  const classes = (classAttr || '').split(/\s+/).filter(Boolean);
  const keep = [];
  for (const cls of classes) {
    if (cls === 'lucide') continue;
    if (/^lucide-[a-z0-9-]+$/.test(cls)) continue; // drop lucide-* markers
    // Drop any existing width/height utility to avoid conflicts; we'll rebuild from width/height attrs
    if (/^w-\d+$/.test(cls)) continue;
    if (/^h-\d+$/.test(cls)) continue;
    keep.push(cls);
  }
  // Always enforce w-4 h-4 for lucide icons regardless of original SVG width/height
  keep.unshift('h-4');
  keep.unshift('w-4');
  // Ensure deterministic order: size first, then others as-is
  // Remove duplicates while preserving order
  const seen = new Set();
  const deduped = [];
  for (const c of keep) {
    if (!seen.has(c)) {
      seen.add(c);
      deduped.push(c);
    }
  }
  return deduped.join(' ').trim();
}

function convertSvgToIDataLucide(segmentHtml) {
  // Match <svg ...>...</svg> blocks that contain a lucide class
  const svgRegex = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/gi;
  return segmentHtml.replace(svgRegex, (full, attrs) => {
    const classMatch = /\bclass\s*=\s*"([^"]*)"/i.exec(attrs);
    const classAttr = classMatch ? classMatch[1] : '';
    if (!/\blucide\b/.test(classAttr)) {
      // Not a lucide svg; leave untouched
      return full;
    }

    const iconName = getDataLucideNameFromClass(classAttr);
    if (!iconName) {
      return full; // cannot determine icon
    }

    const classList = buildClassList(classAttr);
    const classAttrOut = classList ? ` class="${classList}"` : '';
    return `<i data-lucide="${iconName}"${classAttrOut}></i>`;
  });
}

function normalizeIDataLucideClasses(segmentHtml) {
  // Fix previously converted icons that might have w-24/h-24 -> w-4/h-4
  const iRegex = /<i\b([^>]*)data-lucide\s*=\s*"([^"]+)"([^>]*)><\/i>/gi;
  return segmentHtml.replace(iRegex, (full, preAttrs, icon, postAttrs) => {
    const attrs = `${preAttrs}${postAttrs}`;
    const classMatch = /\bclass\s*=\s*"([^"]*)"/i.exec(attrs);
    const classAttr = classMatch ? classMatch[1] : '';
    if (!classAttr) return full;
    const updated = classAttr
      .replace(/\bw-\d+\b/g, 'w-4')
      .replace(/\bh-\d+\b/g, 'h-4');
    if (updated === classAttr) return full;
    const newAttrs = attrs.replace(/\bclass\s*=\s*"([^"]*)"/i, `class="${updated}"`);
    return `<i${newAttrs} data-lucide="${icon}"></i>`;
  });
}

function convertRangeInFile(filePath, startLineNum, endLineNum) {
  const raw = readFile(filePath);
  const lines = raw.split(/\r?\n/);
  const total = lines.length;
  const startIdx = Math.max(1, parseInt(startLineNum, 10));
  const endIdx = Math.min(total, parseInt(endLineNum, 10));
  if (Number.isNaN(startIdx) || Number.isNaN(endIdx) || startIdx > endIdx) {
    throw new Error('Invalid line range');
  }

  const before = lines.slice(0, startIdx - 1).join('\n');
  const target = lines.slice(startIdx - 1, endIdx).join('\n');
  const after = lines.slice(endIdx).join('\n');

  const converted = convertSvgToIDataLucide(target);
  const normalized = normalizeIDataLucideClasses(converted);
  const out = [before, normalized, after].filter((s) => s.length > 0).join('\n');
  writeFile(filePath, out);
}

function main() {
  const fileArg = process.argv[2] || 'index.html';
  const startArg = process.argv[3] || '2886';
  const endArg = process.argv[4] || '10390';
  const filePath = path.resolve(process.cwd(), fileArg);
  convertRangeInFile(filePath, startArg, endArg);
  console.log(`Converted lucide svgs to <i data-lucide> in ${path.basename(filePath)} lines ${startArg}-${endArg}`);
}

if (require.main === module) {
  main();
}