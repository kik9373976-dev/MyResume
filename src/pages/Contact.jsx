import ArrowIcon from '../components/ui/ArrowIcon'
import { useSettings } from '../context/SettingsContext'

const EMAIL = 'kik9373976@gmail.com'
const TELEGRAM_USERNAME = 'chast1chka'
const TELEGRAM_URL = `https://telegram.me/${TELEGRAM_USERNAME}`

export default function Contact() {
  const { t } = useSettings()

  return (
    <section className="contact contact-stage container">
      <div className="contact-live-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="contact-direct">
        <div className="contact-direct__header">
          <span>{t('contact.direct')}</span>
          <p>{t('contact.text')}</p>
        </div>

        <div className="contact-direct__grid">
          <a className="contact-direct__card" href={`mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.subject'))}`}>
            <span>Email</span>
            <strong>{EMAIL}</strong>
            <ArrowIcon />
          </a>
          <a className="contact-direct__card" href="tel:+998998116487">
            <span>{t('contact.phone')}</span>
            <strong>+998 99 811 64 87</strong>
            <ArrowIcon />
          </a>
          <a className="contact-direct__card" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            <span>Telegram</span>
            <strong>@{TELEGRAM_USERNAME}</strong>
            <ArrowIcon />
          </a>
          <a className="contact-direct__card" href="https://github.com/moonrouse" target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>@moonrouse</strong>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
