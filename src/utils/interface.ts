import { Today } from "./Extention";
export interface IMachine {
    MachinePK: number;
    Name: string;
    Constant: number | string;
    UPDATED: () => ({ Today });
    ACTIVE: number;
}

export interface IUniverse {
    GearTooth: string;
    MachineFK: number;
    UPDATED: string;
    ACTIVE: number;
}

export interface IMachineGearHistory {

}