export default {
  findUser: async (): Promise<any> => {
    return new Promise((resolve) => {
      resolve({
        user: 'arifintahu'
      });
    });
  }
};
