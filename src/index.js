#!/usr/bin/env node

const { program } = require('commander');
const download = require("download-git-repo");

program.version('1.0.0')
program.command('create <name>').action(name => {
    const beginTime = new Date().getTime()
    download(`LeoJ340/webpack-template`, `./${name}`, err => {
        const time = (new Date().getTime() - beginTime) / 1000
        console.log(err || `create project finish in ${time}s`)
    })
});

program.parse(process.argv)