import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PlayerHistories } from '../../live-mc/entities/player-histories.entity';
import { Categories } from './categories.entity';
import { Tags } from './tags.entity';

export enum ArticleType {
  AD = 'AD',
  FREE = 'FREE',
}
registerEnumType(ArticleType, { name: 'ArticleType' });

@InputType('ArticleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Articles extends CommonEntity {
  @Field(() => String)
  @Column()
  thumbnail: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  explanation: string;

  @Field(() => String)
  @Column()
  discord: string;

  @Field(() => String)
  @Column()
  host: string;

  @Field(() => String)
  @Column()
  homepage: string;

  @Field(() => Categories)
  @ManyToOne(() => Categories, (category) => category.articles)
  category: Categories;

  @Field(() => Number)
  @Column()
  likeCount: number;

  @Field(() => [Tags], { nullable: true })
  @ManyToMany(() => Tags, (tag) => tag.articles, {
    cascade: ['insert'],
  })
  @JoinTable()
  tags?: Promise<Tags[]>;

  @Field(() => [PlayerHistories])
  @OneToMany(() => PlayerHistories, (playerHistory) => playerHistory.article, {
    cascade: ['insert'],
  })
  playerHistories: PlayerHistories[];

  @Field(() => ArticleType)
  @Column({ type: 'enum', enum: ArticleType })
  @IsEnum(ArticleType)
  articleType: ArticleType;
}
