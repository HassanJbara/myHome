import type { Agent } from "@/modules/agents";

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
  longitude: number;
  latitude: number;
}

export interface Home {
  id: number;
  home_name: string;
  home_img_main: string | undefined;
  home_type: string;
  listing_text: string;
  agent: Agent | undefined;
  total_rent: number;
  cold_rent: number;
  warm_rent: number;
  specifications: HomeSpecifications;
  features: HomeFeatures;
  address: HomeAddress;
  property_type: "RENT" | "SALE";
  gallery_images: string[];
}

export interface HomesNewProperty {
  info: {
    home_name: string;
    home_type: string;
    property_type: string;
    listing_text: string;
    cold_rent: number;
    warm_rent: number;
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
