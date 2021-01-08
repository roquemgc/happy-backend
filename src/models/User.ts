import { Entity, Unique, Column, PrimaryGeneratedColumn } from "typeorm"
import * as bcrypt from "bcrypt";

@Entity('users')
@Unique(['email'])
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}