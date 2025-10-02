import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// function read log files ( refactoring 10 lines into 9 )
function readLogFiles(folderPath) { 
    if (!fs.existsSync(folderPath)) { 
        console.log(`Folder does not exist ${folderPath}`);
        return [];
    }

    return fs.readdirSync(folderPath)
    .filter(file => path.extname(file) === '.log')
    .map(file => fs.readFileSync(path.join(folderPath, file), 'utf-8'));
}

// function parse log (13 lines refactor into 9)
function parseLog(logFilePath = path.join(__dirname, 'organizer.log')) {
    if (!fs.existsSync(logFilePath)) { 
        console.log('No  log file found')
        return [];
    }
    return fs.readFileSync(logFilePath, 'utf-8')
    .split('\n')
    .filter(line => line.trim());
}

// function Analyze Logs (24 lines refactor into 13)
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
    
    return { filteredLogs, summary };
}

// function format output ( refactor 11 lines into 9 )
function formatOutPut({summary}) {

    return` Total logs: ${summary.total}, Errors: ${summary.errors}
    warnings: ${summary.warnings}, Info: ${summary.info} `;
}

// function Display
function displayReport(formattedReport) { 
    console.log(chalk.blue(formattedReport));
}

// example usage: ( simplified 7 lines )
const filters = { severity: 'ERROR', startDate: '2025-09-01', endDate: '2025-09-25' };
const formattedReport = formatOutPut (  // nested functions call ( chaining them )
    analyzeLog(
        parseLog('./log/organizer.log'),
        filters
    )
);
displayReport(formattedReport);