export declare class Course {
    id: number;
    title: string;
    shortDescription: string;
    instructorId: number;
    instructorName: string;
    price: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
}
