// src/utils/registerThunks.ts
import type { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';

export type ThunkHandler<State, Payload = any> = {
  thunk: any; // ideally AsyncThunk<any, any, any>
  handlers: {
    pending?: (state: Draft<State>) => void;
    fulfilled: (state: Draft<State>, action: { payload: Payload }) => void;
    rejected?: (state: Draft<State>, action: any) => void;
  };
};

export function registerThunks<State>(
  builder: ActionReducerMapBuilder<State>,
  handlers: ThunkHandler<State>[]
) {
  handlers.forEach(({ thunk, handlers }) => {
    builder
      .addCase(thunk.pending, (state) => {
        handlers.pending?.(state);
      })
      .addCase(thunk.fulfilled, (state, action) => {
        handlers.fulfilled(state, action);
      })
      .addCase(thunk.rejected, (state, action) => {
        handlers.rejected?.(state, action);
      });
  });
}
