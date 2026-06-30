import { useState } from 'react'
import { useSettings } from '../../context/SettingsContext'

const STORAGE_KEY = 'rusalina-portfolio-reviews'

const loadReviews = () => {
  try {
    const savedReviews = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    return Array.isArray(savedReviews) ? savedReviews : []
  } catch {
    return []
  }
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState(loadReviews)
  const [rating, setRating] = useState(5)
  const [errors, setErrors] = useState({})
  const { language, t } = useSettings()
  const locale = language === 'uz' ? 'uz-UZ' : language === 'en' ? 'en-US' : 'ru-RU'
  const exampleNotice = language === 'en'
    ? 'Examples of how reviews will look. Published visitor reviews appear first.'
    : language === 'uz'
      ? 'Fikrlar qanday ko‘rinishiga misollar. Tashrif buyuruvchilarning fikrlari yuqorida chiqadi.'
      : 'Примеры оформления карточек. Опубликованные отзывы посетителей появляются выше.'
  const exampleReviews = [
    { id: 'example-1', name: 'Alina K.', role: t('reviews.demo1Role').replace(/\s*·\s*demo/gi, ''), text: t('reviews.demo1Text'), rating: 5 },
    { id: 'example-2', name: 'Malika A.', role: t('reviews.demo2Role').replace(/\s*·\s*demo/gi, ''), text: t('reviews.demo2Text'), rating: 5 },
    { id: 'example-3', name: 'Timur S.', role: t('reviews.demo3Role').replace(/\s*·\s*demo/gi, ''), text: t('reviews.demo3Text'), rating: 5 },
  ]
  const visibleReviews = [...reviews, ...exampleReviews]

  const publishReview = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = data.get('review-name').trim()
    const role = data.get('review-role').trim()
    const text = data.get('review-text').trim()
    const nextErrors = {}

    if (name.length < 2) nextErrors.name = t('reviews.nameError')
    if (text.length < 15) nextErrors.text = t('reviews.textError')

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      form.querySelector(nextErrors.name ? '[name="review-name"]' : '[name="review-text"]')?.focus()
      return
    }

    const review = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      role,
      text,
      rating,
      date: new Date().toISOString(),
    }
    const updatedReviews = [review, ...reviews]
    setReviews(updatedReviews)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews))
    } catch {
      // Отзыв всё равно сразу показывается, даже если хранилище браузера недоступно.
    }
    form.reset()
    setRating(5)
  }

  const updateError = (field, value) => {
    if (!errors[field]) return
    const minimum = field === 'name' ? 2 : 15
    setErrors((current) => ({ ...current, [field]: value.trim().length >= minimum ? '' : current[field] }))
  }

  return (
    <section className="reviews container">
      <div className="reviews__heading">
        <h2>{t('reviews.title')}<br /><em>{t('reviews.accent')}</em></h2>
        <p>{t('reviews.text')}</p>
      </div>

      <div className="reviews__content">
        <form className="review-form" onSubmit={publishReview} noValidate>
          <div className="review-form__row">
            <label>
              <span>{t('reviews.name')}</span>
              <input className={errors.name ? 'has-error' : ''} name="review-name" placeholder={t('reviews.namePh')} onChange={(event) => updateError('name', event.target.value)} aria-invalid={Boolean(errors.name)} />
              {errors.name && <small className="field-error"><i>!</i>{errors.name}</small>}
            </label>
            <label>
              <span>{t('reviews.role')}</span>
              <input name="review-role" placeholder={t('reviews.rolePh')} />
            </label>
          </div>
          <fieldset className="rating-picker">
            <legend>{t('reviews.rating')}</legend>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <button className={value <= rating ? 'is-active' : ''} type="button" aria-label={`${value} из 5`} aria-pressed={rating === value} onClick={() => setRating(value)} key={value}>★</button>
              ))}
            </div>
          </fieldset>
          <label>
            <span>{t('reviews.review')}</span>
            <textarea className={errors.text ? 'has-error' : ''} name="review-text" rows="4" placeholder={t('reviews.reviewPh')} onChange={(event) => updateError('text', event.target.value)} aria-invalid={Boolean(errors.text)} />
            {errors.text && <small className="field-error"><i>!</i>{errors.text}</small>}
          </label>
          <button className="button button--primary" type="submit">{t('reviews.publish')} <span aria-hidden="true">↗</span></button>
        </form>

        <div className="review-list" aria-live="polite">
          <p className="review-list__notice">{exampleNotice}</p>
          {visibleReviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-card__top">
                <div className="review-card__avatar">{review.name.slice(0, 1).toUpperCase()}</div>
                <div><h3>{review.name}</h3>{review.role && <span>{review.role}</span>}</div>
                <div className="review-card__rating" aria-label={`${review.rating} из 5`}>{'★'.repeat(review.rating)}</div>
              </div>
              <blockquote>{review.text}</blockquote>
              {review.date && <time>{review.date.includes('T') ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(review.date)) : review.date}</time>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
