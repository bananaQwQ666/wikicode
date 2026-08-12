import fs from 'fs';
import path from 'path';

const pkgDir = path.resolve('node_modules/@nolebase/vitepress-plugin-git-changelog/dist/vite');
const files = ['index.mjs', 'index.cjs'];

for (const file of files) {
  const filePath = path.join(pkgDir, file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  if (file === 'index.mjs') {
    if (!content.includes('srcDir = normalizePath(srcDir);')) {
      content = content.replace(
        'function getRelativePath(file, srcDir, cwd) {\n  cwd = normalizePath(cwd);',
        'function getRelativePath(file, srcDir, cwd) {\n  file = normalizePath(file);\n  srcDir = normalizePath(srcDir);\n  cwd = normalizePath(cwd);'
      );
      modified = true;
    }
  } else if (file === 'index.cjs') {
    if (!content.includes('srcDir = vite.normalizePath(srcDir);')) {
      content = content.replace(
        'function getRelativePath(file, srcDir, cwd) {\n  cwd = vite.normalizePath(cwd);',
        'function getRelativePath(file, srcDir, cwd) {\n  file = vite.normalizePath(file);\n  srcDir = vite.normalizePath(srcDir);\n  cwd = vite.normalizePath(cwd);'
      );
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Patched ${file} successfully.`);
  }
}
