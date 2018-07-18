const fs = require('fs')
const path = require('path')

// 文件读取任务是异步的，交给Promise封装
// 将读取文件函数 耗时 封装成为一个Promise
const readFilePromise = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject('错就错在去了美利坚')
            } else {
                resolve(data.toString())
            }
        })
    })
}
// path路径   __dirname 获得当前文件所在目录的完整目录名
const fullFileName = path.resolve(__dirname,"./data/data.json")
const result1 = readFilePromise(fullFileName)

const fullFileName2 = path.resolve(__dirname,"./data/data1.json")
const result2 = readFilePromise(fullFileName2)
// then 可以把事情分步做
// then可以链式操作 一步步去做 同步执行
// thenable 一直链下去
// 参数 第一个 成功执行时候的回调函数
//     第二个 失败执行时的回调函数
/* result1.then(data => {
 *     console.log(data)
 *     // return new Promise()
 *     return result2
 * }).then(data => {
 *     // 下一个then的第一个参数是上一个then的return 返回值
 *     console.log(data)
 * }).catch(err => {
 *     // stack?  reject 传过来的参数
 *     console.log(err.stack);
 * })
 */

Promise.all([result1, result2])
    .then(data => {
        console.log(data[0],data[1])
    })

/* Promise.race([result1, result2])
 *    .then(data => {
 *       console.log(data);
 *   })
 */
/* Promise在ES6中的具体应用
 * 异步无阻塞 no blocking
 * fs.readFile(fileName, (err, data) => {
 *    if (err) {
 *         console.log("读取失败");
 *     } else {
 *         console.log(data.toString()); 
 *     }
 * })
 */