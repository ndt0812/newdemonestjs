import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class EntityHelper<T, V = ""> extends BaseEntity {
  constructor(partial: Partial<T>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "varchar", nullable: true, default: "" })
  CreatedBy: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  CreatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  UpdatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  DeletedAt: Date | null;

  toJSON() {
    return instanceToPlain(this);
  }
}

/// ColumnNumericTransformer
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}