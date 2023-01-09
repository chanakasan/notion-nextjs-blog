export const getSlug = (page) => {

  try {
    return slugify(page.properties.Name.title[0].plain_text).toLowerCase()
  } catch (err) {
    return page.url.split('/').pop()
  }
}
