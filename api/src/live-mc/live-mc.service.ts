import { CACHE_MANAGER, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import * as msc from 'minecraft-server-util';
import { ArticlesService } from 'src/articles/articles.service';
import { Articles } from 'src/articles/entities/articles.entity';
import { MC_SERVER_DEFAULT_PORT } from 'src/constants';
import { Repository } from 'typeorm';
import { McStatusOutputDto } from './dtos/mc-status-output.dto';
import { PlayerHistories } from './entities/player-histories.entity';
import { MCStatus } from './types/mc-status.type';

@Injectable()
export class LiveMCService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(PlayerHistories)
    private readonly playerHistoriesRepository: Repository<PlayerHistories>,
    @Inject(forwardRef(() => ArticlesService))
    private readonly articlesService: ArticlesService,
  ) {}

  async getMCServerStatus(host: string): Promise<McStatusOutputDto> {
    const [serverIP, serverPort] = host.split(':');
    let value = await this.cacheManager.get<MCStatus>(host);
    if (!value) {
      try {
        const status = await msc.status(serverIP, {
          port: +serverPort || MC_SERVER_DEFAULT_PORT,
        });
        value = Object.assign(new MCStatus(), {
          ...status,
          // Converted Description Object to string
          description: status.description.toString(),
        });
        await this.cacheManager.set<MCStatus>(host, value, {
          ttl: 180 /* 3 minutes */,
        });
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    }
    return {
      ok: true,
      status: value,
    };
  }

  async createPlayerHistory(article: Articles, onlinePlayers: number) {
    const newHistory = this.playerHistoriesRepository.create({
      article,
      onlinePlayers,
    });
    return this.playerHistoriesRepository.save(newHistory);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async checkMCServerStatus() {
    const adArticles = await this.articlesService.allAdArticles();
    adArticles.forEach(async (adArticle) => {
      const { host } = adArticle;
      const {
        ok,
        status: { onlinePlayers },
      } = await this.getMCServerStatus(host);
      if (ok) {
        this.createPlayerHistory(adArticle, onlinePlayers);
      }
    });
  }
}
