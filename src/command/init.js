import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import download from 'download-git-repo';

export default (program) => {
    program.command('init <name>').action(name => {
        // 基本信息
        inquirer.prompt([
            {
                name: 'author',
                message: '你的名字是：'
            },
            {
                name: 'version',
                message: '版本号',
                default: '1.0.0'
            },
            {
                name: 'description',
                message: '项目描述',
                default: 'a web project template with Babel & ESLint'
            }
        ]).then(res => {
            const { author, version, description } = res
            const beginTime = new Date().getTime()
            const downloadPath = path.join(process.cwd(), name)
            const loading = ora('template downloading...');
            loading.start()
            download(`LeoJ340/webpack-template`, downloadPath, err => {
                if (!err) {
                    loading.succeed();
                    const time = (new Date().getTime() - beginTime) / 1000
                    console.log(chalk.green(`create project finish in ${time}s`))
                    // 替换 package.json 信息
                    const packagePath = path.join(downloadPath, 'package.json')
                    const packageJson = JSON.parse(fs.readFileSync(packagePath).toString())
                    Object.assign(packageJson, { name, author, version, description })
                    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, '\t'))
                } else {
                    loading.stop()
                    console.error(err);
                }
            })
        })
    });
}
