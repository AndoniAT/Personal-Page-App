'use client'

import { Tooltip } from "@nextui-org/tooltip";

interface TooltipProps extends React.AllHTMLAttributes<TooltipProps> {
    content:string;
    children: React.ReactNode;
    offset?:number;
    crossOffset?:number;
  }

export function MyTooltip({ content, offset, crossOffset, children, className, ...rest }: TooltipProps) {
    let offs = offset ?? -7;
    let crossOffs = crossOffset ?? 0;
    return (
        <Tooltip placement={'top-start'} closeDelay={100}
            className={`p-2 rounded-lg
            border border-2 border-white
            bg-black text-white
            ${className}
            `} 
            offset={offs}
            content={content}
            showArrow={true}
            crossOffset={crossOffs}
        >
            <div className="flex flex-inline">
                { children }
            </div>
        </Tooltip>
      );

}