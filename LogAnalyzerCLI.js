import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// function read log files
function readLogFiles(folderPath) { 
    if (!fs.existsSync(folderPath)) { 
        console.log(`Folder does not exist ${folderPath}`);
        return [];
    }

    const files = fs.readdirSync(folderPath);
    const logFiles = files.filter(file => path.extname(file) === '.log');

    const logs = logFiles.map(file => fs.readFileSync(path.join(folderPath, file), 'utf-8')); // simplify
    return logs;
}

// function parse log 
function parseLog(logFilePath = path.join(__dirname, 'organizer.log')) {
    if (!fs.existsSync(logFilePath)) { 
        console.log('No  log file found') // 13 lines refactor to 9
        return [];
    }
    return fs.readFileSync(logFilePath, 'utf-8')
    .split('\n')
    .filter(line => line.trim());
}

// function Analyze Logs
function analyzeLog(parsedLogs, { severity, startDate, endDate}) { 
    const filteredLogs = parsedLogs.filter(log => { 
        const date = Date(log.split(" "[0]));
        return ( !severity || log.includes(severity)) &&
        (!startDate || date >= new Date(startDate)) &&
        (!endDate || date >= new Date(endDate));
    });

    const summary = ["ERROR", "WARN", "INFO"].reduce((acc, level) => { 
        acc[level.toLowerCase()] = filteredLogs.filter(l => l.includes(level)).length;
        return acc;
    }, { total: filteredLogs.length });
    
    return { filteredLogs, summary }; // 24 lines refactor to 13
}

// function format output
function formatOutPut(analysisResult) {
    const summary = analysisResult.summary;

    const output = `
    Total logs: ${summary.total}
    Errors: ${summary.errors}
    warnings: ${summary.warnings}
    Info: ${summary.info}
    `;

    return output;
}

// function Display
function displayReport(formattedReport) { 
    console.log(chalk.blue(formattedReport));
}

// example usage:
const logs = readLogFiles('./logs');
const parsedLogs = parseLog('./logs/organizer.log');

const filters = { severity: 'ERROR', startDate: '2025-09-01', endDate: '2025-09-25' };

const result = analyzeLog(parsedLogs, filters);
const formatted = formatOutPut(result);
displayReport(formatted);