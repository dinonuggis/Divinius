// Startseite anzeigen
function showFrontpage() {
  document.getElementById("content").innerHTML = `
    <h1>Willkommen zu Divinius!</h1>
    <p>Erkunde das Pantheon, die Geschichten und das Wissen dieser fantastischen Welt.</p>
    <div class="category-gallery">
      <div class="category-card" onclick="showGodsOverview()">
        Gottheiten
      </div>
    </div>
  `;
}
// Funktion, um eine Markdown-Datei zu laden
function loadMarkdown(filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(text => {
      // Verwende die Methode "parse" der neuen Version von marked
      const htmlContent = marked.parse(text);  // Ändere marked(text) zu marked.parse(text)
      document.getElementById("content").innerHTML = htmlContent; // Zeigt den Inhalt an
    })
    .catch(error => {
      console.error("Fehler beim Laden der Datei:", error);
      document.getElementById("content").innerHTML = "<p>Fehler beim Laden der Datei.</p>";
    });
}

// Funktion, um die Reiche der Götter anzuzeigen
function showRealm() {
  const content = document.getElementById("content");
  content.innerHTML = "";  // Löscht den bestehenden Inhalt

  // Titel und Einführungstext
  const title = document.createElement("h1");
  title.innerText = "Die Reiche der Götter";
  content.appendChild(title);

  const description = document.createElement("p");
  description.innerText = "Wähle ein Reich, um mehr zu erfahren.";
  content.appendChild(description);

  // Beispiel: Dynamische Links zu Reichen erstellen
  const realms = [
    { name: "Aetherium", file: "quartz/static/content/Reiche/Aetherium.md" },
    { name: "Ashkaroth", file: "quartz/static/content/Reiche/Ashkaroth.md" },
    { name: "Astrael", file: "quartz/static/content/Reiche/Astrael.md" },
    { name: "Aureolum", file: "quartz/static/content/Reiche/Aureolum.md" },
    { name: "Avasil", file: "quartz/static/content/Reiche/Avasil.md" },
    { name: "Edenia", file: "quartz/static/content/Reiche/Edenia.md" },
    { name: "Myreth'Alar", file: "quartz/static/content/Reiche/Myreth'Alar.md" },
    { name: "Noctara", file: "quartz/static/content/Reiche/Noctara.md" },
    { name: "Sirrath'Kar", file: "quartz/static/content/Reiche/Sirrath'Kar.md" },
    { name: "Thanverem", file: "quartz/static/content/Reiche/Thanverem.md" },
    { name: "Vareth-Kel", file: "quartz/static/content/Reiche/Vareth-Kel.md" },
    { name: "Vulkaran", file: "quartz/static/content/Reiche/Vulkaran.md" }
  ];

  // Dynamisch Karten für jedes Reich erstellen
  realms.forEach(realm => {
    const realmCard = document.createElement("div");
    realmCard.classList.add("category-card");
    realmCard.innerText = realm.name;
    realmCard.onclick = function () {
      loadMarkdown(realm.file);  // Die .md-Datei des Reiches laden
    };
    content.appendChild(realmCard);
  });
}
