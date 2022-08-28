#!/usr/bin/env node

import { program } from 'commander';

// commands
import init from './command/init';

program.version('1.0.0')

init(program)

program.parse(process.argv)