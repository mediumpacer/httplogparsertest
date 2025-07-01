import { describe, expect, it } from 'vitest'
import { fetchLogFile, parseLogFile, getUniquePropertyValues, getTopPropertyValuesByCount } from './logParser.js';
import { mockParsedLog, mockParsedLogArray } from './src/mocks/mockParse.js';

describe('fetchLogFile', () => {
  it('should return a string', () => {
    const logFile = fetchLogFile("./logs/programming-task-example-data.log");
    expect(typeof logFile).toBe('string');
  });

  it('should return a non-empty string', () => {
    const logFile = fetchLogFile("./logs/programming-task-example-data.log");
    expect(logFile.length).toBeGreaterThan(0);
  });

  it('should return null if file does not exist', () => {
    const missingFile = fetchLogFile("./logs/thisdoesntexist.log");
    expect(missingFile).toBeNull();
  });
});

describe('parseLogFile', () => {
  it('should return an array of log entries', () => {
    const parsedLogArray = parseLogFile(mockParsedLog);
    expect(Array.isArray(parsedLogArray)).toBe(true);
    expect(parsedLogArray.length).toBeGreaterThan(0);
    expect(parsedLogArray[0]).toHaveProperty('ip');
    expect(parsedLogArray[0]).toHaveProperty('url');
  });

  it('should return an empty array for an empty log file', () => {
    const parsedLogArray = parseLogFile('');
    expect(Array.isArray(parsedLogArray)).toBe(true);
    expect(parsedLogArray.length).toEqual(0);
  });

  it('should return an empty array a non existent log file', () => {
    const parsedLogArray = parseLogFile();
    expect(Array.isArray(parsedLogArray)).toBe(true);
    expect(parsedLogArray.length).toEqual(0);
  });
});

describe('getUniquePropertyValues', () => {
  it('should return unique values for a given property', () => {
    const parsedLogArray = parseLogFile(mockParsedLog);
    const uniqueIps = getUniquePropertyValues(parsedLogArray, 'ip');
    expect(Array.isArray(uniqueIps)).toBe(true);
    expect(uniqueIps.length).toBeGreaterThan(0);
    expect(uniqueIps).toContain(parsedLogArray[0].ip);
  });

  it('should return an empty array for an empty provided array', () => {
    const uniqueIps = getUniquePropertyValues([], 'ip');
    expect(Array.isArray(uniqueIps)).toBe(true);
    expect(uniqueIps.length).toEqual(0);
  });

  it('should return an empty array for a missing or empty property', () => {
    const uniqueIps = getUniquePropertyValues(mockParsedLogArray, '');
    expect(Array.isArray(uniqueIps)).toBe(true);
    expect(uniqueIps.length).toEqual(0);
  });
});

describe('getTopPropertyValuesByCount', () => {
  it('should return the top 3 ip addresses by count', () => {
    const count = 3;
    const topIps = getTopPropertyValuesByCount(mockParsedLogArray, 'ip', count);
    expect(Array.isArray(topIps)).toBe(true);

    // Since we cater for tied values, the length of the result may be greater than `count`
    if(topIps.length > count) {
      const lastValue = topIps[topIps.length - 1];
      const nonTiedValues = topIps.filter(item => item.value !== lastValue.value);
      expect(topIps.length).toBe(nonTiedValues + 1);
    } else {
      expect(topIps.length).toEqual(3);
    }
    expect(topIps[0]).toBeDefined();
  });

  it('should return an empty array for an empty provided array', () => {
    const topIps = getTopPropertyValuesByCount([], 'ip', 3);
    expect(Array.isArray(topIps)).toBe(true);
    expect(topIps.length).toEqual(0);
  });

  it('should return an empty array for a missing or empty property', () => {
    const topIps = getTopPropertyValuesByCount(mockParsedLogArray, '', 3);
    expect(Array.isArray(topIps)).toBe(true);
    expect(topIps.length).toEqual(0);
  });
});