import { getDatabase, getPage, getBlocks, getSlug } from '@/lib/notion'
import Config from '@/lib/config'

const getPageContent = async (pageId, pageSlug) => {
  const databaseId = Config.get('notion_database_id')
  const database = await getDatabase(databaseId)
  let page = null
  if (pageSlug) {
    page = database.find((page) => getSlug(page) === pageSlug)
  } else {
    page = await getPage(pageId)
  }
  const blocks = await getBlocks(page.id)

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find((x) => x.id === block.id)?.children
    }
    return block
  })

  return {
    database,
    page,
    blocks: blocksWithChildren,
  }
}

export default getPageContent
