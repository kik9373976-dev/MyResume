import { Link } from 'react-router-dom'
import ArrowIcon from '../components/ui/ArrowIcon'
import Reveal from '../components/ui/Reveal'
import portrait from '../../pictures/myPhoto.PNG'
import ReviewSection from '../components/reviews/ReviewSection'
import { useSettings } from '../context/SettingsContext'

const stack = ['React', 'JavaScript', 'HTML / CSS', 'SCSS', 'Vite', 'React Router', 'Redux Toolkit', 'Zustand', 'Git', 'REST API']

export default function Home() {
  const { t } = useSettings()
  const experience = [
    { period: t('home.exp1Period'), role: t('home.exp1Role'), place: t('home.exp1Place'), text: t('home.exp1Text') },
    { period: t('home.exp2Period'), role: t('home.exp2Role'), place: t('home.exp2Place'), text: t('home.exp2Text') },
  ]
  return (
    <>
      <section className="resume-hero container">
        <div className="resume-hero__copy">
          <p className="resume-hero__kicker">Frontend developer · Tashkent</p>
          <h1 aria-label={`${t('person.lastName')} ${t('person.firstName')}`}>
            <span className="outline-word" data-text={t('person.lastName')}>{t('person.lastName')}</span>
            <span>{t('person.firstName')}</span>
          </h1>
          <p className="resume-hero__lead">{t('home.lead')}</p>
          <div className="resume-hero__actions">
            <Link className="button button--primary" to="/projects">{t('home.works')} <ArrowIcon /></Link>
            <a className="button button--ghost" href="mailto:blackrouse536@gmail.com">{t('home.contact')}</a>
          </div>
        </div>

        <div className="resume-hero__visual">
          <div className="photo-frame">
            <img src={portrait} alt={t('person.photoAlt')} fetchPriority="high" />
            <div className="photo-frame__scan" aria-hidden="true" />
            <span className="photo-frame__code">DEV_01</span>
            <span className="photo-frame__coords">41.2995° N<br />69.2401° E</span>
          </div>
          <div className="availability-badge"><i /> Open to work</div>
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
