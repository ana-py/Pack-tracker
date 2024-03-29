// Generated by https://quicktype.io

export interface Package {
    _id?:          string;
    description:   string;
    size:          string;
    sender:        string;
    receiver_info: ReceiverInfo;
    status_list:   StatusList[];
    shipment_date: string;
    route_list:    RouteList[];
    deliveryman:   Deliveryman;
    received_date?: string;
}

export interface Deliveryman {
    user_id: string;
    name:    string;
}

export interface ReceiverInfo {
    name:    string;
    address: string;
    email:   string;
}

export interface RouteList {
    location: string;
    date:     string;
}

export interface StatusList {
    status: string;
    date:   string;
}
