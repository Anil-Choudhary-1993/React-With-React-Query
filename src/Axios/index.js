let Data = [
  { id: 1, name: 'Bulbasaur', type: ['Grass', 'Poison'] },
  { id: 2, name: 'Blastoise', type: ['Water'] },
  { id: 4, name: 'Pidgeotto', type: ['Flying'] },
  { id: 5, name: 'Pikachu', type: ['Electric'] },
  { id: 6, name: 'Nidorino', type: ['Poison'] }
];

const Timeout = 3000;

const axios = {
  get: function (request = {}, response) {
    let { id = null } = request;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id) {
          resolve(Data.find(resp => resp.id === id));
        } else {
          resolve(Data);
        }
      }, Timeout)
    })
  },
  post: function (request = {}, response) {
    let { name = null, type = [] } = request;
    return new Promise((resolve, reject) => {
      if (!name) reject('Invalid name');
      if (!type) reject('Invalid type');
      const newEntry = {
        id: Data[Data.length - 1].id + 1,
        name: name,
        type: type
      }
      setTimeout(() => {
        Data.push(newEntry);
        resolve(newEntry);
      }, Timeout)
    })
  },
  put: function (request = {}, response) {
    let { id = null, name = null, type = null } = request;
    return new Promise((resolve, reject) => {
      if (!id) reject('Invalid Id');
      if (!name) reject('Invalid name');
      if (!type) reject('Invalid type');
      setTimeout(() => {
        Data = Data.map(resp => {
          if (resp.id === id) {
            return {
              ...resp,
              name,
              type
            };
          }
          return resp;
        })
        resolve(request);
      }, Timeout)
    })
  },
  delete: function (request = {}, response) {
    let { id = null } = request;
    return new Promise((resolve, reject) => {
      if (!id) reject('Invalid Id');
      setTimeout(() => {
        Data = Data.filter(resp => resp.id !== id);
        resolve(id);
      }, Timeout)
    })
  }
};

export default axios;