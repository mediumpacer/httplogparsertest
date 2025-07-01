import * as fs from 'node:fs';
import type { HTTPRequestLog} from './types/httplog.ts'

// Regular expression to match the log format
// export const logRegexOld = /^(\d{1,3}(?:\.\d{1,3}){3}) - (?:([^\s-]+)|-) \[([^\]]+)\] "(GET) ([^"]+) (HTTP\/[0-9.]+)" (\d{3}) (\d+) "-" "([^"]+)"(?:.*)?$/;
export const logRegex = /^(?<ip>\d{1,3}(?:\.\d{1,3}){3}) - (?:(?<user>[^\s-]+)|-) \[(?<timestamp>[^\]]+)\] "(?<method>GET) ((?<url>[^"]+) (?<protocol>HTTP\/[0-9.]+)") (?<status>\d{3}) (?<size>\d+) "-" "(?<userAgent>[^"]+)"(?:.*)?$/;

/**
 * Adds two numbers together and returns the result.
 * @param {string} file path to the log file
 * @returns {string} Log file parsed as a string
 */
export const fetchLogFile = (file: string) => {
  if (!fs.existsSync(file)) {
    console.error('Log file does not exist:', file);
    return null;
  }

  try {
    const fileData = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
    return fileData;
  } catch (err) {
    console.error(`Error reading ${file}`, err);
  }
};

/**
 * Splits a log file in string format into an array of objects
 * @param {string} file the log file in string format
 * @returns {array} Log file parsed as a string
 */
export const parseLogFile = (logFile: string) => {
  if (!logFile || typeof logFile !== 'string' || logFile.length === 0) {
    return [];
  }

  const logArray = logFile.split("\n").map(line => {
    // Skip empty lines
    if (!line.trim()) return null;

    const match = line.match(logRegex);

    if (match && match.groups) {
      const logEntry = {
        "ip": match.groups.ip,
        "user": match.groups.user || null,
        "timestamp": match.groups.timestamp,
        "method": match.groups.method,
        "url": match.groups.url,
        "protocol": match.groups.protocol,
        "status": parseInt(match.groups.status),
        "size": parseInt(match.groups.size),
        "userAgent": match.groups.userAgent
      };

      const isUrlAFile = logEntry.url.split('/').pop();

      // if the URL is a file, we return null
      return (isUrlAFile) ? null : logEntry;
    }
  });

  // Filter out null entries
  return logArray.filter(log => log) || []
};

/**
 * Finds unique values for a given property in an array of objects
 * @param {Array<HTTPRequestLog>} arr the array of objects to search
 * @param {string} prop the property to find unique values for
 * @returns {array} an array of unique values for the given property
 */
export const getUniquePropertyValues = (arr: HTTPRequestLog[], prop: string) => {
  if (!arr || !Array.isArray(arr) || arr.length === 0 || !prop) {
    return [];
  }
  return [...new Set(arr.map((item: HTTPRequestLog) => item[prop]))];
};

/**
 * Gets a list of the top property values by count
 * @param {Array<HTTPRequestLog>} arr the array of objects to search
 * @param {string} prop the property to find unique values for
 * @param {number} places the number of places to return
 * @param {boolean} showTiedPlaces show tied values or return the exact number of places
 * @returns {array} an array of values for the given property, sorted by places number
 */
export const getTopPropertyValuesByCount = (arr: HTTPRequestLog[], prop: string, places: number, showTiedPlaces = false) => {
  if (!arr || !Array.isArray(arr) || arr.length === 0 || !prop || typeof places !== 'number' || places <= 0) {
    return [];
  }

  // const propCount =  arr.reduce((prev: HTTPRequestLog, curr: HTTPRequestLog) => (prev[curr[prop]] = ++prev[curr[prop]] || 1, prev), {});

  const propCount = arr.reduce((prev: Record<string, number>, curr: HTTPRequestLog) => {
    const key = String(curr[prop]);
    prev[key] = (prev[key] || 0) + 1;
    return prev;
  }, {});


  const sortedEntries = Object.entries(propCount).sort((a, b) => b[1] - a[1]);
  const placeCount = sortedEntries[places - 1] ? sortedEntries[places - 1][1] : 0;
  const topValues = showTiedPlaces ? sortedEntries.filter(([key, count]) => count >= placeCount) : sortedEntries.slice(0, places);

  return topValues;
};