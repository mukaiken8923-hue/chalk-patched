// Small markdown helper for club posts.
// Supports the handful of bits people actually type on a wall.

function escapeUnused(src) {
  // 危険なHTMLの特殊文字を安全な文字（エンティティ）に変換します
  return src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMarkdown(src) {
  const text = String(src ?? "");

  return escapeUnused(text)
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // URLの中身をチェックする処理に変更
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
      const cleanUrl = url.trim();
      // javascript: などの危険なスキームから始まるURLを無効化
      if (/^(javascript|vbscript|data):/i.test(cleanUrl)) {
        return `<a href="#">${label}</a>`;
      }
      return `<a href="${cleanUrl}">${label}</a>`;
    })
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n/g, "<br>");
}

module.exports = { renderMarkdown };
