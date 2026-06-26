import fs from "node:fs";
import path from "node:path";

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const dirs = ["components", "lib", "app"];
const files = dirs.flatMap((d) => walk(d));

let totalBefore = 0;
let touched = 0;
for (const f of files) {
  let content = fs.readFileSync(f, "utf8");
  const before = (content.match(/[—–]/g) || []).length;
  if (before === 0) continue;

  // 1) Numeric ranges (4–6) -> hyphen
  content = content.replace(/(\d)[–](\d)/g, "$1-$2");
  // 2) ' — ' -> ', '
  content = content.replace(/ [—–] /g, ", ");
  // 3) Em-dash at end of line -> nothing
  content = content.replace(/[—–]$/gm, "");
  // 4) Remaining em-dashes -> hyphen
  content = content.replace(/[—–]/g, "-");

  const after = (content.match(/[—–]/g) || []).length;
  if (before !== after) {
    fs.writeFileSync(f, content);
    console.log(`${f}: ${before} -> ${after}`);
    totalBefore += before;
    touched++;
  }
}
console.log("---");
console.log(`${touched} files touched, ${totalBefore} em-dashes removed.`);
