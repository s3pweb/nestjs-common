export const contextMock: any = {
  getHandler: () => {
    return 'handler';
  },
  getClass: () => {
    return 'class';
  },
  switchToHttp: () => {
    return {
      getRequest: () => {
        return {
          headers: {
            'x-forwarded-for': '0.0.0.0',
          },
        };
      },
    };
  },
};
