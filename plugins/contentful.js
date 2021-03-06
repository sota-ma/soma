const contentful = require('contentful')

const defaultConfig = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
  CTF_CPA_ACCESS_TOKEN: process.env.CTF_CPA_ACCESS_TOKEN,
  CTF_CDA_HOSTNAME: process.env.CTF_CDA_HOSTNAME,
  CTF_CPA_HOSTNAME: process.env.CTF_CPA_HOSTNAME
}
let __client__ = null
export default {
  createClient(config = defaultConfig) {
    if (__client__ !== null) return __client__
    let accessToken = config.CTF_CPA_ACCESS_TOKEN
    let host = config.CTF_CPA_HOSTNAME
    if (process.env.NODE_DEPLOY === 'production') {
      accessToken = config.CTF_CDA_ACCESS_TOKEN
      host = config.CTF_CDA_HOSTNAME
    }
    __client__ = contentful.createClient({
      space: config.CTF_SPACE_ID,
      accessToken: accessToken,
      host: host
    })
    return __client__
  }
}
