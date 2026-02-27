import { formatDiffInStylish } from './stylish.js'
import { formatDiffInPlain } from './plain.js'
import { formatDiffInJson } from './json.js'
import parseData from '../parsers.js'
import { getDiff } from '../compare.js'

const FORMATS = ['stylish', 'plain', 'json']

function genDiff(filePath1, filePath2, format) {


  const data1 = parseData(filePath1)
  const data2 = parseData(filePath2)

  const diffsNode = getDiff(data1, data2)
  let formattedDiff

  switch (format) {
    case 'stylish':
      formattedDiff = formatDiffInStylish(diffsNode)
      break
    case 'plain':
      formattedDiff = formatDiffInPlain(diffsNode)
      break
    case 'json':
      formattedDiff = JSON.stringify(formatDiffInJson(diffsNode), null, 2)
      break
    default:
      // if (!FORMATS.includes(format)) {
      console.log('Format should be "stylish", "plain", "json" only. If the format is not specified, the default value is "stylish"')
      return ''
    // }
    // break
  }

  return formattedDiff
}

export default genDiff
