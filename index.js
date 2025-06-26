import { getRequestedLogValues } from './scripts/task.js';


/**
 * Initializes the log parser and logs the requested values to the console
 */
const init = () => {
  // change second parameter to true to include ties in the top values
  const taskValues = getRequestedLogValues("./logs/programming-task-example-data.log", true);

  console.log('-------------------------------------');
  console.log('Number of unique IP addresses:', taskValues.uniqueIpAddresses);

  console.log('-------------------------------------');
  console.log('Top 3 most visited URLs:');
  if (!taskValues.topUrls || taskValues.topUrls.length === 0) {
    console.log('No URLs found in the log file.');
  } else {
    taskValues.topUrls.forEach((item) => {
      console.log(`"${item[0]}":  (Count: ${item[1]})`);
    });
  }

  console.log('-------------------------------------');
  console.log('Top 3 most active IP addresses:');
  if (!taskValues.topIpAddresses || taskValues.topIpAddresses.length === 0) {
    console.log('No URLs found in the log file.');
  } else {
    taskValues.topIpAddresses.forEach((item) => {
      console.log(`"${item[0]}":  (Count: ${item[1]})`);
    });
  }
}

init();
