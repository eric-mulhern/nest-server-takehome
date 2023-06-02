
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface StateInput {
    name: string;
}

export interface CityInput {
    name: string;
    state: StateInput;
}

export interface CreateUniversityInput {
    name: string;
    city: CityInput;
}

export interface IQuery {
    universities(): University[] | Promise<University[]>;
    university(id: number): Nullable<University> | Promise<Nullable<University>>;
}

export interface IMutation {
    createUniversity(createUniversityInput?: Nullable<CreateUniversityInput>): University | Promise<University>;
}

export interface State {
    id: number;
    name: string;
}

export interface City {
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
