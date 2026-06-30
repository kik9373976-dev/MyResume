import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { messages } from '../i18n/messages'

const SettingsContext = createContext(null)

const getInitialTheme = () => {
  const saved = window.localStorage.getItem('portfolio-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState(() => window.localStorage.getItem('portfolio-language') || 'ru')
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('portfolio-language', language)
  }, [language])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const value = useMemo(() => ({
    language,
    setLanguage,
    theme,
    toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark'),
    t: (key) => messages[language]?.[key] ?? messages.ru[key] ?? key,
  }), [language, theme])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
