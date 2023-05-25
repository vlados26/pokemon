import axios from 'axios';

export class Axios {
  serverUrl = ` https://pokeapi.co/api/v2`;

  wrapRequest = <P>(request: Promise<any>): Promise<P> =>
    request
      .then(res => {
        if (![200, 201].includes(res.status)) {
          throw new Error(res.errorDescription);
        }

        return res.data;
      })
      .catch(err => {
        throw new Error(err);
      });

  get = <P>(url: string) => this.wrapRequest<P>(axios.get(`${this.serverUrl}/${url}`));

  post = (url: string, body: any) => this.wrapRequest(axios.post(`${this.serverUrl}/${url}`, body));

  put = (url: string, body: any) => this.wrapRequest(axios.put(`${this.serverUrl}/${url}`, body));

  patch = (url: string, body: any) =>
    this.wrapRequest(axios.patch(`${this.serverUrl}/${url}`, body));

  delete = (url: string) => this.wrapRequest(axios.delete(`${this.serverUrl}/${url}`));
}
