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

// Hook bottoni + invio
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-margine')
    .addEventListener('click', calcFromMargine);

  document.getElementById('btn-ricarico')
    .addEventListener('click', calcFromRicarico);

  document.getElementById('btn-prezzo')
    .addEventListener('click', calcPrezzoDaMargine);

  document.getElementById('btn-prezzo-ricarico')
    .addEventListener('click', calcPrezzoDaRicarico);

  document.getElementById('btn-prezzo-netto')
    .addEventListener('click', calcPrezzoNettoReale);

  document.getElementById('margine').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcFromMargine();
  });

  document.getElementById('ricarico').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcFromRicarico();
  });

  document.getElementById('costo-prezzo').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcPrezzoDaMargine();
  });

  document.getElementById('margine-prezzo').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcPrezzoDaMargine();
  });

  document.getElementById('costo-ricarico').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcPrezzoDaRicarico();
  });

  document.getElementById('ricarico-prezzo').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcPrezzoDaRicarico();
  });

  document.getElementById('costo-merce').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcPrezzoNettoReale();
  });

  document.getElementById('costi-interni').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcPrezzoNettoReale();
  });

  document.getElementById('margine-netto').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcPrezzoNettoReale();
  });
});
