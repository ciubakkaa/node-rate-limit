const clients = {
  'client-1': {
    id: 'client-1',
    tokenBucket: {
      capacity: 5,
      refillRate: 1,
    },
    fixedWindow: {
      limit: 10,
      windowSize: 60,
    },
  },
  'client-2': {
    id: 'client-2',
    tokenBucket: {
      capacity: 10,
      refillRate: 2,
    },
    fixedWindow: {
      limit: 20,
      windowSize: 60,
    },
  },
};

module.exports = clients;
