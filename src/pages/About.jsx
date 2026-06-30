import { Link } from 'react-router-dom'
import PageIntro from '../components/ui/PageIntro'
import ArrowIcon from '../components/ui/ArrowIcon'
import portrait from '../../pictures/myPhoto.PNG'
import { useSettings } from '../context/SettingsContext'

const skillGroups = [
  {
    title: 'Frontend',
    skills: ['HTML5', 'CSS3', 'SCSS', 'JavaScript (ES6+)', 'React', 'Vite', 'React Router', 'Redux Toolkit', 'Zustand', 'JSX'],
  },
  {
    title: 'about.data',
    skills: ['Fetch API', 'Async / Await', 'JSON', 'REST API', 'External API'],
  },
  {
    title: 'JavaScript',
    skills: ['DOM', 'Event Handling', 'Functions', 'Arrays & Objects', 'Destructuring', 'Spread / Rest', 'Closures', 'Callbacks', 'Map / Filter / Reduce / Find', 'Math API', 'Date', 'Modules', 'Template Literals'],
  },
  {
    title: 'React',
    skills: ['Functional Components', 'Hooks', 'Props', 'Conditional Rendering', 'Component Architecture', 'Routing', 'State Management', 'Dynamic Data'],
  },
  {
    title: 'about.layout',
    skills: ['Flexbox', 'CSS Grid', 'Responsive Design', 'Mobile First', 'Semantic HTML', 'CSS Animations', 'Hover Effects', 'Adaptive Layouts'],
  },
  {
    title: 'about.tools',
    skills: ['Git', 'GitHub', 'VS Code', 'npm', 'Chrome DevTools'],
  },
]

export default function About() {
  const { t } = useSettings()
  return (
    <>
      <PageIntro title={t('about.title')} />
      <section className="about container">
        <div className="about__portrait">
          <img src={portrait} alt={t('person.photoAlt')} loading="lazy" decoding="async" />
          <span>Frontend Developer · Tashkent</span>
        </div>
        <div className="about__content">
          <p className="about__lead">{t('about.lead')}</p>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>
          <dl className="profile-meta">
            <div><dt>{t('about.birth')}</dt><dd>{t('about.birthValue')}</dd></div>
            <div><dt>{t('about.location')}</dt><dd>{t('about.locationValue')}</dd></div>
          </dl>
          <div className="profile-contacts">
            <a href="mailto:blackrouse536@gmail.com"><span>Email</span><strong>blackrouse536@gmail.com</strong><ArrowIcon /></a>
            <Link to="/contact#message-form"><span>Telegram</span><strong>{t('about.write')}</strong><ArrowIcon /></Link>
            <a href="https://github.com/moonrouse" target="_blank" rel="noreferrer"><span>GitHub</span><strong>@moonrouse</strong><ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="skill-catalog container">
        <div className="skill-catalog__heading">
          <h2>Technical<br />Skills</h2>
        </div>
        <div className="skill-groups">
          {skillGroups.map((group, groupIndex) => (
            <article className="skill-group" key={group.title}>
              <div className="skill-group__title"><span>0{groupIndex + 1}</span><h3>{group.title.startsWith('about.') ? t(group.title) : group.title}</h3></div>
              <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="soft-skills container">
        <h2>Soft Skills</h2>
        <ul>{t('about.softList').map((skill) => <li key={skill}>{skill}</li>)}</ul>
        <Link className="button button--primary" to="/contact">{t('about.contact')} <ArrowIcon /></Link>
      </section>
    </>
  )
}
