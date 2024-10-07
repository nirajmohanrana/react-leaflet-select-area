import { LatLng } from "leaflet";
import { useEffect, useState, useCallback } from "react";
import { useMap } from "react-leaflet";
import { LeafletMouseEvent, LeafletKeyboardEvent } from "leaflet";

interface UseSelectAreaOptions {
  keepRectangle?: boolean;
}

export function useSelectArea({
  keepRectangle = false,
}: UseSelectAreaOptions = {}) {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [rectangleBounds, setRectangleBounds] = useState<
    [[number, number], [number, number]] | null
  >(null);

  const map = useMap();

  // Handle key press events
  const handleKeyDownUp = useCallback(
    (e: LeafletKeyboardEvent) => {
      const originalEvent = e.originalEvent as KeyboardEvent;
      const isCtrlKeyActive = originalEvent.ctrlKey;
      setIsCtrlPressed(isCtrlKeyActive);
      map.dragging[isCtrlKeyActive ? "disable" : "enable"]();
    },
    [map]
  );

  // Handle mouse down event to start drawing
  const handleMouseDown = useCallback(
    (e: LeafletMouseEvent) => {
      if (isCtrlPressed) {
        const initialLatLng = e.latlng;
        setStartPoint(initialLatLng);
        setEndPoint(initialLatLng);
        setIsDrawing(true);
        if (!keepRectangle) {
          setRectangleBounds(null);
        }
      }
    },
    [isCtrlPressed, keepRectangle]
  );

  // Handle mouse move event to update the rectangle as the mouse moves
  const handleMouseMove = useCallback(
    (e: LeafletMouseEvent) => {
      if (isCtrlPressed && isDrawing) {
        setEndPoint(e.latlng);
      }
    },
    [isCtrlPressed, isDrawing]
  );

  // Handle mouse up event to finish drawing
  const handleMouseUp = useCallback(
    (e: LeafletMouseEvent) => {
      if (isDrawing && startPoint) {
        const finalLatLng = e.latlng;
        setEndPoint(finalLatLng);
        setIsDrawing(false);
        const newBounds: [[number, number], [number, number]] = [
          [startPoint.lat, startPoint.lng],
          [finalLatLng.lat, finalLatLng.lng],
        ];
        setRectangleBounds(newBounds);
      }
    },
    [isDrawing, startPoint]
  );

  // Function to clear the selection
  const clearSelection = useCallback(() => {
    setStartPoint(null);
    setEndPoint(null);
    setRectangleBounds(null);
    setIsDrawing(false);
  }, []);

  useEffect(() => {
    if (!map) return;

    map.on("keydown", handleKeyDownUp);
    map.on("keyup", handleKeyDownUp);
    map.on("mousedown", handleMouseDown);
    map.on("mousemove", handleMouseMove);
    map.on("mouseup", handleMouseUp);

    return () => {
      map.off("keydown", handleKeyDownUp);
      map.off("keyup", handleKeyDownUp);
      map.off("mousedown", handleMouseDown);
      map.off("mousemove", handleMouseMove);
      map.off("mouseup", handleMouseUp);
    };
  }, [map, handleKeyDownUp, handleMouseDown, handleMouseMove, handleMouseUp]);

  // Include the clearSelection function in the return statement
  return {
    startPoint,
    endPoint,
    rectangleBounds,
    isDrawing,
    setStartPoint,
    setEndPoint,
    setRectangleBounds,
    clearSelection, // Added clearSelection
  };
}
