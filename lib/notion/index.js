import { Client } from '@notionhq/client'
import getPageContent from './getPageContent'
import { getSlug } from './utils'
import Config from '@/lib/config'
export { 
  getPageContent,
  getSlug
}

const notion = new Client({
  auth: Config.get('notion_token')
})

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  })
  return response.results
}

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

/* eslint-disable no-constant-condition */
export const getBlocks = async (blockId) => {
  const blocks = []
  let cursor
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    })
    blocks.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  return blocks
}
/* eslint-enable no-constant-condition */

// export const getUser = async (userId) => {
//   const response = await notion.users.retrieve({ user_id: userId })
//   return response
// }
