# Business Consultant — PezzaliAPP

![Business Consultant Cover](icons/cover.png)

**Business Consultant** è una Progressive Web App progettata per venditori, amministrazione e consulenti commerciali.  
Una piattaforma modulare che offre calcolatori professionali, strumenti tecnici e formule utilizzate quotidianamente nella gestione di preventivi e trattative.

Interfaccia minimal dark, stile **PezzaliAPP**, installabile su qualsiasi dispositivo e funzionante anche offline.

---

## Moduli attivi

### 1. Margine ⇄ Ricarico  
Conversione professionale tra:
- margine sul prezzo di vendita  
- ricarico / mark-up sul costo  

Basato sulle formule ufficiali della contabilità analitica.

---

### 2. Ricarico ⇄ Margine  
Calcolo inverso del margine reale partendo da un ricarico/mark-up.

---

### 3. Costo + Margine → Prezzo di vendita  

Inserisci:
- costo  
- margine desiderato (%)  

La PWA calcola:
- prezzo finale  
- utile  
- ricarico implicito  

---

### 4. Costo + Ricarico → Prezzo + Margine reale  

Inserisci:
- costo  
- ricarico (%)  

La PWA restituisce:
- prezzo finale  
- utile  
- margine reale sul prezzo  

---

## Struttura del progetto

```text
business-consultant/
├── index.html
├── style.css
├── app.js
├── manifest.webmanifest
├── service-worker.js
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    └── cover.png
```
---

## 🚀 Moduli in arrivo (roadmap)

- Prezzo con margine netto reale  
- IVA reverse / IVA inclusa ↔ esclusa  
- Break-even semplificato  
- Rata leasing & noleggio operativo (formula stile Excel BCC)  
- Calcolo interessi, tassi, scadenze  
- Utility per venditori (sconti sequenziali, provvigioni, netto/lordo)  
- Mini-CRM numerico  

---

## 📦 Installazione (GitHub Pages)

1. Carica tutti i file nel repository  
2. Vai in **Settings → Pages**  
3. Imposta:  
   - Branch → `main`  
   - Folder → `/ (root)`  
4. Apri la pagina generata  
5. Su smartphone → **Aggiungi alla Home**

L'app diventa installabile come una vera app nativa.

---

## 👨‍💻 Autore

**PezzaliAPP**  
Strumenti digitali professionali per venditori, consulenti e amministrazione.  
Minimal. Veloce. Open-source. Creato per la produttività reale.
