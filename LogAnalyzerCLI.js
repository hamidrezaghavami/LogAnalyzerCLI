import fs, { readFileSync } from 'fs';
import path from 'path';

// function read log files
function readLogFiles(folderPath) { 
    if (!fs.readFileSync(folderPath)) { 
        console.log(`Folder does not exist ${folderPath}`);
        return [];
    }

    // get all files in the folder
    const files = fs.readdirSync(folderPath);

    // filter .log files
    const logFilters = files.filter(file => path.extname(file) === '.log');

    // read each log file
    const logs = logFiles.map(file => {
        const fullPath = path.join(folderPath, file);
        const content = fs.readFileSync(fullPath, 'utf-8');
        return content;
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
function analyzeLog(parsedLogs, filters) { 

}

// function format output
function formatOutPut(analysisResult) {

}

// function Display
function displayReport(formattedReport) { 

}

// function filter by date
function filterByDate(logs, start, end) { 
    sortBySeverity(logs);
}

// example usage:
const logs = readLogFiles('./logs');
const parsed = parseLog('./logs/organizer.log');
console.log(logs);
console.log(parsed);