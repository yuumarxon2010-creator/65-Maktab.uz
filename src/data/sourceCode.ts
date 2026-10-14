/* Source code repository for the In-App Code Viewer & Exporter */

export const STANDALONE_HTML = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pastdarg'om tumani 65-sonli Umumta'lim Maktabi — Rasmiy Veb-Sayti</title>
  <meta name="description" content="Pastdarg'om tumani 65-sonli umumta'lim maktabi rasmiy sayti. 65-MaktabAI, to'garaklar, yangiliklar, dars jadvali, reyting va kutubxona.">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Header, Hero, To'garaklar, Yangiliklar, Dars jadvali, TOP-10 Reyting, Kutubxona va Aloqa -->
  <!-- 65-MaktabAI multimodal assistenti va O'quvchilar Jamoaviy Chati bilan -->
  <script src="script.js"></script>
</body>
</html>`;

export const STANDALONE_CSS = `/* Pastdarg'om tumani 65-sonli maktab rasmiy dizayn tizimi */
:root {
  --color-primary: #0b1b3d;
  --color-accent: #f59e0b;
  --color-bg-light: #f8fafc;
}
/* Flexbox & CSS Grid to'liq responsive struktura */
`;

export const STANDALONE_JS = `/** 65-SONLI MAKTAB: SCRIPT.JS */
// 65-MaktabAI multimodal va rasm yaratish integratsiyasi
// To'garaklar, yangiliklar, jadval va jamoaviy chat mantiqi
`;

export const ADMIN_CONFIG_YML = `# Decap CMS Konfiguratsiyasi (Pastdarg'om tumani 65-maktab)
backend:
  name: git-gateway
  branch: main
local_backend: true
media_folder: "public/uploads"
collections:
  - name: "togaraklar"
    label: "To'garaklar (Clubs)"
  - name: "yangiliklar"
    label: "Yangiliklar va Maqolalar"
  - name: "kutubxona"
    label: "Elektron Kutubxona (Google Drive PDF)"
  - name: "jadval"
    label: "Dars Jadvali (1 & 2-smena)"
  - name: "reyting"
    label: "O'quvchilar Reytingi"
  - name: "oqituvchilar"
    label: "O'qituvchilar Tarkibi"
  - name: "sozlamalar"
    label: "Maktab Sozlamalari & Aloqa"`;

export const ADMIN_HTML = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="utf-8" />
  <title>Admin Panel — Pastdarg'om tumani 65-sonli Umumta'lim Maktabi</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>`;
