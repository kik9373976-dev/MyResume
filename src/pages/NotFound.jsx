import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'

export default function NotFound() {
  const { t } = useSettings()
  return (
    <section className="not-found container">
      <span>404</span>
      <h1>{t('404.title')}</h1>
      <p>{t('404.text')}</p>
      <Link className="button button--primary" to="/">{t('404.back')}</Link>
    </section>
  )
}
