import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/core.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity()
@ObjectType()
@InputType('CommentInputType', { isAbstract: true })
export class CommentEntity extends CommonEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  @Field(_type => UserEntity)
  author: UserEntity;

  @Column()
  @Field(_type => String)
  @IsString()
  body: string;

  @ManyToOne(type => ArticleEntity, post => post.comments)
  @Field(_type => ArticleEntity)
  article: ArticleEntity;
}