import {
  fetchLogFile,
  parseLogFile,
  getUniquePropertyValues,
  getTopPropertyValuesByCount
} from './logParser.js';

import type { HTTPRequestLog} from './types/httplog.ts'

/**
 * Gets the requested log values from a log file
 * @param {string} logFilePath the path to the log file
 * @param {boolean} includeTies include tied values in the top values
 * @returns {object} an array of unique values for the given property
 */
export const getRequestedLogValues = (logFilePath: string, includeTies = false) => {
  if(!logFilePath) {
    console.log("No log file path provided");
    return null;
  }

  const logFile = fetchLogFile(logFilePath);
  const parsedLogArray = logFile ? parseLogFile(logFile) : [];

  // Filter out null and undefined entries
  const filteredLogArray = parsedLogArray.filter(
    (entry): entry is HTTPRequestLog => entry !== null && entry !== undefined
  );

  // Get number of unique IP addresses
  const uniqueIpAddresses = getUniquePropertyValues(filteredLogArray, 'ip');

  // Get the top 3 IP addresses by count
  const topIpAddresses = getTopPropertyValuesByCount(filteredLogArray, 'ip', 3, includeTies);

  // Get the top 3 URLs by count
  const topUrls = getTopPropertyValuesByCount(filteredLogArray, 'url', 3, includeTies);

  return {
    "uniqueIpAddresses": uniqueIpAddresses.length,
    "topUrls": topUrls,
    "topIpAddresses": topIpAddresses
  }
}