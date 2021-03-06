import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Articles } from './articles.entity';
import { Recommendations } from './recommendations.entity';

@InputType('CommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Comments extends CommonEntity {
  @Field(() => String)
  @Column()
  content: string;

  @Field(() => Articles)
  @ManyToOne(() => Articles, (article) => article.comments)
  article: Articles;

  @Field(() => [Recommendations])
  @OneToMany(() => Recommendations, (recommendation) => recommendation.comment)
  recommendations: Recommendations[];

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.comments, { eager: true })
  author: Users;
}
