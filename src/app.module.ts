import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgressConfigService } from './config/postgress.config.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv, Keyv } from '@keyv/redis';
import { KeyvCacheableMemory } from 'cacheable';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgressConfigService,
      inject: [PostgressConfigService]
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {

        const redisStore = createKeyv('redis://localhost:6379');
        redisStore.on('error', (err) => console.error('Redis error:', err));

        return {
          stores: [
            new Keyv({
              //ttl é o tempo que os dados do cache vai ser valido 
              store: new KeyvCacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            redisStore,
          ],
        };
      }
    })
  ],


})
export class AppModule { }
