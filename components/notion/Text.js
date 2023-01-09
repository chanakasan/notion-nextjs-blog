const styles = {}

const Link = ({ text }) => (
  <a className="my-notion-link" target="_blank" href={text.link.url} rel="noreferrer">
    {text.content}
  </a>
)

export default function Text({ text, className }) {
  if (!text) {
    return null
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    const key = `${index}-${value.length}`
    return (
      <span
        key={key}
        className={[
          className ? className : '',
          bold ? styles.bold : '',
          code ? styles.code : '',
          italic ? styles.italic : '',
          strikethrough ? styles.strikethrough : '',
          underline ? styles.underline : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <Link text={text} /> : text.content}
      </span>
    )
  })
}
