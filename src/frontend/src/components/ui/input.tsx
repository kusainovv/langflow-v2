import * as React from "react";
import { cn } from "../../utils/utils";
import ForwardedIconComponent from "../common/genericIconComponent";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputClassName, icon = "", type, ...props }, ref) => {
    if (icon) {
      return (
        <label className="relative flex items-center w-full min-h-[24px] bg-white p-1 box-border border-2 border-solid border-[#848584] border-r-[#FEFEFE] border-b-[#FEFEFE] border-l-[#848584] font-sans text-base leading-[1.5]"> {/**className={cn("relative block w-full", className)} */}
          <div className="absolute top-0 left-0 w-[calc(100%-4px)] h-[calc(100%-4px)] border-2 border-solid border-[#0A0A0A] border-r-[#DFDFDF] border-b-[#DFDFDF] border-l-[#0A0A0A] pointer-events-none shadow-[inset_2px_2px_3px_rgba(0,0,0,0.2)]"></div>

          {/* <ForwardedIconComponent
            name={icon}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-black bg-green-500"
          /> */}
          <input
            autoComplete="off"
            data-testid=""
            type={type}
            className={cn(
              // "nopan nodelete nodrag noflow form-input block w-full appearance-none truncate border-border bg-white px-3 text-left text-sm shadow-field  focus:border-black focus:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:border-white dark:focus:ring-zinc-800 !bg-orange-500",
              // inputClassName,
              "relative w-full h-full outline-none border-none bg-none text-base font-inherit min-h-[27px] text-[#0A0A0A] px-2"
            )}
            ref={ref}
            {...props}
          />
        </label>
      );
    } else {
      return <div className="relative flex items-center w-full min-h-[24px] bg-white p-1 box-border border-2 border-solid border-[#848584] border-r-[#FEFEFE] border-b-[#FEFEFE] border-l-[#848584] font-sans text-base leading-[1.5]">
        <div className="absolute top-0 left-0 w-[calc(100%-4px)] h-[calc(100%-4px)] border-2 border-solid border-[#0A0A0A] border-r-[#DFDFDF] border-b-[#DFDFDF] border-l-[#0A0A0A] pointer-events-none shadow-[inset_2px_2px_3px_rgba(0,0,0,0.2)]"></div>
        
        <input
          data-testid=""
          type={type}
          className={cn(
            // "text-input-field",
            // "nopan nodelete nodrag noflow min-h-[24px] w-full", // primary-input
            // className,
            "relative w-full h-full outline-none border-none bg-none text-base font-inherit min-h-[27px] text-[#0A0A0A] px-2"
          )}
          ref={ref}
          {...props}
        />
      </div>
    }
  },
);
Input.displayName = "Input";

export { Input };
