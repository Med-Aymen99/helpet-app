import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimesstampEntities } from "../../common/entities/generics.entity";
import { UserEntity } from "src/user/entities/user.entity";


@Entity('petinfo')
export class PetEntity extends TimesstampEntities{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    breed: string;

    @Column()
    sex: string;

    @Column()
    age: number;

    @Column()
    imageRef: string;
    
    @ManyToOne(
        type => UserEntity,
        (user) => user.pets,
        {
          cascade: ['insert', 'update'],
          nullable: true,
          eager: true
        }
    )
    user: UserEntity;
}
