export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Player {
    position: Position;
    rotation: Position;
    isHoldingPart: Pick<Part, 'id'>;
}

enum MachinePartPlace {
    frontTop = 'frontTop',
    frontButton = 'frontButton',
    leftSide = 'leftSide',
    rightSide = 'rightSide',
    back = 'back',
}

export interface Part {
    id: string;
    position: Position;
    // Part is broken, should be removed from machine
    isBroken: boolean;
    // todo: find better naming ?
    // The place to put on machine
    machineDesiredPlace: MachinePartPlace | null;
    currentMachinePlace: MachinePartPlace | null;
    // means part has been inserted to valid position
    // machineDesiredPlace === currentMachinePlace
    isValid: boolean;
}

export interface Machine {

}