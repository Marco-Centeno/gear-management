export interface IMachine {
    MachinePK: number | null;
    Name: string;
    Constant: number | string;
    UPDATED: string;
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