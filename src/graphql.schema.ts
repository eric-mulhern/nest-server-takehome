
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class StateInput {
    name: string;
}

export class CityInput {
    name: string;
    state: StateInput;
}

export class CreateUniversityInput {
    name: string;
    city: CityInput;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract universities(): University[] | Promise<University[]>;

    abstract university(id: number): Nullable<University> | Promise<Nullable<University>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUniversity(createUniversityInput?: Nullable<CreateUniversityInput>): University | Promise<University>;
}

export class State {
    __typename?: 'State';
    id: number;
    name: string;
}

export class City {
    __typename?: 'City';
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
