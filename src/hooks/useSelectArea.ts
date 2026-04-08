import { useCallback, useState } from "react";
import type { LatLng, Point } from "leaflet";

export type SelectAreaBounds = [[number, number], [number, number]];
export type SelectAreaTrigger = "shortcut" | "explicit";

export interface SelectAreaController {
  startPoint: LatLng | null;
  endPoint: LatLng | null;
  rectangleBounds: SelectAreaBounds | null;
  isDrawing: boolean;
  isSelectionMode: boolean;
  isShortcutPressed: boolean;
  beginSelection: (
    point: LatLng,
    containerPoint: Point,
    trigger: SelectAreaTrigger
  ) => void;
  updateSelection: (point: LatLng, containerPoint: Point) => void;
  completeSelection: (
    point?: LatLng | null,
    containerPoint?: Point | null
  ) => SelectAreaBounds | null;
  cancelSelection: () => void;
  clearSelection: () => void;
  enterSelectionMode: () => void;
  exitSelectionMode: () => void;
  toggleSelectionMode: () => void;
  setShortcutPressed: (pressed: boolean) => void;
}

const MIN_DRAG_DISTANCE_PX = 5;

export function useSelectArea(): SelectAreaController {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isShortcutPressed, setIsShortcutPressed] = useState(false);
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [rectangleBounds, setRectangleBounds] =
    useState<SelectAreaBounds | null>(null);
  const [startContainerPoint, setStartContainerPoint] = useState<Point | null>(
    null
  );
  const [endContainerPoint, setEndContainerPoint] = useState<Point | null>(null);
  const [selectionTrigger, setSelectionTrigger] =
    useState<SelectAreaTrigger | null>(null);

  const resetDrawingState = useCallback(() => {
    setIsDrawing(false);
    setStartPoint(null);
    setEndPoint(null);
    setStartContainerPoint(null);
    setEndContainerPoint(null);
    setSelectionTrigger(null);
  }, []);

  const beginSelection = useCallback(
    (point: LatLng, containerPoint: Point, trigger: SelectAreaTrigger) => {
      setStartPoint(point);
      setEndPoint(point);
      setStartContainerPoint(containerPoint);
      setEndContainerPoint(containerPoint);
      setSelectionTrigger(trigger);
      setIsDrawing(true);
    },
    []
  );

  const updateSelection = useCallback((point: LatLng, containerPoint: Point) => {
    setEndPoint(point);
    setEndContainerPoint(containerPoint);
  }, []);

  const completeSelection = useCallback(
    (point?: LatLng | null, containerPoint?: Point | null) => {
      if (!startPoint || !startContainerPoint) {
        return null;
      }

      const finalPoint = point ?? endPoint ?? startPoint;
      const finalContainerPoint =
        containerPoint ?? endContainerPoint ?? startContainerPoint;
      const hasDraggedEnough =
        startContainerPoint.distanceTo(finalContainerPoint) >=
        MIN_DRAG_DISTANCE_PX;
      const wasExplicitSelection = selectionTrigger === "explicit";

      if (wasExplicitSelection) {
        setIsSelectionMode(false);
      }

      if (!hasDraggedEnough) {
        resetDrawingState();
        return null;
      }

      const newBounds: SelectAreaBounds = [
        [startPoint.lat, startPoint.lng],
        [finalPoint.lat, finalPoint.lng],
      ];

      setRectangleBounds(newBounds);
      resetDrawingState();
      return newBounds;
    },
    [
      endContainerPoint,
      endPoint,
      resetDrawingState,
      selectionTrigger,
      startContainerPoint,
      startPoint,
    ]
  );

  const cancelSelection = useCallback(() => {
    setIsSelectionMode(false);
    resetDrawingState();
  }, [resetDrawingState]);

  const clearSelection = useCallback(() => {
    setRectangleBounds(null);
    setIsSelectionMode(false);
    resetDrawingState();
  }, [resetDrawingState]);

  const enterSelectionMode = useCallback(() => {
    setIsSelectionMode(true);
  }, []);

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    resetDrawingState();
  }, [resetDrawingState]);

  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode((previousValue) => {
      const nextValue = !previousValue;

      if (!nextValue) {
        resetDrawingState();
      }

      return nextValue;
    });
  }, [resetDrawingState]);

  return {
    startPoint,
    endPoint,
    rectangleBounds,
    isDrawing,
    isSelectionMode,
    isShortcutPressed,
    beginSelection,
    updateSelection,
    completeSelection,
    cancelSelection,
    clearSelection,
    enterSelectionMode,
    exitSelectionMode,
    toggleSelectionMode,
    setShortcutPressed: setIsShortcutPressed,
  };
}
