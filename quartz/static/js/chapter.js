const chapters = [
  "1.md",
  "2.md",
  "3.md",
  "4.md",
  "5.md",
  "6.md",
  "7.md",
  "8.md",
  "9.md",
  "10.md",
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
/* Grundlayout */
.chapter-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

/* Kapitel-Content Styling */
.chapter-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* Dropdown-Styling */
.chapter-nav select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
}

.chapter-nav select:hover,
.chapter-nav select:focus {
  border-color: #007acc;
  outline: none;
}

/* Button-Styling */
.chapter-nav button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.chapter-nav button:hover:enabled {
  background-color: #005fa3;
}

.chapter-nav button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Unterscheidung bei Bedarf */
.top-nav {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}

.bottom-nav {
  border-top: 1px solid #e0e0e0;
  padding-top: 1rem;
}

/* Responsive Anpassung */
@media (max-width: 600px) {
  .chapter-nav {
    flex-direction: column;
    gap: 0.75rem;
  }

  .chapter-nav button,
  .chapter-nav select {
    width: 100%;
  }
}
