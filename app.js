function formatPercent(x) {
  return x.toFixed(2).replace('.', ',') + ' %';
}

// MARGINE → RICARICO
function calcFromMargine() {
  const out = document.getElementById('outRicarico');
  let m = parseFloat(document.getElementById('margine').value);

  if (isNaN(m) || m <= 0 || m >= 100) {
    out.textContent = "Inserisci un margine tra 0 e 100.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const Ms = m / 100;         // margine decimale
  const Mc = Ms / (1 - Ms);   // formula: M_c = M_s / (1 − M_s)

  out.textContent = "Ricarico / mark-up = " + formatPercent(Mc * 100);
}

// RICARICO → MARGINE
function calcFromRicarico() {
  const out = document.getElementById('outMargine');
  let r = parseFloat(document.getElementById('ricarico').value);

  if (isNaN(r) || r <= 0) {
    out.textContent = "Inserisci un ricarico maggiore di 0.";
    out.classList.add('error');
    return;
  }

  out.classList.remove('error');

  const Mc = r / 100;         // mark-up decimale
  const Ms = Mc / (1 + Mc);   // formula: M_s = M_c / (1 + M_c)

  out.textContent = "Margine sul prezzo = " + formatPercent(Ms * 100);
}

// Hook bottoni + invio
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-margine').addEventListener('click', calcFromMargine);
  document.getElementById('btn-ricarico').addEventListener('click', calcFromRicarico);

  document.getElementById('margine').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcFromMargine();
  });

  document.getElementById('ricarico').addEventListener('keyup', e => {
    if (e.key === 'Enter') calcFromRicarico();
  });
});
