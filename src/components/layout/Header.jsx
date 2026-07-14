import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import useToggle from '../../hooks/useToggle'
import { useSettings } from '../../context/SettingsContext'

export default function Header() {
  const [isOpen, toggleMenu, closeMenu] = useToggle(false)
  const { pathname } = useLocation()
  const { language, setLanguage, theme, toggleTheme, t } = useSettings()
  const links = [
    { to: '/', label: t('nav.resume'), end: true },
    { to: '/projects', label: t('nav.projects') },
    { to: '/about', label: t('nav.profile') },
    { to: '/contact', label: t('nav.contacts') },
  ]

  useEffect(() => closeMenu(), [pathname, closeMenu])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    if (isOpen) document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen, closeMenu])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 820px)')
    const handleViewportChange = (event) => {
      if (!event.matches) closeMenu()
    }
    media.addEventListener('change', handleViewportChange)
    return () => media.removeEventListener('change', handleViewportChange)
  }, [closeMenu])

  const settings = (className = '') => (
    <div className={`header-settings ${className}`}>
      <div className="language-switcher" aria-label="Language">
        {['ru', 'uz', 'en'].map((item) => <button className={language === item ? 'is-active' : ''} type="button" onClick={() => setLanguage(item)} key={item}>{item.toUpperCase()}</button>)}
      </div>
      <button className="theme-switcher" type="button" aria-label={t('nav.theme')} title={t('nav.theme')} onClick={toggleTheme}>{theme === 'dark' ? '☼' : '◐'}</button>
    </div>
  )

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <NavLink className="logo" to="/" aria-label={t('nav.home')}>
            <span className="logo__mark">RM</span>
            <span className="logo__text">frontend developer</span>
          </NavLink>

          <button
            className={`menu-button ${isOpen ? 'is-open' : ''}`}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? t('nav.close') : t('nav.open')}
            onClick={toggleMenu}
          >
            <span />
            <span />
          </button>

          <nav id="main-navigation" className="navigation" aria-label={t('common.navigation')}>
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `navigation__link ${isActive ? 'is-active' : ''}`}>{label}</NavLink>
            ))}
            {settings()}
          </nav>
        </div>
      </header>

      {isOpen && createPortal(
        <aside className="mobile-navigation" id="mobile-navigation" aria-label={t('common.navigation')} aria-modal="true" role="dialog">
          <div className="mobile-navigation__top">
            <span className="logo"><span className="logo__mark">RM</span><span className="logo__text">frontend developer</span></span>
            <button className="mobile-navigation__close" type="button" aria-label={t('nav.close')} onClick={closeMenu}><span /><span /></button>
          </div>
          <nav className="mobile-navigation__links">
            {links.map(({ to, label, end }, index) => (
              <NavLink key={to} to={to} end={end} onClick={closeMenu} style={{ '--menu-index': index }} className={({ isActive }) => `mobile-navigation__link ${isActive ? 'is-active' : ''}`}>{label}</NavLink>
            ))}
          </nav>
          <div className="mobile-navigation__bottom">{settings('header-settings--mobile')}<span >Rusalina Muzafarova · 2026</span></div>
        </aside>,
        document.body,
      )}
    </>
  )
}
