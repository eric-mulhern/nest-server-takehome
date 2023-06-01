
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUniversityInput {
    id: number;
    name: string;
}

export interface IQuery {
    universities(): Nullable<Nullable<University>[]> | Promise<Nullable<Nullable<University>[]>>;
    university(id: number): Nullable<University> | Promise<Nullable<University>>;
}

export interface IMutation {
    createUniversity(createUniversityInput?: Nullable<CreateUniversityInput>): Nullable<University> | Promise<Nullable<University>>;
}

export interface State {
    id: number;
    name: string;
}

export interface StateInput {
    id: number;
    name: string;
}

export interface City {
    id: number;
    name: string;
    state: State;
}

export interface CityInput {
    id: number;
    name: string;
    state: State;
}

export interface University {
    id: number;
    name: string;
    city: City;
}

type Nullable<T> = T | null;
