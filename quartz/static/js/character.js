// Startseite anzeigen
function showFrontpage() {
  document.getElementById("content").innerHTML = `
    <h1>Willkommen zu Divinius!</h1>
    <p></p>
    <div class="category-gallery">
      <div class="category-card" onclick="showcharacter()">
        Charakter
      </div>
    </div>
  `;
}

// Charakter laden
function showcharacter() {
  fetch("quartz/static/content/character/character.html")
    .then(response => {
      if (!response.ok) throw new Error("Datei nicht gefunden");
      return response.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(err => {
      console.error("Fehler beim Laden der Charakter:", err);
    });
}

// Einzelnen Gott laden
function loadCharacterInfo(characterName) {
  const mdPath = `quartz/static/content/character/${characterName}.md`;
  const imgPath = `quartz/static/images/character/${characterName.toLowerCase()}.png`;

  fetch(mdPath)
    .then(response => {
      if (!response.ok) throw new Error("MD-Datei nicht gefunden");
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      document.getElementById("content").innerHTML = `
        <div class="top-bar">
          <button class="home-button" onclick="showcharacter()">Zurück zur Übersicht</button>
        </div>
        <div class="portrait-layout">
          <div class="text-column">${html}</div>
          <div class="image-column">
            <img src="${imgPath}" alt="${characterName}" />
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error("Fehler beim Laden der Gottheit:", err);
    });
}
