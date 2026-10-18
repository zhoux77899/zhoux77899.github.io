import { createContext } from 'react';
import type { ExplorerDestination } from '@/lib/explorer';

export interface ExplorerState {
  activeSection: string;
  activeDestination: ExplorerDestination | null;
  selectedProjectId: string;
  selectedCountryId: string;
  heroVisible: boolean;
}

export interface ExplorerContextValue extends ExplorerState {
  selectProject(id: string): void;
  selectCountry(id: string): void;
}

export const ExplorerContext = createContext<ExplorerContextValue | undefined>(undefined);
