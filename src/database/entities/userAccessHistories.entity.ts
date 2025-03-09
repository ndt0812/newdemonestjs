import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityHelper } from "src/utils/entity-helper";
import { AccessTypeEnums, ApplicationTypeEnums } from "src/utils/enums.utils";
import { Exclude } from "class-transformer";
import { Users } from "./users.entity";

@Entity("UserAccessHistories",)
export class UserAccessHistories extends EntityHelper<UserAccessHistories> {
  @PrimaryGeneratedColumn('increment', { primaryKeyConstraintName: "PK_UserAccessHistories" })
  Id: number;

  @Column("integer", { nullable: true })
  UserId: number | null;

  @ManyToOne(_ => Users, { nullable: true })
  @JoinColumn({ name: "UserId", foreignKeyConstraintName: "PK_UserAccessHistories_User" })
  User: Partial<Users>;

  @Column("varchar", { nullable: true, default: "LogIn" })
  AccessType: AccessTypeEnums;

}
