import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Articles } from './articles.entity';

@ObjectType()
@Entity()
export class Tags extends CommonEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Articles])
  @ManyToMany(() => Articles, (article) => article.tags)
  articles: Promise<Articles[]>;
}
