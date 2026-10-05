const form = document.querySelector('.quote-form');
if (form) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    const result = form.querySelector('.quote-result');
    if (button.disabled) return;
    button.disabled = true;
    result.hidden = false;
    result.textContent = 'Invio in corso…';
    try {
      const response = await fetch('https://formsubmit.co/ajax/info@sequi.it', {
        method: 'POST', headers: { Accept: 'application/json' },
        body: new FormData(form), signal: AbortSignal.timeout(20000)
      });
      const data = await response.json();
      if (!response.ok || !(data.success === true || data.success === 'true')) throw new Error('Submission failed');
      result.textContent = 'Richiesta trasmessa. Grazie! Vi ricontatteremo per il preventivo.';
      form.reset();
    } catch (error) {
      result.textContent = 'Non possiamo confermare l’invio. I dati compilati sono ancora qui: riprovate oppure scrivete a info@sequi.it.';
    } finally {
      button.disabled = false;
    }
  });
}
