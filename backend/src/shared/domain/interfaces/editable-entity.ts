import { IAuditableEntity } from './auditable-entity';

export interface IEditableEntity extends IAuditableEntity {
    updatedAt: Date;

    version: number;
}