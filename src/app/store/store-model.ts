// store/store-model.ts
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deepMerge } from './utils/deep-merge.util';

/**
 * The StoreModel class is an abstract class that provides a structure for managing state in a store,
 * allowing for state initialization, updates, and selection of specific state properties.
 * @template T - The type of the state object managed by the store.
 */
export abstract class StoreModel<T extends object> {
  private _state$: BehaviorSubject<T>;
  public readonly state$: Observable<T>;

  /**
   * The above function is a TypeScript constructor that initializes a BehaviorSubject with an initial
   * state and exposes it as an observable.
   * @param {T} initialState - The `initialState` parameter is the initial value that will be used to
   * initialize the state of the object being created. In the provided code snippet, a
   * `BehaviorSubject` is used to manage the state, and the `initialState` is used to set the initial
   * value of this `BehaviorSubject
   */
  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  /**
   * The `state` getter returns the current state of the store as an object of type `T`.
   * @returns The current state of the store, which is of type `T`.
   */
  public get state(): T {
    return this._state$.getValue();
  }

  /**
   * The `setState` method updates the state of the store with a new value.
   * @param {T} nextState - The `nextState` parameter is the new state that you want to set for the
   * store. It should be of type `T`, which is a generic type representing the state of the store.
   */
  public setState(nextState: T): void {
    this._state$.next(nextState);
  }

  /**
   * The `patchState` method updates the state of the store with a partial state object, allowing for
   * either shallow or deep merging of the current state with the provided patch.
   * @param {Partial<T>} patch - The `patch` parameter is a partial object of type `T` that contains
   * the properties to be updated in the current state. It allows you to update only specific
   * properties of the state without replacing the entire state object.
   * @param {boolean} [useDeepMerge=false] - The `useDeepMerge` parameter is a boolean that determines
   * whether to perform a deep merge of the current state with the provided patch. If set to true, it
   * will merge nested objects; if false, it will perform a shallow merge.
   */
  public patchState(patch: Partial<T>, useDeepMerge = false): void {
    const nextState = useDeepMerge
      ? deepMerge(this.state, patch)
      : { ...this.state, ...patch };

    this._state$.next(nextState);
  }

  /**
   * The `select` method allows you to select a specific property from the state and return it as an
   * observable.
   * @param {K} key - The `key` parameter is a generic type that represents the key of the property
   * you want to select from the state. It should be one of the keys of the state object `T`.
   * @returns An observable that emits the value of the selected property from the state.
   */
  public select<K extends keyof T>(key: K): Observable<T[K]> {
    return this.state$.pipe(map((state) => state[key]));
  }
}
