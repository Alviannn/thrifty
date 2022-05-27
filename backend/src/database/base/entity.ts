import { BaseEntity } from 'typeorm';

export abstract class CustomEntity extends BaseEntity {

    abstract toSimple(): Record<string, unknown>

    abstract toJSON(): Record<string, unknown> | CustomEntity;

    hideProperty(property: string) {
        Object.defineProperty(this, property, {
            enumerable: false
        });
    }

    showProperty(property: string) {
        Object.defineProperty(this, property, {
            enumerable: true
        });
    }

}