import { UserRoleEnum } from "src/enums/user-role.enum";
import { PetEntity } from "src/pets/entities/pet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimesstampEntities } from "../../common/entities/generics.entity";


@Entity('user')
export class UserEntity extends TimesstampEntities{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({length:30, unique:true})
  username: string;
  
  @Column()
  email: string;
  
  @Column({unique: true})
  password: string;
  
  @Column()
  salt: string;

  
  @Column({ 
    type: 'enum',
    enum: UserRoleEnum ,
    default: UserRoleEnum.USER 
  })
  role: string;

  @OneToMany(
    type => PetEntity,
    (pet) => pet.user,
    {
      nullable: true,
      cascade: true
    }
  )
  pets: PetEntity[];

}
