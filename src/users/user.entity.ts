import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserTypesEntity } from "src/auth/userType.entity";

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
    

    @ManyToOne(() => UserTypesEntity, userType => userType.users)
    userType: UserTypesEntity;

}