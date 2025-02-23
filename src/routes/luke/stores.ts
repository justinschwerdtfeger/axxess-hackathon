import { writable } from 'svelte/store';

interface Prescription {
    pills: number;
    perDay: number;
    hoursBetween: number;
}

export const prescriptions = writable<Prescription[]>([]);