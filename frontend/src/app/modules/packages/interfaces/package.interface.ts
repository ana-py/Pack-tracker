
export interface Package {
    _id:           string;
    description:   string;
    size:          string;
    status:        string[];
    sender:        string;
    receiver_info: ReceiverInfo[];
    shipment_date:     string;
    received_date: string;
    route_list:    RouteList[];
    deliveryman:   Deliveryman | null;
}

export interface ReceiverInfo {
    package_id: string;
    name:       string;
    address:    string;
    email:      string;
}

export interface RouteList {
    id:         string;
    package_id: string;
    location:   string;
    date:       string;
}

export interface Deliveryman {
    user_id :   string;
    name:       string;
}
