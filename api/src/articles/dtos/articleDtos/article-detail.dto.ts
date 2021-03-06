import { Field, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from '../../../common/dtos/output.dto';
import { MCStatus } from '../../../live-mc/types/mc-status.type';
import { Articles } from '../../entities/articles.entity';

@ObjectType()
export class ArticleDetailOutputDto extends CommonOutput {
  @Field(() => Articles, { nullable: true })
  article?: Articles;
}

@ObjectType()
export class ServerArticleDetailOutputDto extends CommonOutput {
  @Field(() => Articles, { nullable: true })
  article?: Articles;

  @Field(() => MCStatus, { nullable: true })
  status?: MCStatus;
}
