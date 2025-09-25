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

    const logs = logFiles.map(file => {
        const fullPath = path.join(folderPath, file);
        return fs.readFileSync(fullPath, 'utf-8');
    });
    return logs;
}

// function parse log 
function parseLog(logFilePath = path.join(__dirname, 'organizer.log')) { 
    if (!fs.existsSync(logFilePath)) { 
        console.log('No log file found');
        return [];
    }

    const logContent = fs.readFileSync(logFilePath, 'utf-8');

    const entries = logContent
    .split('\n')
    .filter(line => line.trim() !== '');

    return entries;
}

// function Analyze Logs
function analyzeLog(parsedLogs, filters = {}) { 
    let filteredLogs = parsedLogs;

    if (filters.severity) { 
        filteredLogs = filteredLogs.filter(log => log.includes(filters.severity));
    }

    if (filters.startDate || filters.endDate) { 
        filteredLogs = filteredLogs.filter(log => {
            const datePart = log.split(" ")[0];
            const logDate = new Date(datePart);
            
            if (filters.startDate && logDate < new Date(filters.startDate)) return false;
            if (filters.endDate && logDate > new Date(filters.endDate)) return false;
            return true;
        });
    }

    const summary = { 
        total: filteredLogs.length, 
        errors: filteredLogs.filter(l => l.includes("ERROR")).length,
        warnings: filteredLogs.filter(l => l.includes("WARN")).length,
        info: filteredLogs.filter(l => l.includes("INFO")).length,
    };
    return { filteredLogs, summary };
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