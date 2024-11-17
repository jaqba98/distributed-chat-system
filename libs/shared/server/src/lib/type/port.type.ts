import { PortEnum } from '../enum/port.enum';

export type PortType = (typeof PortEnum)[keyof typeof PortEnum];
