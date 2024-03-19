const redis = require("../database/redis")

const cacheExpired = process.env.CACHE_EXPIRED || 3600;

const getCache = async (key) => {

    let result = JSON.parse(await redis.get(key))

    return result
}

const setCache = async (key, value) => {
    
    let stringifiedValue = JSON.stringify(value)

    return await redis.setex(key, cacheExpired, stringifiedValue)
}

module.exports = {
    getCache, 
    setCache
}