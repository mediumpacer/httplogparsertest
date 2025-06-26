import * as fs from 'node:fs';

// Regular expression to match the log format
export const logRegex = /^(\d{1,3}(?:\.\d{1,3}){3}) - (?:([^\s-]+)|-) \[([^\]]+)\] "(GET) ([^"]+) (HTTP\/[0-9.]+)" (\d{3}) (\d+) "-" "([^"]+)"(?:.*)?$/;

/**
 * Adds two numbers together and returns the result.
 * @param {string} file path to the log file
 * @returns {string} Log file parsed as a string
 */
export const fetchLogFile = (file) => {
  if (!fs.existsSync(file)) {
    console.error('Log file does not exist:', file);
    return null;
  }

  return fs.readFileSync(file, 'utf8', (err, file) => {
    if (err) {
      console.error('Error fetching log file', err);
      return null;
    }
  });
};

/**
 * Splits a log file in string format into an array of objects
 * @param {string} file the log file in string format
 * @returns {array} Log file parsed as a string
 */
export const parseLogFile = (logFile) => {
  if (!logFile || typeof logFile !== 'string' || logFile.length === 0) {
    return [];
  }

  const logArray = logFile.split("\n").map(line => {
    // Skip empty lines
    if (!line.trim()) return null;

    const match = line.match(logRegex);

    if (match) {
      const [
        full,
        ip,
        user,
        timestamp,
        method,
        url,
        protocol,
        status,
        size,
        userAgent
      ] = match;

      const logEntry = {
        "ip": ip,
        "user": user || null,
        "timestamp": timestamp,
        "method": method,
        "url": url,
        "protocol": protocol,
        "status": parseInt(status),
        "size": parseInt(size),
        "userAgent": userAgent
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
 * @param {array} arr the array of objects to search
 * @param {string} prop the property to find unique values for
 * @returns {array} an array of unique values for the given property
 */
export const getUniquePropertyValues = (arr, prop) => {
  if (!arr || !Array.isArray(arr) || arr.length === 0 || !prop) {
    return [];
  }
  return [... new Set(arr.map(item=>item[prop]))];
};

/**
 * Gets a list of the top property values by count
 * @param {array} arr the array of objects to search
 * @param {string} prop the property to find unique values for
 * @param {number} places the number of places to return
 * @param {boolean} showTiedPlaces show tied values or return the exact number of places
 * @returns {array} an array of values for the given property, sorted by places number
 */
export const getTopPropertyValuesByCount = (arr, prop, places, showTiedPlaces = false) => {
  if (!arr || !Array.isArray(arr) || arr.length === 0 || !prop || typeof places !== 'number' || places <= 0) {
    return [];
  }

  const propCount =  arr.reduce((prev, curr) => (prev[curr[prop]] = ++prev[curr[prop]] || 1, prev), {});
  const sortedEntries = Object.entries(propCount).sort((a, b) => b[1] - a[1]);
  const placeCount = sortedEntries[places - 1] ? sortedEntries[places - 1][1] : null;

  const topValues = showTiedPlaces ? sortedEntries.filter(([key, count]) => count >= placeCount) : sortedEntries.slice(0, places);

  return topValues;
};