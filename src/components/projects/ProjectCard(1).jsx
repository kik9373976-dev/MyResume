import { useEffect, useState } from 'react'
import ArrowIcon from '../ui/ArrowIcon'
import { formatProjectNumber } from '../../utils/formatProjectNumber'
import { useSettings } from '../../context/SettingsContext'

export default function ProjectCard({ project, index }) {
  const { title, description, technologies, liveUrl, images = [], accent } = project
  const { t } = useSettings()
  const [activeImage, setActiveImage] = useState(0)

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + images.length) % images.length)
  }

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % images.length)
  }

  useEffect(() => {
    if (images.length < 2) return undefined

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length)
    }, 3500 + index * 250)

    return () => window.clearInterval(interval)
  }, [images.length, index])

  return (
    <article className="project-card">
      <div className={`project-card__visual project-card__visual--${accent || 'violet'}`}>
        {images[activeImage] && (
          <img
            className="is-active"
            src={images[activeImage]}
            alt={`Превью проекта ${title}, экран ${activeImage + 1}`}
            loading="lazy"
            decoding="async"
            key={images[activeImage]}
          />
        )}
        <span className="project-card__number">{formatProjectNumber(index)}</span>
        {images.length > 1 && (
          <div className="project-card__pagination" aria-label={`Скриншоты проекта ${title}`}>
            <button className="project-card__pagination-arrow" type="button" aria-label="Предыдущий скриншот" onClick={showPreviousImage}>←</button>
            <div className="project-card__pagination-track">
              {images.map((image, imageIndex) => (
                <button
                  className={imageIndex === activeImage ? 'is-active' : ''}
                  type="button"
                  aria-label={`Показать скриншот ${imageIndex + 1}`}
                  aria-pressed={imageIndex === activeImage}
                  onClick={() => setActiveImage(imageIndex)}
                  key={image}
                />
              ))}
            </div>
            <span className="project-card__pagination-count">0{activeImage + 1}<i />0{images.length}</span>
            <button className="project-card__pagination-arrow" type="button" aria-label="Следующий скриншот" onClick={showNextImage}>→</button>
          </div>
        )}
      </div>
      <div className="project-card__content">
        <div>
          <h2>{title}</h2>
          <p>{t(description)}</p>
        </div>
        <ul className="tag-list" aria-label={t('common.technologies')}>
          {technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="project-card__links">
          <a href={liveUrl} target="_blank" rel="noreferrer">
            {t('projects.open')} <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  )
}
