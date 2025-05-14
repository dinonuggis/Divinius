// Startseite anzeigen
function showFrontpage() {
  document.getElementById("content").innerHTML = `
    <h1>Willkommen zu Divinius!</h1>
    <p>Erkunde das Pantheon, die Geschichten und das Wissen dieser fantastischen Welt.</p>
    <div class="category-gallery">
      <div class="category-card" onclick="showRealmOverview()">
        Reiche
      </div>
    </div>
  `;
}

function showRealm() {
  fetch("quartz/static/content/Reiche/realms-overview.html")
    .then(response => {
      if (!response.ok) throw new Error("Datei nicht gefunden");
      return response.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(err => {
      console.error("Fehler beim Laden der Reiche-Übersicht:", err);
    });
}

// Einzelnes Reich laden
function loadRealmInfo(realmName) {
  const mdPath = `quartz/static/content/Reiche/${realmName}.md`;
  const imgPath = `quartz/static/images/Reiche/${realmName.toLowerCase()}.png`;

  fetch(mdPath)
    .then(response => {
      if (!response.ok) throw new Error("MD-Datei für das Reich nicht gefunden");
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      document.getElementById("content").innerHTML = `
        <div class="top-bar">
          <button class="home-button" onclick="showRealmOverview()">Zurück zur Übersicht</button>
        </div>
        <div class="portrait-layout">
          <div class="text-column">${html}</div>
          <div class="image-column">
            <img src="${imgPath}" alt="${realmName}" />
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error("Fehler beim Laden des Reichs:", err);
    });
}
