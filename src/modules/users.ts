import type { Home } from "@/modules";

export interface User {
  id: number;
  username: string;
  email: string;
  wishlistedHomes: Home[];
  adsHomes: Home[];
}
