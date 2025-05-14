function showFrontpage() {
  document.getElementById("content").innerHTML = `
    <h1>Willkommen zu Divinius!</h1>
    <p>Erkunde das Pantheon, die Geschichten und das Wissen dieser fantastischen Welt.</p>
  `;
}

function showGodsOverview() {
  fetch("quartz/static/content/Gottheiten/gods-overview.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(err => {
      console.error("Fehler beim Laden der Götterübersicht:", err);
    });
}

function loadGodInfo(godName) {
  fetch(`quartz/static/content/Gottheiten/${godName}.md`)
    .then(response => response.text())
    .then(markdown => {
      const html = marked.parse(markdown);
      document.getElementById("content").innerHTML = `
        <div class="top-bar">
          <button class="home-button" onclick="showGodsOverview()">Zurück zur Übersicht</button>
        </div>
        <div class="portrait-layout">
          <div class="text-column">${html}</div>
          <div class="image-column">
            <img src="quartz/static/content/images/gottheiten/${godName.toLowerCase()}.png" alt="${godName}" />
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error("Fehler beim Laden der MD-Datei:", err);
    });
}
