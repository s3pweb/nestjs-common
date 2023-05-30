export function configMock() {
  return {
    logger: {
      name: 'TESTS',
      logger: {
        source: false,
        console: {
          enable: false,
          level: 'warn',
        },
        file: {
          enable: false,
          level: 'info',
          dir: './log',
        },
        server: {
          enable: false,
          level: 'trace',
          url: '0.0.0.0',
          port: '9998',
          type: 'elk',
        },
        ringBuffer: {
          enable: false,
          size: 1,
        },
      },
    },
  };
}
