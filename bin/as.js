#!/usr/bin/env node

const { exec } = require("child_process");

const config = require("../config.json");

const args = process.argv.slice(2);

if (!args[0]) {
  console.log("please select alias:");
  console.log(Object.keys(config).join(` | `));
  return;
}

const type = args[0];

const command = config[type];

if (!command) {
  console.log("type not defined");
  return;
}

const addition = args[1] || "";

if (Array.isArray(command)) {
  executeCommands(command);
} else {
  executeCommand(command, addition);
}

function executeCommands(commands) {
  for (const command of commands) {
    executeCommand(command);
  }
}

function executeCommand(c, addition) {
  let command = c;
  if (command.includes("$1") && addition) {
    command = command.replace(/\$1/g, addition);
  } else {
    command = command + ` ` + addition;
  }
  exec(command, (error) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(command);
  });
}
