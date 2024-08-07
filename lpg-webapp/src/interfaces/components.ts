interface Component {
    id: number;
    type: string;
    partNumber: string;
    brand: string;
    model: string;
    rank: number;
    benchmark: number;
    samples: number;
    url: string;
}

export interface ComponentList {
    CPU: Component[];
    GPU: Component[];
    SSD: Component[];
    HDD: Component[];
    RAM: Component[];
}