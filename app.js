function formatPercent(x) {
  return x.toFixed(2).replace('.', ',') + ' %';
}

function formatMoney(x) {
  return x.toFixed(2).replace('.', ',') + ' €';
}

// 1) MARGINE → RICARICO
function calcFromMargine() {
  const out = document.getElementById('outRicarico');
  let m = parseFloat(document.getElementById('margine').value);

  if (isNaN(m) || m <= 0 || m >= 100) {
    out.textContent = "Inserisci un margine tra 0 e 100.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const Ms = m / 100;        // margine decimale
  const Mc = Ms / (1 - Ms);  // M_c = M_s / (1 − M_s)

  out.textContent = "Ricarico / mark-up = " + formatPercent(Mc * 100);
}

// 2) RICARICO → MARGINE
function calcFromRicarico() {
  const out = document.getElementById('outMargine');
  let r = parseFloat(document.getElementById('ricarico').value);

  if (isNaN(r) || r <= 0) {
    out.textContent = "Inserisci un ricarico maggiore di 0.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const Mc = r / 100;        // mark-up decimale
  const Ms = Mc / (1 + Mc);  // M_s = M_c / (1 + M_c)

  out.textContent = "Margine sul prezzo = " + formatPercent(Ms * 100);
}

// 3) COSTO + MARGINE → PREZZO
function calcPrezzoDaMargine() {
  const out = document.getElementById('outPrezzo');
  let costo = parseFloat(document.getElementById('costo-prezzo').value);
  let m = parseFloat(document.getElementById('margine-prezzo').value);

  if (isNaN(costo) || costo <= 0) {
    out.textContent = "Inserisci un costo maggiore di 0.";
    out.classList.add('error');
    return;
  }

  if (isNaN(m) || m <= 0 || m >= 100) {
    out.textContent = "Inserisci un margine tra 0 e 100.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const Ms = m / 100;              // margine decimale
  const prezzo = costo / (1 - Ms); // Prezzo = costo / (1 − M_s)
  const utile = prezzo - costo;
  const Mc = utile / costo;        // ricarico implicito

  out.textContent =
    "Prezzo di vendita = " + formatMoney(prezzo) +
    " (Utile = " + formatMoney(utile) +
    ", Ricarico = " + formatPercent(Mc * 100) + ")";
}

// 4) COSTO + RICARICO → PREZZO + MARGINE REALE
function calcPrezzoDaRicarico() {
  const out = document.getElementById('outPrezzoRicarico');
  let costo = parseFloat(document.getElementById('costo-ricarico').value);
  let r = parseFloat(document.getElementById('ricarico-prezzo').value);

  if (isNaN(costo) || costo <= 0) {
    out.textContent = "Inserisci un costo valido.";
    out.classList.add('error');
    return;
  }

  if (isNaN(r) || r <= 0) {
    out.textContent = "Inserisci un ricarico valido (>0).";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const Mc = r / 100;              // ricarico decimale
  const prezzo = costo * (1 + Mc); // prezzo = costo × (1 + ricarico)
  const utile = prezzo - costo;
  const Ms = utile / prezzo;       // margine reale sul prezzo

  out.textContent =
    "Prezzo = " + formatMoney(prezzo) +
    " — Utile = " + formatMoney(utile) +
    " — Margine reale = " + formatPercent(Ms * 100);
}

// 5) COSTO MERCE + COSTI INTERNI + MARGINE → PREZZO NETTO REALE
function calcPrezzoNettoReale() {
  const out = document.getElementById('outPrezzoNetto');
  let costoMerce = parseFloat(document.getElementById('costo-merce').value);
  let costiInterni = parseFloat(document.getElementById('costi-interni').value);
  let m = parseFloat(document.getElementById('margine-netto').value);

  if (isNaN(costoMerce) || costoMerce <= 0) {
    out.textContent = "Inserisci un costo merce valido.";
    out.classList.add('error');
    return;
  }

  if (isNaN(costiInterni) || costiInterni < 0) {
    out.textContent = "Inserisci costi interni validi (anche 0).";
    out.classList.add('error');
    return;
  }

  if (isNaN(m) || m <= 0 || m >= 100) {
    out.textContent = "Inserisci un margine desiderato tra 0 e 100.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const Ms = m / 100;                      // margine decimale
  const costoTotale = costoMerce + costiInterni;
  const prezzo = costoTotale / (1 - Ms);   // Prezzo = (costoTotale) / (1 − M_s)
  const utile = prezzo - costoTotale;
  const margineReale = utile / prezzo;     // margine effettivo sul prezzo
  const ricaricoReale = utile / costoTotale; // ricarico su costo totale

  out.textContent =
    "Prezzo netto reale = " + formatMoney(prezzo) +
    " — Utile = " + formatMoney(utile) +
    " — Margine effettivo = " + formatPercent(margineReale * 100) +
    " — Ricarico effettivo = " + formatPercent(ricaricoReale * 100);
}

// 6) BREAK-EVEN SEMPLIFICATO
function calcBreakEven() {
  const out = document.getElementById('outBreakeven');
  let costiFissi = parseFloat(document.getElementById('costi-fissi').value);
  let prezzoUnitario = parseFloat(document.getElementById('prezzo-unitario').value);
  let costoVariabile = parseFloat(document.getElementById('costo-variabile').value);

  if (isNaN(costiFissi) || costiFissi <= 0) {
    out.textContent = "Inserisci costi fissi validi.";
    out.classList.add('error');
    return;
  }

  if (isNaN(prezzoUnitario) || prezzoUnitario <= 0) {
    out.textContent = "Inserisci un prezzo unitario valido.";
    out.classList.add('error');
    return;
  }

  if (isNaN(costoVariabile) || costoVariabile < 0) {
    out.textContent = "Inserisci un costo variabile unitario valido (anche 0).";
    out.classList.add('error');
    return;
  }

  const contribuzione = prezzoUnitario - costoVariabile;

  if (contribuzione <= 0) {
    out.textContent = "Il prezzo deve essere maggiore del costo variabile unitario.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const qRaw = costiFissi / contribuzione;   // quantità teorica
  const q = Math.ceil(qRaw);                 // arrotondata all'unità superiore
  const fatturatoPareggio = q * prezzoUnitario;
  const margineContribPerc = contribuzione / prezzoUnitario; // % contribuzione

  out.textContent =
    "Punto di pareggio = " + q + " unità" +
    " — Fatturato di pareggio = " + formatMoney(fatturatoPareggio) +
    " — Margine di contribuzione unitario = " + formatMoney(contribuzione) +
    " — Margine di contribuzione = " + formatPercent(margineContribPerc * 100);
}

// 7) BREAK-EVEN CON MARGINE OPERATIVO
function calcBreakEvenOperativo() {
  const out = document.getElementById('outBreakevenOpe');
  if (!out) return;

  let costiFissi = parseFloat(document.getElementById('costi-fissi-ope').value);
  let prezzoUnitario = parseFloat(document.getElementById('prezzo-unitario-ope').value);
  let costoVariabile = parseFloat(document.getElementById('costo-variabile-ope').value);
  let margineOp = parseFloat(document.getElementById('margine-operativo').value);

  if (isNaN(costiFissi) || costiFissi <= 0) {
    out.textContent = "Inserisci costi fissi validi.";
    out.classList.add('error');
    return;
  }

  if (isNaN(prezzoUnitario) || prezzoUnitario <= 0) {
    out.textContent = "Inserisci un prezzo unitario valido.";
    out.classList.add('error');
    return;
  }

  if (isNaN(costoVariabile) || costoVariabile < 0) {
    out.textContent = "Inserisci un costo variabile unitario valido (anche 0).";
    out.classList.add('error');
    return;
  }

  if (isNaN(margineOp) || margineOp < 0 || margineOp >= 100) {
    out.textContent = "Inserisci un margine operativo desiderato tra 0 e 100.";
    out.classList.add('error');
    return;
  }

  const m = margineOp / 100;
  const denom = prezzoUnitario * (1 - m) - costoVariabile;

  if (denom <= 0) {
    out.textContent = "Con questi parametri il margine desiderato è irraggiungibile. Aumenta il prezzo o riduci costi variabili.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const qRaw = costiFissi / denom;
  const q = Math.ceil(qRaw);

  const fatturato = q * prezzoUnitario;
  const contribuzioneUnit = prezzoUnitario - costoVariabile;
  const utileOperativo = contribuzioneUnit * q - costiFissi;
  const margineOpReale = utileOperativo / fatturato;

  out.textContent =
    "Quantità per margine operativo = " + q + " unità" +
    " — Fatturato atteso = " + formatMoney(fatturato) +
    " — Utile operativo = " + formatMoney(utileOperativo) +
    " — Margine operativo effettivo = " + formatPercent(margineOpReale * 100);
}

// 8) PREZZO MINIMO PER MARGINE OPERATIVO
function calcPrezzoMinimoOperativo() {
  const out = document.getElementById('outPrezzoMinimoOpe');
  if (!out) return;

  let costiFissi = parseFloat(document.getElementById('costi-fissi-min').value);
  let costoVariabile = parseFloat(document.getElementById('costo-variabile-min').value);
  let quantita = parseFloat(document.getElementById('quantita-min').value);
  let margineOp = parseFloat(document.getElementById('margine-operativo-min').value);

  if (isNaN(costiFissi) || costiFissi <= 0) {
    out.textContent = "Inserisci costi fissi validi.";
    out.classList.add('error');
    return;
  }

  if (isNaN(costoVariabile) || costoVariabile < 0) {
    out.textContent = "Inserisci un costo variabile unitario valido (anche 0).";
    out.classList.add('error');
    return;
  }

  if (isNaN(quantita) || quantita <= 0) {
    out.textContent = "Inserisci una quantità prevista maggiore di 0.";
    out.classList.add('error');
    return;
  }

  if (isNaN(margineOp) || margineOp < 0 || margineOp >= 100) {
    out.textContent = "Inserisci un margine operativo desiderato tra 0 e 100.";
    out.classList.add('error');
    return;
  }

  const m = margineOp / 100;
  const denom = quantita * (1 - m);

  if (denom <= 0) {
    out.textContent = "Con questi parametri il margine desiderato è irraggiungibile. Aumenta la quantità o riduci il margine.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  // Prezzo minimo = [ Q * Cv + CF ] / [ Q * (1 - m) ]
  const prezzoMinimo = (quantita * costoVariabile + costiFissi) / denom;
  const fatturato = prezzoMinimo * quantita;
  const contribuzioneUnit = prezzoMinimo - costoVariabile;
  const utileOperativo = contribuzioneUnit * quantita - costiFissi;
  const margineOpReale = utileOperativo / fatturato;

  out.textContent =
    "Prezzo minimo unitario = " + formatMoney(prezzoMinimo) +
    " — Fatturato minimo = " + formatMoney(fatturato) +
    " — Utile operativo atteso = " + formatMoney(utileOperativo) +
    " — Margine operativo effettivo = " + formatPercent(margineOpReale * 100);
}

// Hook bottoni + invio (versione sicura)
window.addEventListener('DOMContentLoaded', () => {

  // Helper per registrare gli eventi solo se l'elemento esiste
  const on = (id, event, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
  };

  // --- BUTTONS ---
  on('btn-margine', 'click', calcFromMargine);
  on('btn-ricarico', 'click', calcFromRicarico);
  on('btn-prezzo', 'click', calcPrezzoDaMargine);
  on('btn-prezzo-ricarico', 'click', calcPrezzoDaRicarico);
  on('btn-prezzo-netto', 'click', calcPrezzoNettoReale);
  on('btn-breakeven', 'click', calcBreakEven);
  on('btn-breakeven-ope', 'click', calcBreakEvenOperativo);
  on('btn-prezzo-minimo-ope', 'click', calcPrezzoMinimoOperativo);

  // --- ENTER KEY (input fields) ---
  on('margine', 'keyup', e => { if (e.key === 'Enter') calcFromMargine(); });
  on('ricarico', 'keyup', e => { if (e.key === 'Enter') calcFromRicarico(); });

  on('costo-prezzo', 'keyup', e => { if (e.key === 'Enter') calcPrezzoDaMargine(); });
  on('margine-prezzo', 'keyup', e => { if (e.key === 'Enter') calcPrezzoDaMargine(); });

  on('costo-ricarico', 'keyup', e => { if (e.key === 'Enter') calcPrezzoDaRicarico(); });
  on('ricarico-prezzo', 'keyup', e => { if (e.key === 'Enter') calcPrezzoDaRicarico(); });

  on('costo-merce', 'keyup', e => { if (e.key === 'Enter') calcPrezzoNettoReale(); });
  on('costi-interni', 'keyup', e => { if (e.key === 'Enter') calcPrezzoNettoReale(); });
  on('margine-netto', 'keyup', e => { if (e.key === 'Enter') calcPrezzoNettoReale(); });

  on('costi-fissi', 'keyup', e => { if (e.key === 'Enter') calcBreakEven(); });
  on('prezzo-unitario', 'keyup', e => { if (e.key === 'Enter') calcBreakEven(); });
  on('costo-variabile', 'keyup', e => { if (e.key === 'Enter') calcBreakEven(); });

  on('costi-fissi-ope', 'keyup', e => { if (e.key === 'Enter') calcBreakEvenOperativo(); });
  on('prezzo-unitario-ope', 'keyup', e => { if (e.key === 'Enter') calcBreakEvenOperativo(); });
  on('costo-variabile-ope', 'keyup', e => { if (e.key === 'Enter') calcBreakEvenOperativo(); });
  on('margine-operativo', 'keyup', e => { if (e.key === 'Enter') calcBreakEvenOperativo(); });

  on('costi-fissi-min', 'keyup', e => { if (e.key === 'Enter') calcPrezzoMinimoOperativo(); });
  on('costo-variabile-min', 'keyup', e => { if (e.key === 'Enter') calcPrezzoMinimoOperativo(); });
  on('quantita-min', 'keyup', e => { if (e.key === 'Enter') calcPrezzoMinimoOperativo(); });
  on('margine-operativo-min', 'keyup', e => { if (e.key === 'Enter') calcPrezzoMinimoOperativo(); });
});

// espone le funzioni per eventuali onclick inline
window.calcBreakEvenOperativo = calcBreakEvenOperativo;
window.calcPrezzoMinimoOperativo = calcPrezzoMinimoOperativo;
