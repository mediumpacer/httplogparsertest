import { describe, expect, it } from 'vitest'
import { getRequestedLogValues } from './task.js';

const taskValues = getRequestedLogValues("./logs/programming-task-example-data.log", false);
const taskValuesWithTies = getRequestedLogValues("./logs/programming-task-example-data.log", true);

describe('Log file parser test', () => {
  describe('getRequestedLogValues', () => {
    it('should return the number of unique IP addresses', () => {
      const uniqueIpAddresses = taskValues.uniqueIpAddresses;
      expect(typeof uniqueIpAddresses === 'number').toBe(true);
      expect(uniqueIpAddresses).toEqual(9);
    });

    it('should return the top 3 ip addresses', () => {
      const topIpAddresses = taskValues.topIpAddresses;
      expect(Array.isArray(topIpAddresses)).toBe(true);
      expect(topIpAddresses.length).toEqual(3);
      expect(topIpAddresses).toEqual([
        [ '168.41.191.40', 4 ],
        [ '177.71.128.21', 3 ],
        [ '72.44.32.10', 3 ]
      ]);
    });

    it('should return the top 3 urls', () => {
      const topUrls = taskValues.topUrls;
      expect(Array.isArray(topUrls)).toBe(true);
      expect(topUrls.length).toEqual(3);
      expect(topUrls).toEqual([
        [ '/docs/manage-websites/', 2 ],
        [ '/intranet-analytics/', 1 ],
        [ 'http://example.net/faq/', 1 ]
      ]);
    });
  });

  describe('getRequestedLogValuesWithTies', () => {
    it('should return the top 3 ip addresses including ties', () => {
      const topIpAddresses = taskValuesWithTies.topIpAddresses;
      expect(Array.isArray(topIpAddresses)).toBe(true);
      expect(topIpAddresses.length).toEqual(3);
      expect(topIpAddresses).toEqual([
        [ '168.41.191.40', 4 ],
        [ '177.71.128.21', 3 ],
        [ '72.44.32.10', 3 ]
      ]);
    });

    it('should return the top 3 urls including ties', () => {
      const topUrls = taskValuesWithTies.topUrls;
      expect(Array.isArray(topUrls)).toBe(true);
      expect(topUrls.length).toEqual(17);
      expect(topUrls).toEqual([
        [ '/docs/manage-websites/', 2 ],
        [ '/intranet-analytics/', 1 ],
        [ 'http://example.net/faq/', 1 ],
        [ '/this/page/does/not/exist/', 1 ],
        [ 'http://example.net/blog/category/meta/', 1 ],
        [ '/blog/2018/08/survey-your-opinion-matters/', 1 ],
        [ '/docs/manage-users/', 1 ],
        [ '/blog/category/community/', 1 ],
        [ '/faq/', 1 ],
        [ '/faq/how-to-install/', 1 ],
        [ '/', 1 ],
        [ '/docs/', 1 ],
        [ '/faq/how-to/', 1 ],
        [ '/translations/', 1 ],
        [ '/newsletter/', 1 ],
        [ '/hosting/', 1 ],
        [ '/download/counter/', 1 ]
      ]);
    });
  });
});

