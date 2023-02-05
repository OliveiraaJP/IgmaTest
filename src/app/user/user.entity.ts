import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  cpf: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  birthday: string;

  @CreateDateColumn({ name: 'created_at' })
  createAt: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
