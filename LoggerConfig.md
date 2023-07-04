# Logging service configuration example

The logging service needs a config following this format:

```json
{
  "name": "APP-NAME",
  "logger": {
    "source": true,
    "console": {
      "enable": true,
      "level": "trace"
    },
    "file": {
      "enable": false,
      "level": "info",
      "dir": "./log"
    },
    "server": {
      "enable": false,
      "level": "trace",
      "url": "0.0.0.0",
      "port": "9998",
      "type": "elk"
    },
    "ringBuffer": {
      "enable": false,
      "size": 0
    }
  }
}
```
