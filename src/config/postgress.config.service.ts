import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

// este projeto roda em ESM ("type": "module"), onde __dirname não existe.
// import.meta.dirname (Node >= 20.11) aponta para a pasta do arquivo atual.
const __dirname = import.meta.dirname;

@Injectable()
export class PostgressConfigService implements TypeOrmOptionsFactory {


  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],//busca qualquer arquivo dentro de src que tenha no nome entity.ts ou entity.js - precisa do .js pq dps do build vai compilar em js
      synchronize: true
    }
  }
}