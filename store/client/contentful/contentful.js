import ContentfulClient from './ContentfulClient'

const defaultConfig = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
  CTF_CPA_ACCESS_TOKEN: process.env.CTF_CPA_ACCESS_TOKEN,
  CTF_CDA_HOSTNAME: process.env.CTF_CDA_HOSTNAME,
  CTF_CPA_HOSTNAME: process.env.CTF_CPA_HOSTNAME
}

const NODE_DEPLOY = process.env.NODE_DEPLOY
let accessToken = defaultConfig.CTF_CPA_ACCESS_TOKEN
let host = defaultConfig.CTF_CPA_HOSTNAME

if (NODE_DEPLOY === 'production') {
  accessToken = defaultConfig.CTF_CDA_ACCESS_TOKEN
  host = defaultConfig.CTF_CDA_HOSTNAME
}

export default new ContentfulClient({
  space: process.env.CTF_SPACE_ID,
  accessToken,
  host
}).contentfulClient
