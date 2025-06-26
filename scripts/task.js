import {
  fetchLogFile,
  parseLogFile,
  getUniquePropertyValues,
  getTopPropertyValuesByCount
} from './logParser.js';

/**
 * Gets the requested log values from a log file
 * @param {string} logFilePath the path to the log file
 * @param {string} includeTies include tied values in the top values
 * @returns {object} an array of unique values for the given property
 */
export const getRequestedLogValues = (logFilePath, includeTies = false) => {
  const logFile = fetchLogFile(logFilePath);
  const parsedLogArray = parseLogFile(logFile);

  // Get number of unique IP addresses
  const uniqueIpAddresses = getUniquePropertyValues(parsedLogArray, 'ip');

  // Get the top 3 IP addresses by count
  const topIpAddresses = getTopPropertyValuesByCount(parsedLogArray, 'ip', 3, includeTies);

  // Get the top 3 URLs by count
  const topUrls = getTopPropertyValuesByCount(parsedLogArray, 'url', 3, includeTies);

  return {
    "uniqueIpAddresses": uniqueIpAddresses.length,
    "topUrls": topUrls,
    "topIpAddresses": topIpAddresses
  }
}