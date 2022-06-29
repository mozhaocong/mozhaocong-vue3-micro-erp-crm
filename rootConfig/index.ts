// import fs from 'fs'
import path from 'path'
import { createFile, createFolder, readFile } from './util/fs'
const { resolve } = path
const cwd = resolve('./')

console.log('cwd       : ' + process.cwd())
const data = createFolder(cwd, 'testRoot')
createFile(data as string, '.env.buildMicroChild', '125')
async function asyncReadFile(path: string, name: string) {
	const readData = await readFile(path, name)
	console.log(readData)
}
asyncReadFile(data as string, '.env.buildMicroChild')

// fs.writeFile('123.txt', '你好nodejs 覆盖', 'utf8', function (error) {
// 	if (error) {
// 		console.log(error)
//
// 		return false
// 	}
//
// 	console.log('写入成功')
// })
