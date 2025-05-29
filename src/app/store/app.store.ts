// store/app.store.ts
import { map, distinctUntilChanged } from 'rxjs/operators';
import { AppState, KeyValuePair } from './app.state';
import { StoreModel } from './store-model';
import { Observable } from 'rxjs';

export class AppStore extends StoreModel<AppState> {
  // Observables to select specific state properties
  sidebarCollapsed$: Observable<boolean> = this.state$.pipe(
    map((state) => state.sidebarCollapsed),
    distinctUntilChanged()
  );

  isDarkMode$: Observable<boolean> = this.state$.pipe(
    map((state) => state.isDarkMode),
    distinctUntilChanged()
  );

  possessorRailRoads$: Observable<KeyValuePair[]> = this.state$.pipe(
    map((state) => state.possessorRailRoads),
    distinctUntilChanged()
  );

  constructor() {
    super(new AppState({}));
  }

  // Methods to update the state
  setSidebarCollapsed(value: boolean) {
    this.patchState({ sidebarCollapsed: value });
  }

  setDarkMode(value: boolean) {
    this.patchState({ isDarkMode: value });
  }

  setPossessorRailRoads(railroads: KeyValuePair[]) {
    this.patchState({ possessorRailRoads: railroads });
  }
}
