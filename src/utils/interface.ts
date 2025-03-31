export interface IMachine {
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

export interface iClients {
    ClientPK: number;
    Name: string;
    Description: string;
    ContactRef: string;
    Direction: string;
    UPDATED: string;
    ACTIVE: number;
}

export interface IMachineGearHistory {

}