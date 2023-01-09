import Link from 'next/link'
import { Fragment } from 'react'
import { Text, renderGroup, groupBlocks } from '@/components/notion'

const Article = ({ page, blocks }) => {
  const coverImageUrl = page?.cover?.external?.url || '/images/gradient.svg'
  const groups = groupBlocks(blocks)
  return (
    <article className="blogPost">
      <h1 className="bold text-4xl">
        <Text text={page.properties.Name.title} />
      </h1>
      <img
        className="w-full object-cover object-center md:h-96 lg:h-96"
        src={coverImageUrl}
        alt="cover image"
      />

      <section>
        {groups.map((g) => (
          <Fragment key={g[0].id}>{renderGroup(g)}</Fragment>
        ))}
      </section>
    </article>
  )
}

export default Article
