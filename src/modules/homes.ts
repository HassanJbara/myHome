import type { Agent } from "@/modules";

export const home_types = ["APPARTMENT", "DUPLEX", "HOUSE", "STUDIO"] as const;
export const property_types = ["RENT", "SALE"] as const;

export type home_type = typeof home_types[number];
export type property_type = typeof property_types[number];

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
  info: {
    home_name: string;
    home_type: string;
    property_type: string;
    listing_text: string;
    rent: number;
  };
  address: { city: string; street: string; house_number: number; plz: string };
  features: {
    pet_friendly: boolean;
    balcony: boolean;
    clubhouse: boolean;
    dishwasher: boolean;
    elevator: boolean;
    spa: boolean;
    fitness_center: boolean;
    pool: boolean;
    modern_kitchen: boolean;
  };
  specifications: { rooms: number; baths: number; space: number };
}

export interface HomesSearch {
  city: string | null;
  home_type: string | null;
  property_type: string | null;
  rooms: number | null;
  features: string | undefined;
  rent: number | null;
}
