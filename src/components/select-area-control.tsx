import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import {
  Control,
  DomEvent,
  DomUtil,
  Map as LeafletMap,
} from "leaflet";
import type { ControlPosition } from "leaflet";
import { useMap } from "react-leaflet";

interface SelectAreaControlProps {
  position: ControlPosition;
  isActive: boolean;
  onToggle: () => void;
}

function createControl(map: LeafletMap, position: ControlPosition) {
  const SelectControl = Control.extend({
    options: {
      position,
    },
    onAdd() {
      const container = DomUtil.create("div", "leaflet-bar leaflet-control");
      DomEvent.disableClickPropagation(container);
      DomEvent.disableScrollPropagation(container);
      return container;
    },
  });

  return new SelectControl().addTo(map);
}

export default function SelectAreaControl({
  position,
  isActive,
  onToggle,
}: SelectAreaControlProps) {
  const map = useMap();
  const controlRef = useRef<Control | null>(null);
  const rootRef = useRef<Root | null>(null);

  useEffect(() => {
    const control = createControl(map, position);
    const container = control.getContainer();

    if (!container) {
      control.remove();
      return;
    }

    controlRef.current = control;
    rootRef.current = createRoot(container);

    return () => {
      rootRef.current?.unmount();
      control.remove();
      controlRef.current = null;
      rootRef.current = null;
    };
  }, [map, position]);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    rootRef.current.render(
      <button
        type="button"
        aria-label={isActive ? "Cancel area selection" : "Select area"}
        aria-pressed={isActive}
        title={isActive ? "Cancel area selection" : "Select area"}
        onClick={onToggle}
        style={{
          alignItems: "center",
          backgroundColor: isActive ? "#f4f4f5" : "#ffffff",
          border: "none",
          color: "#1f2937",
          cursor: "pointer",
          display: "flex",
          height: "30px",
          justifyContent: "center",
          padding: 0,
          width: "30px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
          <path d="M5 3a2 2 0 0 0-2 2" />
          <path d="M19 3a2 2 0 0 1 2 2" />
          <path d="M5 21a2 2 0 0 1-2-2" />
          <path d="M9 3h1" />
          <path d="M9 21h2" />
          <path d="M14 3h1" />
          <path d="M3 9v1" />
          <path d="M21 9v2" />
          <path d="M3 14v1" />
        </svg>
      </button>
    );
  }, [isActive, onToggle]);

  return null;
}
