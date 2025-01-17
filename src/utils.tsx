import { createRenderEffect } from "solid-js";

import type { Ref } from "solid-js";

export function createRefContent<T extends Exclude<unknown, Function>>(
  getRef: () => Ref<T>,
  createRef: () => T
) {
  createRenderEffect(() => {
    const refProp = getRef();
    if (typeof refProp !== "function") {
      throw new Error(
        "Should never happen, as solid always passes refs as functions"
      );
    }
    const refFunc = refProp as (value: T) => void;
    refFunc(createRef());
  });
}
