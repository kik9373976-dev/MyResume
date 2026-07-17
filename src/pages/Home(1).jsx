import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ArrowIcon from '../components/ui/ArrowIcon'
import Reveal from '../components/ui/Reveal'
import ReviewSection from '../components/reviews/ReviewSection'
import { useSettings } from '../context/SettingsContext'

const stack = ['React', 'JavaScript', 'HTML / CSS', 'SCSS', 'Vite', 'React Router', 'Redux Toolkit', 'Zustand', 'Git', 'REST API']
const EMAIL = 'kik9373976@gmail.com'
const TELEGRAM_USERNAME = 'chast1chka'
const TELEGRAM_URL = `https://telegram.me/${TELEGRAM_USERNAME}`

export default function Home() {
  const { t } = useSettings()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const contactRef = useRef(null)
  const experience = [
    { period: t('home.exp1Period'), role: t('home.exp1Role'), place: t('home.exp1Place'), text: t('home.exp1Text') },
    { period: t('home.exp2Period'), role: t('home.exp2Role'), place: t('home.exp2Place'), text: t('home.exp2Text') },
  ]

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!contactRef.current?.contains(event.target)) setIsContactOpen(false)
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsContactOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <>
      <section className="resume-hero resume-hero--no-photo container">
        <div className="resume-hero__copy">
          <p className="resume-hero__kicker">Frontend developer · Tashkent</p>
          <h1 aria-label={`${t('person.lastName')} ${t('person.firstName')}`}>
            <span className="outline-word" data-text={t('person.lastName')}>{t('person.lastName')}</span>
            <span>{t('person.firstName')}</span>
          </h1>
          <p className="resume-hero__lead">{t('home.lead')}</p>
          <div className="resume-hero__actions">
            <Link className="button button--primary" to="/projects">{t('home.works')} <ArrowIcon /></Link>
            <div className={`contact-popover ${isContactOpen ? 'is-open' : ''}`} ref={contactRef}>
              <button
                className="button button--ghost"
                type="button"
                aria-expanded={isContactOpen}
                aria-controls="hero-contact-menu"
                onClick={() => setIsContactOpen((current) => !current)}
              >
                {t('home.contact')}
              </button>
              <div className="contact-popover__menu" id="hero-contact-menu" role="menu">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" role="menuitem" onClick={() => setIsContactOpen(false)}>
                  <span className="contact-popover__icon">TG</span>
                  <span>
                    <strong>Telegram</strong>
                    <small>@{TELEGRAM_USERNAME}</small>
                  </span>
                  <ArrowIcon />
                </a>
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.subject'))}`} role="menuitem" onClick={() => setIsContactOpen(false)}>
                  <span className="contact-popover__icon">EM</span>
                  <span>
                    <strong>Email</strong>
                    <small>{EMAIL}</small>
                  </span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>

      <div className="skill-marquee" aria-label={t('common.skills')}>
        <div>
          {[...stack, ...stack].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}
        </div>
      </div>

      <Reveal>
        <section className="resume-summary container">
          <div>
            <p className="resume-summary__big">{t('home.summaryStart')} <em>{t('home.summaryAccent')}</em> {t('home.summaryEnd')}</p>
            <div className="resume-facts">
              <div><strong>React</strong><span>{t('home.mainStack')}</span></div>
              <div><strong>Mobile First</strong><span>{t('home.layoutApproach')}</span></div>
              <div><strong>Tashkent</strong><span>{t('home.country')}</span></div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="resume-experience container">
          <div className="resume-section-title">
            <h2>{t('home.experience')}<br /><span>{t('home.practice')}</span></h2>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline__item" key={item.role}>
                <span className="timeline__number">0{index + 1}</span>
                <div>
                  <span className="timeline__period">{item.period}</span>
                  <h3>{item.role}</h3>
                  <p className="timeline__place">{item.place}</p>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="resume-stack container">
          <div>
            <h2>{t('home.technologies')}</h2>
          </div>
          <div className="resume-stack__grid">
            {stack.map((skill, index) => <div key={skill}><span>{String(index + 1).padStart(2, '0')}</span>{skill}</div>)}
          </div>
        </section>
      </Reveal>

      <ReviewSection />

      <section className="resume-finale container">
        <span className="resume-finale__small">{t('home.mission')}</span>
        <h2>{t('home.finaleStart')}<br /><em>{t('home.finaleAccent')}</em></h2>
        <Link className="button button--light" to="/contact">{t('home.start')} <ArrowIcon /></Link>
      </section>
    </>
  )
}
