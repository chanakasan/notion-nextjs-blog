import { renderBlock, renderNestedList } from './index'

import { Fragment } from 'react'
import Link from 'next/link'
import Text from './Text'
import slugify from 'slugify'
import { useRouter } from 'next/router'

const styles = {}

export const Paragraph = ({ value }) => (
  <p style={{ minHeight: '16px', margin: '1em 0' }}>
    <Text text={value.rich_text} />
  </p>
)

export const Heading_1 = ({ value }) => (
  <h1 className="bold">
    <Text text={value.rich_text} />
  </h1>
)

export const Heading_2 = ({ value }) => (
  <h2 className="bold">
    <Text text={value.rich_text} />
  </h2>
)

export const Heading_3 = ({ value }) => (
  <h3 className="bold">
    <Text text={value.rich_text} />
  </h3>
)

export const Bulleted_list_item = ({ value }) => (
  <li className="pl-4">
    <Text text={value.rich_text} />
    {!!value.children && renderNestedList(value)}
  </li>
)

export const Numbered_list_item = ({ value }) => (
  <li>
    <Text text={value.rich_text} />
    {!!value.children && renderNestedList(value)}
  </li>
)

export const To_do = ({ value }) => (
  <div>
    <label htmlFor={value.id}>
      <input type="checkbox" id={value.id} defaultChecked={value.checked} />{' '}
      <Text text={value.rich_text} />
    </label>
  </div>
)

export const Toggle = ({ value }) => (
  <details className="transition-all">
    <summary className="justfiy-between my-2 flex w-full select-none flex-row items-center space-x-3 rounded-md bg-gray-800 p-6 hover:bg-gray-700">
      <Text className="bold text-2xl" text={value.rich_text} />
      <svg width="18" height="18" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.17929 6.225L2.22929 4.275C1.99179 4.0375 1.93879 3.76575 2.07029 3.45975C2.20129 3.15325 2.43554 3 2.77304 3H6.63554C6.97304 3 7.20729 3.15325 7.33829 3.45975C7.46979 3.76575 7.41679 4.0375 7.17929 4.275L5.22929 6.225C5.15429 6.3 5.07304 6.35625 4.98554 6.39375C4.89804 6.43125 4.80429 6.45 4.70429 6.45C4.60429 6.45 4.51054 6.43125 4.42304 6.39375C4.33554 6.35625 4.25429 6.3 4.17929 6.225Z"
          fill="#6B7280"
        />
      </svg>
    </summary>
    <div className="pl-8 pr-4 text-left">
      {value.children?.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  </details>
)
export const Child_page = ({ value }) => {
  return (
    <details className="rounded-md bg-gray-800 transition-all ">
      <summary className="justfiy-between my-2 flex w-full select-none flex-row items-center space-x-3 p-6 hover:bg-gray-700 ">
        <p className="bold text-2xl">{value.title}</p>
        <svg
          width="18"
          height="18"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.17929 6.225L2.22929 4.275C1.99179 4.0375 1.93879 3.76575 2.07029 3.45975C2.20129 3.15325 2.43554 3 2.77304 3H6.63554C6.97304 3 7.20729 3.15325 7.33829 3.45975C7.46979 3.76575 7.41679 4.0375 7.17929 4.275L5.22929 6.225C5.15429 6.3 5.07304 6.35625 4.98554 6.39375C4.89804 6.43125 4.80429 6.45 4.70429 6.45C4.60429 6.45 4.51054 6.43125 4.42304 6.39375C4.33554 6.35625 4.25429 6.3 4.17929 6.225Z"
            fill="#6B7280"
          />
        </svg>
      </summary>
      <div className="pl-8 pr-4 text-left">
        {value.children?.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </div>
    </details>
  )
}

export const Image = ({ value, block }) => {
  const src = value.type === 'external' ? value.external.url : value.file.url
  const caption = value.caption ? value.caption[0]?.plain_text : ''
  // DEBUG
  // console.log({ image: value, block })
  return (
    <figure className="">
      <img src={src} alt={caption} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export const Video = ({ value }) => {
  const src = value.file.url
  const caption = value.caption ? value.caption[0]?.plain_text : ''
  return (
    <figure className="">
      <video width="100%" controls>
        <source src={src} type="video/mp4" />
      </video>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export const Quote = ({ value }) => (
  <blockquote key={value.id}>{value.rich_text[0].plain_text}</blockquote>
)

export const Table = ({ value }) => {
  return <blockquote key={value.id}>{value.rich_text?.[0].plain_text}</blockquote>
}

export const Divider = ({ value }) => (
  <div className="flex w-full flex-col items-center py-4">
    <div className="h-1 w-20 bg-gray-500" key={value.id} />
  </div>
)

export const Code = ({ value }) => (
  <pre className={styles.pre}>
    <code className={styles.code_block} key={value.id}>
      {value.rich_text[0].plain_text}
    </code>
  </pre>
)

export const File = ({ value }) => {
  const src_file = value.type === 'external' ? value.external.url : value.file.url
  const splitSourceArray = src_file.split('/')
  const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
  const caption_file = value.caption ? value.caption[0]?.plain_text : ''
  return (
    <figure>
      <div className={styles.file}>
        📎{' '}
        <Link href={src_file} passHref>
          {lastElementInArray.split('?')[0]}
        </Link>
      </div>
      {caption_file && <figcaption>{caption_file}</figcaption>}
    </figure>
  )
}

export const Bookmark = ({ value }) => (
  <a href={value.url} target="_brank" className={styles.bookmark}>
    {value.url}
  </a>
)
