// Startseite anzeigen
function showFrontpage() {
  document.getElementById("content").innerHTML = `
    <h1>Willkommen zu Divinius!</h1>
    <p>Erkunde die Bestien, die Geschichten und das Wissen dieser fantastischen Welt.</p>
    <div class="category-gallery">
      <div class="category-card" onclick="showbeasts()">
        Bestien
      </div>
    </div>
  `;
}

// Bestiarium laden
function showbeasts() {
  fetch("quartz/static/content/beasts/beasts.html")
    .then(response => {
      if (!response.ok) throw new Error("Datei nicht gefunden");
      return response.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(err => {
      console.error("Fehler beim Laden des Bestiariums:", err);
    });
}

// Einzelnen Gott laden
function loadbeastsInfo(beastName) {
  const mdPath = `quartz/static/content/beasts/${beastName}.md`;
  const imgPath = `quartz/static/images/beasts/${beastName.toLowerCase()}.png`;

  fetch(mdPath)
    .then(response => {
      if (!response.ok) throw new Error("MD-Datei nicht gefunden");
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      document.getElementById("content").innerHTML = `
        <div class="top-bar">
          <button class="home-button" onclick="showbeasts()">Zurück zur Übersicht</button>
        </div>
        <div class="portrait-layout">
          <div class="text-column">${html}</div>
          <div class="image-column">
            <img src="${imgPath}" alt="${beastName}" />
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error("Fehler beim Laden des Bestiariums.", err);
    });
}
