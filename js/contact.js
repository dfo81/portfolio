import { getIsEnglish } from "./lang.js";

const ENDPOINT = "/contact_form_mail.php";

const MESSAGES = {
  de: {
    invalid: "Bitte Name, gültige E-Mail und Nachricht ausfüllen.",
    consent: "Bitte stimme der Verarbeitung deiner Daten zu.",
    sending: "Wird gesendet …",
    success: "Danke! Deine Nachricht ist unterwegs.",
    failure: "Senden fehlgeschlagen. Bitte später erneut versuchen.",
  },
  en: {
    invalid: "Please fill in name, a valid email and a message.",
    consent: "Please agree to the data processing.",
    sending: "Sending …",
    success: "Thanks! Your message is on its way.",
    failure: "Sending failed. Please try again later.",
  },
};

const form = {
  name: document.getElementById("contact-name"),
  email: document.getElementById("contact-email"),
  message: document.getElementById("message"),
  checkbox: document.querySelector("#contact .checkbox"),
  button: document.getElementById("say-hallo-btn"),
  status: document.getElementById("contact-status"),
};

if (form.button) {
  form.button.addEventListener("click", onSubmit);
}

/**
 * Returns the localized message dictionary for the active language.
 * @returns {Record<string, string>}
 */
function t() {
  return getIsEnglish() ? MESSAGES.en : MESSAGES.de;
}

/**
 * Validates and submits the contact form to the PHP endpoint.
 * @param {MouseEvent} event
 * @returns {Promise<void>}
 */
async function onSubmit(event) {
  event.preventDefault();
  const payload = readForm();
  if (!isValid(payload)) {
    showStatus(t().invalid, "error");
    return;
  }
  if (!form.checkbox?.classList.contains("active")) {
    showStatus(t().consent, "error");
    return;
  }
  await send(payload);
}

/**
 * Reads the current values of the form fields, trimmed.
 * @returns {{name: string, email: string, message: string}}
 */
function readForm() {
  return {
    name: form.name?.value.trim() ?? "",
    email: form.email?.value.trim() ?? "",
    message: form.message?.value.trim() ?? "",
  };
}

/**
 * Returns true when all required fields are filled and the email looks valid.
 * @param {{name: string, email: string, message: string}} data
 * @returns {boolean}
 */
function isValid({ name, email, message }) {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return Boolean(name) && emailOk && Boolean(message);
}

/**
 * POSTs the payload to the PHP endpoint and handles success/error UI.
 * @param {{name: string, email: string, message: string}} payload
 * @returns {Promise<void>}
 */
async function send(payload) {
  showStatus(t().sending, "info");
  form.button.classList.add("is-sending");
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showStatus(t().success, "success");
      resetForm();
    } else {
      showStatus(t().failure, "error");
    }
  } catch {
    showStatus(t().failure, "error");
  } finally {
    form.button.classList.remove("is-sending");
  }
}

/**
 * Displays a status message under the submit button.
 * @param {string} text Message to show.
 * @param {"info"|"success"|"error"} kind Visual variant (controls colour via class).
 * @returns {void}
 */
function showStatus(text, kind) {
  if (!form.status) return;
  form.status.textContent = text;
  form.status.classList.remove("hidden", "text-accent", "text-red-400");
  if (kind === "success") form.status.classList.add("text-accent");
  if (kind === "error") form.status.classList.add("text-red-400");
}

/**
 * Clears the form fields and the consent checkbox after a successful send.
 * @returns {void}
 */
function resetForm() {
  if (form.name) form.name.value = "";
  if (form.email) form.email.value = "";
  if (form.message) {
    form.message.value = "";
    form.message.style.height = "auto";
  }
  form.checkbox?.classList.remove("active");
  form.button?.classList.remove("active");
}
