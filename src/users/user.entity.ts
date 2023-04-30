import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'Users' })
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number; 
    
    @Column()
    email: string

    @Column()
    password: string

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: false})
    isAdmin: boolean;

}