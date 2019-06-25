import Hrequest from '../helpers/request';

const url = 'https://todowebservice.herokuapp.com/api/todos';

const Service = {
  async getList() {
    const response = await Hrequest(url, 'GET', 'Algo deu errado 😭');
    return response;
  },

  async addItem(param) {
    const response = await Hrequest(
      url,
      'POST',
      'Algo deu errado 😭',
      param,
    );
    return response;
  },

  async editItem(param, id) {
    const response = await Hrequest(
      `${url}/${id}`,
      'PUT',
      'Algo deu errado 😭',
      param,
    );
    if (response.message) {
      throw response.message;
    }
    return response;
  },

  async removeItem(id) {
    const response = await Hrequest(
      `${url}/${id}`,
      'DELETE',
      'Algo deu errado 😭',
    );
    if (response.message) {
      throw response.message;
    }
    return response;
  },
};

export default Service;
