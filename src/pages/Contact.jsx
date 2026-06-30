import { useRef, useState } from 'react'
import PageIntro from '../components/ui/PageIntro'
import ArrowIcon from '../components/ui/ArrowIcon'
import { useSettings } from '../context/SettingsContext'

const EMAIL = 'blackrouse536@gmail.com'
// Добавьте username без символа @, чтобы сообщения открывались прямо в вашем чате.
const TELEGRAM_USERNAME = ''

export default function Contact() {
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const { t } = useSettings()

  const validateField = (name, value, checked = false) => {
    const cleanValue = typeof value === 'string' ? value.trim() : value

    if (name === 'name' && cleanValue.length < 2) return t('error.name')
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanValue)) return t('error.email')
    if (name === 'telegram' && cleanValue && !/^@?[a-zA-Z0-9_]{5,32}$/.test(cleanValue)) return t('error.telegram')
    if (name === 'message' && cleanValue.length < 10) return t('error.message')
    if (name === 'consent' && !checked) return t('error.consent')
    return ''
  }

  const validateForm = () => {
    const form = formRef.current
    if (!form) return false

    const nextErrors = {
      name: validateField('name', form.elements.name.value),
      email: validateField('email', form.elements.email.value),
      telegram: validateField('telegram', form.elements.telegram.value),
      message: validateField('message', form.elements.message.value),
      consent: validateField('consent', '', form.elements.consent.checked),
    }
    const visibleErrors = Object.fromEntries(Object.entries(nextErrors).filter(([, message]) => message))
    setErrors(visibleErrors)

    const firstInvalidField = Object.keys(visibleErrors)[0]
    if (firstInvalidField) {
      form.elements[firstInvalidField]?.focus()
      return false
    }
    return true
  }

  const updateVisibleError = (event) => {
    const { name, value, checked } = event.target
    if (!errors[name]) return
    setErrors((current) => ({ ...current, [name]: validateField(name, value, checked) }))
  }

  const getMessage = () => {
    const form = formRef.current
    if (!form || !validateForm()) return null

    const data = new FormData(form)
    return [
      t('contact.newRequest'),
      `${t('contact.name').replace(' *', '')}: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Telegram: ${data.get('telegram') || t('contact.notSpecified')}`,
      '',
      data.get('message'),
    ].join('\n')
  }

  const sendToEmail = (event) => {
    event.preventDefault()
    const message = getMessage()
    if (!message) return

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.subject'))}&body=${encodeURIComponent(message)}`
  }

  const sendToTelegram = () => {
    const message = getMessage()
    if (!message) return

    const url = TELEGRAM_USERNAME
      ? `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`
      : `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(message)}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <PageIntro
        title={t('contact.title')}
        text={t('contact.text')}
      />

      <section className="contact container">
        <div className="contact__compact-links">
          <a href={`mailto:${EMAIL}`}><span>Email</span><strong>{EMAIL}</strong><ArrowIcon /></a>
          <a href="tel:+998774486888"><span>{t('contact.phone')}</span><strong>+998 77 448 68 88</strong><ArrowIcon /></a>
          <a href="https://github.com/moonrouse" target="_blank" rel="noreferrer"><span>GitHub</span><strong>@moonrouse</strong><ArrowIcon /></a>
        </div>

        <div className="message-panel" id="message-form">
          <div className="message-panel__intro">
            <span className="glam-label"><i /> Online</span>
            <h2>{t('contact.leave')}<br /><em>{t('contact.message')}</em></h2>
            <p>{t('contact.note')}</p>
          </div>

          <form className="message-form" ref={formRef} onSubmit={sendToEmail} noValidate>
            <label>
              <span>{t('contact.name')}</span>
              <input className={errors.name ? 'has-error' : ''} name="name" type="text" placeholder={t('contact.namePh')} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} onChange={updateVisibleError} required />
              {errors.name && <small className="field-error" id="name-error"><i>!</i>{errors.name}</small>}
            </label>
            <label>
              <span>Email *</span>
              <input className={errors.email ? 'has-error' : ''} name="email" type="email" placeholder="name@example.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} onChange={updateVisibleError} required />
              {errors.email && <small className="field-error" id="email-error"><i>!</i>{errors.email}</small>}
            </label>
            <label className="message-form__wide">
              <span>Telegram</span>
              <input className={errors.telegram ? 'has-error' : ''} name="telegram" type="text" placeholder={t('contact.telegramPh')} autoComplete="off" aria-invalid={Boolean(errors.telegram)} aria-describedby={errors.telegram ? 'telegram-error' : undefined} onChange={updateVisibleError} />
              {errors.telegram && <small className="field-error" id="telegram-error"><i>!</i>{errors.telegram}</small>}
            </label>
            <label className="message-form__wide">
              <span>{t('contact.messageLabel')}</span>
              <textarea className={errors.message ? 'has-error' : ''} name="message" rows="5" placeholder={t('contact.messagePh')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} onChange={updateVisibleError} required />
              {errors.message && <small className="field-error" id="message-error"><i>!</i>{errors.message}</small>}
            </label>
            <label className={`message-form__consent message-form__wide ${errors.consent ? 'has-error' : ''}`}>
              <input name="consent" type="checkbox" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} onChange={updateVisibleError} required />
              <span>{t('contact.consent')}</span>
              {errors.consent && <small className="field-error" id="consent-error"><i>!</i>{errors.consent}</small>}
            </label>
            <div className="message-form__actions message-form__wide">
              <button className="button button--primary" type="submit">{t('contact.emailSend')} <ArrowIcon /></button>
              <button className="button button--telegram" type="button" onClick={sendToTelegram}>{t('contact.telegramSend')} <ArrowIcon /></button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
