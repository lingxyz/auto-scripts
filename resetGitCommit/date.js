const fs = require('fs')
var commitInfo = JSON.parse(fs.readFileSync('./date_config.json', 'utf8'))

fs.writeFileSync('./date_config.json', `{
	"message": "",
	"commitTime": 1,
	"backDay": ${commitInfo.backDay - 1 - parseInt(Math.random() * 3)}
}`);

const exec = require('child_process').exec

const hourMath = 1000*60*60	// 小时换算毫秒数
const minxins = parseInt((commitInfo.commitTime -1 + Math.random()) * hourMath)	// 时间混淆2小时内
const date = new Date(Date.now() + hourMath*8 - hourMath*24*commitInfo.backDay + minxins)
const GMTString = date.toGMTString()
const CMTString = GMTString.replace('GMT', '+0800')
console.log(CMTString);

// 提交
exec(`git add . && git commit -m "${commitInfo.message}"`, (error, stdout, stderr) => {
	if(error) console.log('error:'+stderr);
	else {
		// 修改最后一次记录时间
		exec(`git commit --amend -m "${commitInfo.message}" --date="${CMTString}"`,function (error, stdout, stderr) {
			if(error) {
				console.log('error:'+stderr);
			} else {
				console.log(stdout);
				// 打印最近三次历史
				exec(`git log -3 --pretty=format:"%h %ad : %s"`, (error, stdout, stderr) => {
					if(error) console.log('error:'+stderr);
					else console.log('最近三次提交历史：\n', stdout);
				});
			}
		});
	}
});