# Business Consultant — PezzaliAPP

![Business Consultant Cover](icons/cover.png)

**Business Consultant** è una Progressive Web App progettata per venditori, amministrazione e consulenti commerciali.  
Una piattaforma modulare che offre calcolatori professionali, strumenti tecnici e formule utilizzate quotidianamente nella gestione di preventivi, trattative, analisi costi e redditività.

Interfaccia minimal dark, stile **PezzaliAPP**, installabile su qualsiasi dispositivo e funzionante anche offline.

---

## ⚙️ Moduli attivi (versione corrente)

### **1. Margine ⇄ Ricarico**  
Conversione immediata tra:
- margine sul prezzo di vendita  
- ricarico / mark-up sul costo  

---

### **2. Ricarico ⇄ Margine**  
Calcolo inverso del margine reale partendo da un ricarico.

---

### **3. Costo + Margine → Prezzo di vendita**  

Inserisci:
- costo  
- margine desiderato (%)  

La PWA calcola:
- prezzo finale  
- utile  
- ricarico implicito  

---

### **4. Costo + Ricarico → Prezzo + Margine reale**  

Inserisci:
- costo  
- ricarico (%)  

La PWA restituisce:
- prezzo finale  
- utile  
- margine reale sul prezzo  

---

### **5. Costo + Costi interni + Margine → Prezzo netto reale**  

Per calcolare un prezzo che includa:
- costo merce  
- costi interni (fissi o variabili)  
- margine desiderato sul prezzo  

Output:
- prezzo netto reale  
- utile reale  
- margine effettivo  
- ricarico effettivo  

---

### **6. Break-even semplificato (Punto di pareggio)**  

Inserisci:
- costi fissi totali  
- prezzo unitario  
- costo variabile unitario  

La PWA calcola automaticamente:
- **quantità di pareggio (Q)**  
- **fatturato di pareggio**  
- **margine di contribuzione unitario**  
- **% margine di contribuzione**  

Formula base:
\[
Q = \frac{\text{Costi fissi}}{\text{Prezzo unitario} - \text{Costo variabile unitario}}
\]

---

## 🧩 Struttura del progetto

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

- IVA reverse / IVA inclusa ↔ esclusa  
- Rata leasing & noleggio operativo (formula stile Excel BCC)  
- Calcolo interessi, tassi, scadenze  
- Utility per venditori (sconti sequenziali, provvigioni, netto/lordo)  
- Mini-CRM numerico
- Calcolo ROI / ROS / ROE semplificati
- Margine di contribuzione multiprodotto
- Simulatore scenari “what-if”

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
