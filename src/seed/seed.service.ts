import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PoketResponse } from './interfaces/poke-response.interfaces';
import { AxiosAdapter } from 'src/common/httpadapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,

  ) {}



async executeSeed() {
  await this.pokemonModel.deleteMany({});
  const data = await this.http.get<PoketResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

  const pokemonToInsert:{name: string, no: string}[] = [];


  data.results.forEach(async({name,url}) => {
    const segments = url.split('/');
    const no = segments[segments.length - 2];



  pokemonToInsert.push({name,no });
  });

  // const insertPromisesArray = [];
  // data.results.forEach(async({name,url}) => {
  //   const segments = url.split('/');
  //   const no = segments[segments.length - 2];
  //   // const pokemon = await this.pokemonModel.create( {name,no} );
  //   insertPromisesArray.push(this.pokemonModel.create({name,no}));
  // });
  
  // await Promise.all( insertPromisesArray );
  await this.pokemonModel.insertMany(pokemonToInsert);

  return 'seed executed';
}



}
