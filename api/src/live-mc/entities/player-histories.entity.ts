import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Articles } from '../../articles/entities/articles.entity';

@InputType('PlayerHistoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PlayerHistories extends CommonEntity {
  @Field(() => Number)
  @Column()
  onlinePlayers: number;

  @Field(() => Articles)
  @ManyToOne(() => Articles, (article) => article.playerHistories)
  article: Articles;
}
