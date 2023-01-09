const values = {
    notion_token: process.env.NOTION_TOKEN,
    notion_database_id: process.env.NOTION_DATABASE_ID,
}

export default {
    get(key) {
        const value = values[key]
        if (typeof value === 'undefined') {
            throw new Error('Invalid argument for Config.get')
        }
        return value
    }
}