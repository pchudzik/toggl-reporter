# toggl-reporter

[![Build Status](https://travis-ci.org/pchudzik/toggl-reporter.svg?branch=master)](https://travis-ci.org/pchudzik/toggl-reporter)
[![dependencies Status](https://david-dm.org/pchudzik/toggl-reporter/status.svg)](https://david-dm.org/pchudzik/toggl-reporter)
[![devDependencies Status](https://david-dm.org/pchudzik/toggl-reporter/dev-status.svg)](https://david-dm.org/pchudzik/toggl-reporter?type=dev)

Application allows to generate activity reports from http://toggl.com
It is also poc for bower/gulp less application with npm as dependency manager and build tool.

## how to run
```
npm start
```
To customize port (default is 8080). You can pass it to start command:
```
npm start -- 9090
```

## how to develop
```
npm run-script dev
```

## Tips
Running tests from intellij.
Change refresh property to true in file .IntelliJIdea2016.2/config/plugins/js-karma/js_reporter/karma-intellij/lib/intellijRunner.js
