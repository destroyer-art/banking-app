import { IBaseEntity } from './base-entity';

export interface IAuditableEntity extends IBaseEntity {
    createdAt: Date;
}