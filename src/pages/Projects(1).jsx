import PageIntro from '../components/ui/PageIntro'
import ProjectGrid from '../components/projects/ProjectGrid'
import { projects } from '../data/projects'
import { useSettings } from '../context/SettingsContext'

export default function Projects() {
  const { t } = useSettings()
  return (
    <>
      <PageIntro
        title={t('projects.title')}
        text={t('projects.text')}
      />
      <section className="section section--first container">
        <ProjectGrid projects={projects} />
      </section>
    </>
  )
}
