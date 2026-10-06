const form = document.querySelector('.quote-form');
if (form) {
  const messages = {"en": ["Sending…", "Request sent. Thank you! We will contact you about your quote.", "We cannot confirm delivery. Your entries are still here: try again or email info@sequi.it."], "de": ["Wird gesendet…", "Anfrage übermittelt. Vielen Dank! Wir melden uns mit Ihrem Angebot.", "Der Versand konnte nicht bestätigt werden. Ihre Angaben bleiben erhalten. Versuchen Sie es erneut oder schreiben Sie an info@sequi.it."], "fr": ["Envoi en cours…", "Demande transmise. Merci ! Nous vous recontacterons pour votre devis.", "Nous ne pouvons pas confirmer l’envoi. Vos données sont toujours présentes : réessayez ou écrivez à info@sequi.it."], "es": ["Enviando…", "Solicitud enviada. ¡Gracias! Le contactaremos para su presupuesto.", "No podemos confirmar el envío. Sus datos siguen aquí: inténtelo de nuevo o escriba a info@sequi.it."], "pt": ["A enviar…", "Pedido enviado. Obrigado! Entraremos em contacto sobre o orçamento.", "Não podemos confirmar o envio. Os dados continuam aqui: tente novamente ou escreva para info@sequi.it."], "it": ["Invio in corso…", "Richiesta trasmessa. Grazie! Vi ricontatteremo per il preventivo.", "Non possiamo confermare l’invio. I dati compilati sono ancora qui: riprovate oppure scrivete a info@sequi.it."]};
  const copy = messages[form.dataset.lang] || messages.it;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    const result = form.querySelector('.quote-result');
    if (button.disabled) return;
    button.disabled = true;
    result.hidden = false;
    result.textContent = copy[0];
    try {
      const response = await fetch('https://formsubmit.co/ajax/info@sequi.it', {
        method: 'POST', headers: { Accept: 'application/json' },
        body: new FormData(form), signal: AbortSignal.timeout(20000)
      });
      const data = await response.json();
      if (!response.ok || !(data.success === true || data.success === 'true')) throw new Error('Submission failed');
      result.textContent = copy[1];
      form.reset();
    } catch (error) {
      result.textContent = copy[2];
    } finally {
      button.disabled = false;
    }
  });
}
