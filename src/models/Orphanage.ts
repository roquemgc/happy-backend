import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Unique } from "typeorm"
import Image from './Image'

@Entity('orphanages')
@Unique(['name'])
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean; 

    @OneToMany(()=> Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name:'orphanage_id' })
    images: Image[]

    @Column({default: true})
    pending: boolean;
}