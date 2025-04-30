import { Injectable } from '@nestjs/common';

import axios ,{AxiosInstance} from 'axios';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios.create()

async executeSeed() {
  const {data} = await this.axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');

  data.results.forEach(({name,url}) => {
    const segments = url.split('/');
    const id = segments[segments.length - 2];
    console.log({name,id});
  })

  return data.results;
}

}
