"use client";

import type { ComponentType } from "react";
import { actionsDemoMap } from "./demos/actions-demos";
import { inputsDemoMap } from "./demos/inputs-demos";
import { feedbackDemoMap } from "./demos/feedback-demos";
import { navigationDemoMap } from "./demos/navigation-demos";
import { containmentDemoMap } from "./demos/containment-demos";

/** Live demo lookup: meta id → interactive demo component */
export const demoRegistry: Record<string, ComponentType> = {
  ...actionsDemoMap,
  ...inputsDemoMap,
  ...feedbackDemoMap,
  ...navigationDemoMap,
  ...containmentDemoMap,
};
