import { Entity, OneToMany,  PrimaryGeneratedColumn, Column } from "typeorm";
import { UsersEntity } from "src/users/user.entity";

@Entity({ name: 'UserTypes' })
export class UserTypesEntity {
    @PrimaryGeneratedColumn()
    id: number; 
    
    @Column()
    title: string

    @Column()
    adminPermission: boolean

    @Column()
    teacherPermission: boolean

    @OneToMany(() => UsersEntity, user => user.userType)
    users: UsersEntity[];

}