import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;

  @OneToMany((type) => Task, (tasks) => tasks.user, { eager: true })
  tasks: Task[];
}
