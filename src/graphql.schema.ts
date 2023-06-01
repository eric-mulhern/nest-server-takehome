
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUniversityInput {
    id: number;
    name: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract universities(): Nullable<Nullable<University>[]> | Promise<Nullable<Nullable<University>[]>>;

    abstract university(id: number): Nullable<University> | Promise<Nullable<University>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUniversity(createUniversityInput?: Nullable<CreateUniversityInput>): Nullable<University> | Promise<Nullable<University>>;
}

export class State {
    __typename?: 'State';
    id: number;
    name: string;
}

export class StateInput {
    __typename?: 'StateInput';
    id: number;
    name: string;
}

export class City {
    __typename?: 'City';
    id: number;
    name: string;
    state: State;
}

export class CityInput {
    __typename?: 'CityInput';
    id: number;
    name: string;
    state: State;
}

export class University {
    __typename?: 'University';
    id: number;
    name: string;
    city: City;
}

type Nullable<T> = T | null;
