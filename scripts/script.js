// === SCRIPT COMPLETO ===

document.addEventListener("DOMContentLoaded", () => {

  // === Gestione dei TAB ===
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetTab = link.getAttribute("data-tab");
      tabLinks.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(section => section.classList.remove("active"));
      link.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });

  // Forza l'attivazione del tab attivo all'avvio
  document.querySelector(".tab-link.active").click();

  // === GRAFICI CON CHART.JS ===

  const ctxScenario1 = document.getElementById('graficoScenario1')?.getContext('2d');
  if (ctxScenario1) {
    new Chart(ctxScenario1, {
      type: 'bar',
      data: {
        labels: ['Rischio Base', 'Rischio Esteso', 'Rischio Residuo'],
        datasets: [{
          label: 'Valori Scenario 1',
          data: [16, 48, 48],
          backgroundColor: ['#ffa600', '#ff4c4c', '#ff4c4c']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Scenario 1 – Server esposto'
          }
        }
      }
    });
  }

  const ctxScenario2 = document.getElementById('graficoScenario2')?.getContext('2d');
  if (ctxScenario2) {
    new Chart(ctxScenario2, {
      type: 'bar',
      data: {
        labels: ['Rischio Base', 'Rischio Esteso', 'Rischio Residuo'],
        datasets: [{
          label: 'Valori Scenario 2',
          data: [4, 8, 0],
          backgroundColor: ['#ffc107', '#ff9800', '#4caf50']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Scenario 2 – Password debole'
          }
        }
      }
    });
  }

  const ctxConfronto = document.getElementById('graficoConfronto')?.getContext('2d');
  if (ctxConfronto) {
    new Chart(ctxConfronto, {
      type: 'bar',
      data: {
        labels: ['Rischio Base', 'Rischio Esteso', 'Rischio Residuo'],
        datasets: [
          {
            label: 'Scenario 1',
            data: [16, 48, 48],
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          },
          {
            label: 'Scenario 2',
            data: [4, 8, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Confronto tra Scenario 1 e Scenario 2'
          }
        }
      }
    });
  }

  // === GESTIONE DEL FORM DI FEEDBACK ===

  const feedbackForm = document.getElementById('feedbackForm');
  const msg = document.getElementById('messaggioFeedback');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', e => {
      e.preventDefault();

      const valDoc = feedbackForm.querySelector('select[name="val-doc"]').value;
      const valSim = feedbackForm.querySelector('select[name="val-sim"]').value;
      const valUI = feedbackForm.querySelector('select[name="val-ui"]').value;
      const commenti = feedbackForm.querySelector('#commenti').value.trim();

      if (!valDoc || !valSim || !valUI) {
        msg.textContent = 'Per favore compila tutte le valutazioni.';
        return;
      }

      const feedbackData = {
        documento: valDoc,
        simulatore: valSim,
        interfaccia: valUI,
        commenti,
        timestamp: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem('feedbackUtente')) || [];
      existing.push(feedbackData);
      localStorage.setItem('feedbackUtente', JSON.stringify(existing));

      msg.textContent = '✅ Feedback inviato con successo! Grazie per il tuo contributo.';
      feedbackForm.reset();
    });
  }

  // === TOGGLE DETTAGLI LAVORATIVI (accordion) ===

  const toggleButton = document.getElementById("toggleTable");
  const toggleText = document.getElementById("toggleText");
  const toggleIcon = document.getElementById("toggleIcon");
  const accordion = document.getElementById("accordionWrapper");

  if (toggleButton && toggleText && toggleIcon && accordion) {
    toggleButton.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("open");
      accordion.classList.toggle("open");
      toggleText.textContent = isOpen ? "Mostra Dettagli Lavorativi" : "Nascondi Dettagli Lavorativi";
      toggleIcon.textContent = isOpen ? "▼" : "▲";
      toggleIcon.classList.toggle("rotated", !isOpen);
    });
  }
});

// === SIMULATORE DEL FATTORE DI RISCHIO ===

function calcolaRischio() {
  const P = parseInt(document.getElementById('probabilita').value);
  const G = parseInt(document.getElementById('gravita').value);
  const E = parseInt(document.getElementById('esposizione').value);
  const M = parseInt(document.getElementById('mitigazione').value);

  if (isNaN(P) || isNaN(G) || isNaN(E) || isNaN(M)) {
    alert("Inserisci tutti i valori numerici richiesti.");
    return;
  }

  const rischioBase = P * G;
  const rischioEsteso = rischioBase * E;
  let rischioResiduo = rischioEsteso - M;
  if (rischioResiduo < 0) rischioResiduo = 0;

  let valutazione = "";
  if (rischioResiduo >= 20) {
    valutazione = "🔴 Rischio ALTO – Intervenire subito!";
  } else if (rischioResiduo >= 10) {
    valutazione = "🟠 Rischio MEDIO – Valutare misure correttive.";
  } else {
    valutazione = "🟢 Rischio BASSO – Situazione accettabile.";
  }

  document.getElementById('risBase').textContent = rischioBase;
  document.getElementById('risEsteso').textContent = rischioEsteso;
  document.getElementById('risResiduo').textContent = rischioResiduo;
  document.getElementById('valutazioneFinale').textContent = valutazione;
}

// === CITAZIONE DINAMICA SICUREZZA ===

document.addEventListener("DOMContentLoaded", () => {
  const frasiSicurezza = [
    '"Il rischio nasce dal non sapere cosa stai facendo." — Warren Buffett, 2006',
    '"La privacy è uno dei problemi più importanti del nostro tempo." — Sundar Pichai, 2018',
    '"La sicurezza non è un prodotto, ma un processo." — Bruce Schneier, 2000',
    '"Il rischio più grande è non prenderne nessuno." — Mark Zuckerberg, 2011',
    '"Le aziende che non investono in sicurezza oggi, pagheranno in reputazione domani." — Satya Nadella, 2017'
  ];

  const fraseEl = document.getElementById("frase-sicurezza");
  let indexFrase = 0;

  if (!fraseEl) return;

  // Mostra la prima frase iniziale
  fraseEl.textContent = frasiSicurezza[indexFrase];
  fraseEl.classList.add("fade-in");

  setInterval(() => {
    fraseEl.classList.remove("fade-in");
    fraseEl.classList.add("fade-out");

    setTimeout(() => {
      indexFrase = (indexFrase + 1) % frasiSicurezza.length;
      fraseEl.textContent = frasiSicurezza[indexFrase];
      void fraseEl.offsetWidth; // forza reflow
      fraseEl.classList.remove("fade-out");
      fraseEl.classList.add("fade-in");
    }, 3000);

  }, 7000);
});
