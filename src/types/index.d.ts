export type HealthCheckEvent = {
    timestamp: string,
    status: string,
    machine_id: string,
    id: string
}

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
    floor: number
};

export type ErrorProps = {
    error: string
}