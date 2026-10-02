let cache = {}
const CACHE_TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    let key=req.url
        let cacheData = cache[key]
        if (cacheData){
            let age = Date.now() - cacheData.createdAt
            if (age < CACHE_TTL){
                res.set("X-Cache", "HIT")
                return res.json(cacheData.value)
            }
            delete cache[key]   
        }
        res.set("X-Cache", "MISS")

        next()
}

module.exports = {cache,cacheMiddleware}