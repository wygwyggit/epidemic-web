let fs = require('fs')
let path = require('path')
let xlsx = require('node-xlsx')

let fileArr = [{
    path: path.resolve(__dirname, '../src/lang/en/'),
    name: 'en_origin_console',
},]

fileArr.forEach(item => {
    let allArr = []
    fs.readdir(item.path, (err, files) => {
        if (err) {
            console.error(err)
        } else {
            files.forEach(fileName => {
                let fileUrl = path.join(item.path, fileName)
                let data = fs.readFileSync(fileUrl)
                let con = data.toString('utf-8').replace(/(\/\/.*|\/\*+.*\*+\/)+/g, '')
                con.replace(/([^{\s]+):\s*['|"]{1}([^{'"]+)['|"]{1}/g, (res, $1, $2) => {
                    if ($2) {
                        allArr.push({
                            key: $1,
                            content: $2
                        })
                    }
                    return $2
                })
            })
        }
        excellArr = allArr.reduce(function (pre, cur, index) {
            pre.push([cur.key, cur.content, '']);
            return pre;
        }, []);
        excellArr.unshift(['页面关键字', '英文内容', '中文内容'])
        var options = {
            '!cols': [{
                wch: 36
            }, {
                wch: 36
            }, {
                wch: 36
            }]
        }
        var buffer = xlsx.build([{
            name: 'sheeti',
            data: excellArr
        }], options)
        let excelName = item.name + '.xlsx'
        fs.writeFileSync(path.resolve(__dirname, '../package', excelName), buffer, {
            'flag': 'w'
        })
        console.log('生成excel完成');
    })
})