export default function PageIntro({ title, text }) {
  return (
    <section className="page-intro container">
      <h1>{title}</h1>
      {text && <p className="page-intro__text">{text}</p>}
    </section>
  )
}
