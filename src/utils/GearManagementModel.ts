import { Today } from "./Extention";
import { IMachine } from "./interface";

export class Machine implements IMachine {
    MachinePK: number;
    Name: string;
    Constant: string | number;
    UPDATED: string;
    ACTIVE: number;

    constructor(machinePk: number, name: string, constant: string | number){
        this.MachinePK = machinePk;
        this.Name = name;
        this.Constant = constant;
        this.UPDATED = Today;
        this.ACTIVE = 1;
    }

    public setACTIVE(active: number){
        this.ACTIVE = (active == 1 ? 1 : 0);
    }
}