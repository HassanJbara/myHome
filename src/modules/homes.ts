import type { Agent } from "@/modules";

export const home_types = ["APPARTMENT", "DUPLEX", "HOUSE", "STUDIO"] as const;
export const property_types = ["RENT", "SALE"] as const;
export const home_features = [
  "pet_friendly",
  "balcony",
  "clubhouse",
  "dishwasher",
  "elevator",
  "spa",
  "fitness_center",
  "pool",
  "modern_kitchen",
] as const;

export type home_type = (typeof home_types)[number];
export type property_type = (typeof property_types)[number];

export interface HomePosition {
  lat: number;
  lng: number;
}

export interface HomeSpecifications {
  rooms: number;
  baths: number;
  space: number;
}

export interface HomeFeatures {
  pet_friendly: boolean;
  balcony: boolean;
  clubhouse: boolean;
  dishwasher: boolean;
  elevator: boolean;
  fitness_center: boolean;
  spa: boolean;
  pool: boolean;
  modern_kitchen: boolean;
}

export interface HomeAddress {
  street: string;
  house_number: number;
  city: string;
  plz: string;
  position: HomePosition;
}

export type AddHomeAddress = Pick<
  HomeAddress,
  "city" | "house_number" | "street" | "plz"
>;

export interface HomeInfo {
  home_name: string;
  home_type: string;
  property_type: string;
  listing_text: string;
  rent: number;
}

export interface Home {
  id: number;
  home_name: string;
  home_type: home_type;
  listing_text: string;
  agent: Agent | undefined;
  rent: number;
  specifications: HomeSpecifications;
  features: HomeFeatures;
  address: HomeAddress;
  property_type: property_type;
  gallery_images: string[];
}

export interface HomesNewProperty {
  info: HomeInfo;
  address: { city: string; street: string; house_number: number; plz: string };
  features: HomeFeatures;
  specifications: HomeSpecifications;
}

export interface HomesSearch {
  city: string | undefined;
  home_type: home_type | undefined;
  property_type: property_type | undefined;
  rooms: number | undefined;
  features: string | undefined;
  rent: number | undefined;
}
