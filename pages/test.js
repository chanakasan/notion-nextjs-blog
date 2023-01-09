import Article from '@/components/notion/Article'
import PageWrapper from '@/components/PageWrapper'
import { getPageContent } from '@/lib/notion'

export default function Test({ page, blocks }) {
  const title = page.properties.Name.title[0].plain_text
  const props = {
    title,
  }
  return (
    <PageWrapper {...props}>
      <Article page={page} blocks={blocks} />
    </PageWrapper>
  )
}

export const getStaticProps = async () => {
  const pageId = '41b6c0e6917647888b3a364bc2db42ba'
  const { page, blocks } = await getPageContent(pageId)
  return {
    props: {
      page,
      blocks,
    },
  }
}
