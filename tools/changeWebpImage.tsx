import { readFileSync } from 'fs'
import sharp from 'sharp'

const imgPath = readFileSync('', 'utf-8') // 元画像のパス
const outputDir = '' // 出力先のディレクトリ
const outputFilePath = '' // 出力するファイルパス

// 画像をWebP形式に変換する
export const changeWebpImage = (imgPath: string, outputDir: string, outputFilePath: string) => {
  const fileName = outputFilePath.split('/').reverse()[0] // 拡張子を含む画像ファイル名
  const imgName = fileName.split('.')[0] // 拡張子を除く画像ファイル名
  sharp(imgPath)
    .webp({
      quality: 75,
    })
    .toFile(`${outputDir}${imgName}.webp`, (err) => {
      if (err) console.error(err)
    })
}

changeWebpImage(imgPath, outputDir, outputFilePath)
