const chapters = [
  "0.md",
  "1.md",
  "2.md",
  "3.md",
  "4.md",

  // ... weitere Kapitel hier ergänzen
];

let currentChapterIndex = 0;

function showchapter() {
  renderChapterNavigation();
  loadChapter(currentChapterIndex);
}

function renderChapterNavigation() {
  const content = document.getElementById("content");

  // Navigation oben mit Dropdown und Buttons
  content.innerHTML = `
    <div class="chapter-nav">
      <button id="prevBtn" ${currentChapterIndex === 0 ? 'disabled' : ''}>Vorherige Seite</button>
      <select id="chapterSelect"></select>
      <button id="nextBtn" ${currentChapterIndex === chapters.length - 1 ? 'disabled' : ''}>Nächste Seite</button>
    </div>
    <div id="chapterContent" class="chapter-content">Lade Kapitel...</div>
  `;

  const select = document.getElementById("chapterSelect");
  chapters.forEach((chapter, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = chapter.replace('.md', '').replace(/kapitel/gi, "Kapitel ");
    if (index === currentChapterIndex) option.selected = true;
    select.appendChild(option);
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentChapterIndex > 0) {
      currentChapterIndex--;
      updateChapter();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentChapterIndex < chapters.length - 1) {
      currentChapterIndex++;
      updateChapter();
    }
  });

  select.addEventListener("change", (e) => {
    currentChapterIndex = parseInt(e.target.value, 10);
    updateChapter();
  });
}

function updateChapter() {
  renderChapterNavigation(); // Refresh Nav (Buttons/Dropdown)
  loadChapter(currentChapterIndex);
}

function loadChapter(index) {
  const mdPath = `quartz/static/content/Chapters/${chapters[index]}`;
  const chapterContent = document.getElementById("chapterContent");
  chapterContent.textContent = "Lade Kapitel...";

  fetch(mdPath)
    .then(response => {
      if (!response.ok) throw new Error("Kapitel nicht gefunden");
      return response.text();
    })
    .then(markdown => {
      chapterContent.innerHTML = marked.parse(markdown);
      // Optional: Scroll zum Kapitelanfang
      chapterContent.scrollTop = 0;
    })
    .catch(err => {
      chapterContent.textContent = "Fehler beim Laden des Kapitels.";
      console.error(err);
    });
}
