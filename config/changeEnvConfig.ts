preCheck()

function preCheck() {
  const fs = require('fs')
  const path = require('path')
  const appDirectory = fs.realpathSync(process.cwd())
  const configPath = path.resolve(appDirectory, 'config')
  const publicPath = path.resolve(appDirectory, 'public')
  const srcPath = path.resolve(appDirectory, 'src')

  // 全環境変数定義ファイル
  const env = JSON.parse(fs.readFileSync(`${configPath}/env.json`))
  // // 試験環境
  // if (process.argv.length === 3 && process.argv[2] === 'staging') {
  //   // 環境変数ファイルの書き換える
  //   let content = fs.readFileSync(`${srcPath}/env_configuration.json`, 'utf-8')
  //   content = content.replace('%REDIRECT_URL%', env['staging'].redirectUri)
  //   fs.writeFileSync(`${srcPath}/env_configuration.json`, content)
  // }

  // 生産環境
  if (process.argv.length === 3 && process.argv[2] === 'production') {
    // 環境変数ファイルの書き換える
    let content = fs.readFileSync(`${srcPath}/env_configuration.json`, 'utf-8')
    content = content.replace(env['local'].clientId, env['production'].clientId)
    content = content.replace(env['local'].redirectUri, env['production'].redirectUri)
    fs.writeFileSync(`${srcPath}/env_configuration.json`, content)
  }
}
