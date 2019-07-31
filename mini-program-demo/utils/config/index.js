import config from './env.config'

let env = 'dev'
let envConfig = config[env]
const version = 'v1.0.0'

export {
  envConfig,
  version
}