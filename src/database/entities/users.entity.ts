import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationTypeEnums } from "src/utils/enums.utils";
import { Exclude } from "class-transformer";
import { EntityHelper } from "src/utils/entity-helper";

@Entity("Users",)
export class Users extends EntityHelper<Users> {
  @PrimaryGeneratedColumn('increment', { primaryKeyConstraintName: "PK_Users" })
  Id: number;

  @Column("varchar", { nullable: true, length: 255 })
  UserName: string | null;

  @Exclude({ toPlainOnly: true })
  @Column("varchar", { nullable: true, length: 255 })
  Password: string | null;

  @Column("varchar", { nullable: true })
  DisplayName: string | null;

  @Exclude({ toPlainOnly: true })
  @Column("varchar", { nullable: true, default: "User" })
  ApplicationType: ApplicationTypeEnums;

  @Column("boolean", { default: false })
  IsAdmin: boolean;
}
