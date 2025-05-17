import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as path from 'path'

const TOOL_NAME = 'cosmocc'
const BASE_URL = 'https://cosmo.zip/pub/cosmocc'

async function run(): Promise<void> {
  try {
    const version = core.getInput('version')
    const cacheKey = version || 'current'
    core.info(`Setting up cosmocc${version ? ` version ${version}` : ' (latest)'}`)
    let toolDir = tc.find(TOOL_NAME, cacheKey)
    if (toolDir) {
      core.info(`Found cached cosmocc at ${toolDir}`)
    } else {
      toolDir = await downloadAndCache(version, cacheKey)
    }
    const binDir = path.join(toolDir, 'bin')
    core.addPath(binDir)
    core.info(`Successfully setup cosmocc. Added ${binDir} to PATH`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    core.setFailed(`Failed to setup cosmocc: ${errorMessage}`)
  }
}

async function downloadAndCache(version: string, cacheKey: string): Promise<string> {
  const filename = version ? `cosmocc-${version}.zip` : 'cosmocc.zip'
  const downloadUrl = `${BASE_URL}/${filename}`

  core.info(`Downloading cosmocc from ${downloadUrl}`)

  const downloadPath = await tc.downloadTool(downloadUrl)
  core.info(`Downloaded to ${downloadPath}`)

  const extractPath = await tc.extractZip(downloadPath)
  core.info(`Extracted to ${extractPath}`)

  const cachedDir = await tc.cacheDir(extractPath, TOOL_NAME, cacheKey)
  core.info(`Cached cosmocc at ${cachedDir}`)

  return cachedDir
}

if (require.main === module) {
  run()
}
