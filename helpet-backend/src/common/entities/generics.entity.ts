/* eslint-disable prettier/prettier */


import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimesstampEntities {
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn(
        {
            update: false
        }
    )
    createdAt: Date;
}