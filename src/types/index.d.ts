export type MachineProps = {
    id: string
}

export interface OverviewItem {
    status: string,
    machine_type: string,
    longitude: number,
    latitude: number,
    last_maintenance: string,
    install_date: string,
    id: string,
    floor: number,
    new?: boolean
};

export type ErrorProps = {
    error: string
}