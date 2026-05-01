import { useEffect, useRef } from "react";
import { Rectangle, useMap } from "react-leaflet";
import type {
  ControlPosition,
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
  const isTouchDrawingRef = useRef(false);
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
  const shouldLockMapGestures =
    isDrawing || isSelectionMode || isShortcutPressed;

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

    map.on("keydown", setShortcutState);
    map.on("keyup", setShortcutState);
    map.on("mousedown", handlePointerStart);
    map.on("mousemove", handlePointerMove);
    map.on("mouseup", handlePointerEnd);

    return () => {
      map.off("keydown", setShortcutState);
      map.off("keyup", setShortcutState);
      map.off("mousedown", handlePointerStart);
      map.off("mousemove", handlePointerMove);
      map.off("mouseup", handlePointerEnd);
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
    if (shouldLockMapGestures) {
      map.dragging.disable();
      return;
    }

    map.dragging.enable();
  }, [map, shouldLockMapGestures]);

  useEffect(() => {
    if (!shouldLockMapGestures) {
      return;
    }

    const container = map.getContainer();
    const previousTouchAction = container.style.touchAction;
    const previousOverscrollBehavior = container.style.overscrollBehavior;

    const preventScroll = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }
    };

    const getTouchPoint = (touch: Touch) => {
      const pointerEvent = touch as unknown as MouseEvent;

      return {
        latlng: map.mouseEventToLatLng(pointerEvent),
        containerPoint: map.mouseEventToContainerPoint(pointerEvent),
      };
    };

    const handleTouchStart = (event: TouchEvent) => {
      const canStartSelection = isSelectionMode || isShortcutPressed;

      if (!canStartSelection) {
        return;
      }

      if (event.touches.length > 1) {
        cancelSelection();
        isTouchDrawingRef.current = false;
        return;
      }

      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      preventScroll(event);
      const { latlng, containerPoint } = getTouchPoint(touch);
      isTouchDrawingRef.current = true;
      beginSelection(
        latlng,
        containerPoint,
        isSelectionMode ? "explicit" : "shortcut"
      );
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isTouchDrawingRef.current) {
        return;
      }

      if (event.touches.length !== 1) {
        cancelSelection();
        isTouchDrawingRef.current = false;
        return;
      }

      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      preventScroll(event);
      const { latlng, containerPoint } = getTouchPoint(touch);
      updateSelection(latlng, containerPoint);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!isTouchDrawingRef.current) {
        return;
      }

      const touch = event.changedTouches[0];

      if (!touch) {
        isTouchDrawingRef.current = false;
        completeSelection();
        return;
      }

      preventScroll(event);
      const { latlng, containerPoint } = getTouchPoint(touch);
      isTouchDrawingRef.current = false;
      completeSelection(latlng, containerPoint);
    };

    const handleTouchCancel = () => {
      isTouchDrawingRef.current = false;
      cancelSelection();
    };

    container.style.touchAction = "none";
    container.style.overscrollBehavior = "contain";
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });
    container.addEventListener("touchcancel", handleTouchCancel);

    return () => {
      container.style.touchAction = previousTouchAction;
      container.style.overscrollBehavior = previousOverscrollBehavior;
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [
    beginSelection,
    cancelSelection,
    completeSelection,
    isSelectionMode,
    isShortcutPressed,
    map,
    shouldLockMapGestures,
    updateSelection,
  ]);

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
