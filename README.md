# HTTP Request Log Parser

A Node.js app to parse a log file containing HTTP requests and to report on its contents.

## Install the NPM packages

```sh
npm install
```

## Run the task
This will output the results to the console.

```sh
npm run task
```

## Run the tests
Runs units tests with Vitest.

```sh
npm run test
```

### Assumptions made during this test.
- We don't want the junk at the end of logs
- We want all request types instead of just successful ones
- We want to include tied values for top 3, eg where we have 3 values tied for second: 4 - 3 - 3 - 3
  - I have added a toggle to switch between an exact number of results or include tied places
- We want to exclude requests to files
- We're happy to include full urls and not just relative urls