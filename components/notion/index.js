import * as allBlocks from './Blocks'

import { Fragment } from 'react'
import Link from 'next/link'
import _Text from './Text'

export const Text = _Text

function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
}

export const renderNestedList = (value) => {
  if (!value) return null

  const isNumberedList = value.children[0].type === 'numbered_list_item'

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>
}

export const renderBlock = (block) => {
  const { type, id } = block
  const value = block[type]
  const key = titleCase(type)
  const BlockComponent = allBlocks[key]
  if (!BlockComponent) {
    const reason = type === 'unsupported' ? 'unsupported by Notion API' : type
    return `${type}:(${reason})`
  }
  return (
    <Fragment key={id}>
      <BlockComponent value={value} block={block} />
    </Fragment>
  )
}

export const groupBlocks = (blocks) => {
  const groups = [[blocks[0]]]
  blocks.forEach((b, index) => {
    const n1 = groups.length - 1
    const type = b.type
    const last_type = groups[n1][0].type
    if (index === 0) {
      return
    }
    if (last_type === 'numbered_list_item' && type === 'numbered_list_item') {
      groups[n1].push(b)
    } else if (last_type === 'numbered_list_item' && type !== 'numbered_list_item') {
      groups.push([b])
    } else if (last_type !== 'numbered_list_item' && type === 'numbered_list_item') {
      groups.push([b])
    } else if (last_type !== 'numbered_list_item' && type !== 'numbered_list_item') {
      groups[n1].push(b)
    }
  })
  return groups
}

export const renderGroup = (blocks) => {
  const Li = allBlocks.Numbered_list_item
  if (blocks[0].type === 'numbered_list_item') {
    return (
      <ol className="my-notion-ol">
        {blocks.map((b) => (
          <Li key={b.id} value={b[b.type]} />
        ))}
      </ol>
    )
  } else {
    return blocks.map((block) => <Fragment key={block.id}>{renderBlock(block)}</Fragment>)
  }
}
