export interface KeyValuePair {
  key: string;
  value: string;
}

// This class represents the application state, including user preferences and UI settings.
export class AppState {
  sidebarCollapsed = false;
  isDarkMode = false;
  possessorRailRoads: KeyValuePair[] = [];

  constructor(args: Partial<AppState>) {
    Object.assign(this, args);
  }
}
