import { Link } from 'react-router-dom'
import { useSettings } from '../../context/SettingsContext'

export default function Footer() {
  const { t } = useSettings()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Link className="logo" to="/">
            <span className="logo__mark">RM</span>
          </Link>
          <p className="footer__note">{t('footer.note')}</p>
        </div>
        <div className="footer__meta">
          <a href="https://github.com/moonrouse" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:blackrouse536@gmail.com">Email</a>
          <a href="tel:+998774486888">{t('footer.phone')}</a>
          <span>© {new Date().getFullYear()} Rusalina Muzafarova. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  )
}
