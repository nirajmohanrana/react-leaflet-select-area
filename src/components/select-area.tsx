import { useEffect, useRef } from "react";
import { Rectangle, useMap } from "react-leaflet";
import type {
  ControlPosition,
  LeafletEvent,
  LeafletEventHandlerFn,
  LeafletKeyboardEvent,
  LeafletMouseEvent,
  PathOptions,
} from "leaflet";
import SelectAreaControl from "./select-area-control";
import { useSelectArea } from "../hooks/useSelectArea";
import type {
  SelectAreaBounds,
  SelectAreaController,
} from "../hooks/useSelectArea";

interface SelectAreaProps {
  onBoundsChange?: (bounds: SelectAreaBounds | null) => void;
  options?: PathOptions;
  keepRectangle?: boolean;
  controller?: SelectAreaController;
  showControl?: boolean;
  controlPosition?: ControlPosition;
}

export default function SelectArea({
  onBoundsChange = () => {},
  options,
  keepRectangle = false,
  controller: controllerProp,
  showControl = false,
  controlPosition = "topright",
}: SelectAreaProps) {
  const internalController = useSelectArea();
  const controller = controllerProp ?? internalController;
  const map = useMap();
  const hasMountedRef = useRef(false);
  const {
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
    setShortcutPressed,
  } = controller;

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    onBoundsChange(rectangleBounds);
  }, [rectangleBounds, onBoundsChange]);

  useEffect(() => {
    const setShortcutState = (event: LeafletKeyboardEvent) => {
      const originalEvent = event.originalEvent as KeyboardEvent;
      const shortcutIsActive = originalEvent.ctrlKey;

      setShortcutPressed(shortcutIsActive);

      if (!shortcutIsActive && isDrawing && !isSelectionMode) {
        completeSelection();
      }
    };

    const handlePointerStart = (event: LeafletMouseEvent) => {
      const canStartSelection = isSelectionMode || isShortcutPressed;

      if (!canStartSelection) {
        return;
      }

      beginSelection(
        event.latlng,
        event.containerPoint,
        isSelectionMode ? "explicit" : "shortcut"
      );
    };

    const handlePointerMove = (event: LeafletMouseEvent) => {
      if (!isDrawing) {
        return;
      }

      updateSelection(event.latlng, event.containerPoint);
    };

    const handlePointerEnd = (event: LeafletMouseEvent) => {
      if (!isDrawing) {
        return;
      }

      completeSelection(event.latlng, event.containerPoint);
    };

    const isMapPointerEvent = (
      event: LeafletEvent
    ): event is LeafletMouseEvent => {
      return "latlng" in event && "containerPoint" in event;
    };

    const handleTouchStart: LeafletEventHandlerFn = (event: LeafletEvent) => {
      if (!isMapPointerEvent(event)) {
        return;
      }

      handlePointerStart(event);
    };

    const handleTouchMove: LeafletEventHandlerFn = (event: LeafletEvent) => {
      if (!isMapPointerEvent(event)) {
        return;
      }

      handlePointerMove(event);
    };

    const handleTouchEnd: LeafletEventHandlerFn = (event: LeafletEvent) => {
      if (!isMapPointerEvent(event)) {
        return;
      }

      handlePointerEnd(event);
    };

    map.on("keydown", setShortcutState);
    map.on("keyup", setShortcutState);
    map.on("mousedown", handlePointerStart);
    map.on("touchstart", handleTouchStart);
    map.on("mousemove", handlePointerMove);
    map.on("touchmove", handleTouchMove);
    map.on("mouseup", handlePointerEnd);
    map.on("touchend", handleTouchEnd);

    return () => {
      map.off("keydown", setShortcutState);
      map.off("keyup", setShortcutState);
      map.off("mousedown", handlePointerStart);
      map.off("touchstart", handleTouchStart);
      map.off("mousemove", handlePointerMove);
      map.off("touchmove", handleTouchMove);
      map.off("mouseup", handlePointerEnd);
      map.off("touchend", handleTouchEnd);
    };
  }, [
    beginSelection,
    completeSelection,
    isDrawing,
    isSelectionMode,
    isShortcutPressed,
    map,
    setShortcutPressed,
    updateSelection,
  ]);

  useEffect(() => {
    if (isDrawing || isSelectionMode || isShortcutPressed) {
      map.dragging.disable();
      return;
    }

    map.dragging.enable();
  }, [isDrawing, isSelectionMode, isShortcutPressed, map]);

  return (
    <>
      {showControl && (
        <SelectAreaControl
          position={controlPosition}
          isActive={isSelectionMode}
          onToggle={() => {
            if (isSelectionMode) {
              cancelSelection();
              return;
            }

            controller.enterSelectionMode();
          }}
        />
      )}
      {isDrawing && startPoint && endPoint && (
        <Rectangle
          bounds={[
            [startPoint.lat, startPoint.lng],
            [endPoint.lat, endPoint.lng],
          ]}
          pathOptions={options}
          color={options?.color ?? "red"}
        />
      )}
      {!isDrawing && rectangleBounds && keepRectangle && (
        <Rectangle
          bounds={rectangleBounds}
          pathOptions={options}
          color={options?.color ?? "red"}
        />
      )}
    </>
  );
}
