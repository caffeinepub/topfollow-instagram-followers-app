import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Review {
    username: string;
    reviewText: string;
    timestamp: bigint;
    rating: bigint;
}
export interface backendInterface {
    getAllReviews(): Promise<Array<Review>>;
    getAverageRating(): Promise<number | null>;
    incrementDownloadCount(): Promise<bigint>;
    isRegistered(): Promise<boolean>;
    register(username: string, email: string | null): Promise<string>;
    submitReview(rating: bigint, reviewText: string): Promise<void>;
}
