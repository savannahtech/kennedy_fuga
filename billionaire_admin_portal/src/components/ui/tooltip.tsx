import * as React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
interface ITooltip {
  children: React.ReactNode;
  tootltipText?: React.ReactNode;
  className?: string;
  place?: "top" | "right" | "bottom" | "left";
  clickable?: boolean;
  effect?: "solid" | "float";
}

const Tooltip = ({
  children,
  tootltipText,
  className,
  place = "left",
  clickable,
  effect = "float",
}: ITooltip) => {
  const id = `tooltipId_${React.useId()}`;
  return (
    <div>
      <div data-tooltip-id={id}>{children}</div>
      {tootltipText && (
        <ReactTooltip
          id={id}
          data-tooltip-float={effect === "float"}
          place={place}
          className={className}
          clickable={clickable}
          positionStrategy="fixed"
        >
          {tootltipText}
        </ReactTooltip>
      )}
    </div>
  );
};

export default Tooltip;
