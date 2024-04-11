import fs from "node:fs"
import path from "node:path"
import {
  CRX_BACKGROUND_OUTDIR,
  CRX_CONTENT_OUTDIR,
  CRX_OUTDIR,
} from "./globalConfig.ts"

//复制文件夹
function copyDirectory(srcDir: string, destDir: string) {
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(destDir)
  }

  fs.readdirSync(srcDir).forEach((file) => {
    const srcPath = path.join(srcDir, file) //原始路径
    const destPath = path.join(destDir, file) //目标路径

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  })
}

function deleteDirectory(dir: string) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const currentpath = path.resolve(dir, file)
      if (fs.lstatSync(currentpath).isDirectory()) {
        deleteDirectory(currentpath)
      } else {
        fs.unlinkSync(currentpath)
      }
    })
    fs.rmdirSync(dir)
  }
}

const contentOutDir = path.resolve(process.cwd(), CRX_CONTENT_OUTDIR)
const backgroundOutDir = path.resolve(process.cwd(), CRX_BACKGROUND_OUTDIR)
const outDir = path.resolve(process.cwd(), CRX_OUTDIR)

copyDirectory(contentOutDir, outDir)
copyDirectory(backgroundOutDir, outDir)

deleteDirectory(contentOutDir)
deleteDirectory(backgroundOutDir)
