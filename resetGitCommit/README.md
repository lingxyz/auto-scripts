# reset-git-commit

## 功能介绍
- 重新修改git最后一次提交记录。
- 从某个时间开始，每隔1-3天提交一次（随机，也可自行设置）。
- 每天可提交n次，每次提交间隔时间为1h以内随机。

## 使用场景
当提交信息写错时，可用命令`git commit --amend --date="${date -R}" -m "commity message"`来重写最后一次提交记录。

也可用来补全git提交历史，分散提交记录。

## 使用方法
1. 将脚本copy到项目中。
2. 在`.gitignore`中新增
```bash
date.js
date_config.js
```
3. 忽略`.gitignore`的更改
```bash
git update-index --assume-unchanged .gitignore
```
4. 修改配置文件
```js
// date_config.js
{
	"message": "",	// commit message
	"commitTime": 1,	// 当天当次是第几次提交
	"backDay": 1500	// 设置开始时间1500天前
}
```
5. 提交
```bash
node date.js
```
