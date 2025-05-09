import { ICON_STROKE_WIDTH } from "@/constants/constants";
import { cn } from "@/utils/utils";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { handleKeyDown } from "../../../../../utils/reactflowUtils";
import { InputProps, IntComponentType } from "../../types";

export default function IntComponent({
  value,
  handleOnNewValue,
  rangeSpec,
  disabled,
  editNode = false,
  id = "",
}: InputProps<number, IntComponentType>): JSX.Element {
  const min = -Infinity;
  // Clear component state
  useEffect(() => {
    if (disabled && value !== 0) {
      handleOnNewValue({ value: 0 }, { skipSnapshot: true });
    }
  }, [disabled, handleOnNewValue]);

  const [cursor, setCursor] = useState<number | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.setSelectionRange(cursor, cursor);
  }, [ref, cursor, value]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCursor(e.target.selectionStart);
    handleOnNewValue({ value: Number(e.target.value) });
  };

  const getStepValue = () => {
    return (Number.isInteger(rangeSpec?.step) ? rangeSpec.step : 1) ?? 1;
  };

  const getMinValue = () => {
    return rangeSpec?.min ?? min;
  };

  const getMaxValue = () => {
    return rangeSpec?.max ?? undefined;
  };

  const getInputClassName = () => {
    return cn(
      editNode ? "input-edit-node" : "",
      "nopan nodelete nodrag noflow primary-input min-h-[24px] w-full ",
    );
  };

  const handleNumberChange = (newValue) => {
    handleOnNewValue({ value: Number(newValue) });
  };

  const handleInputChange = (event) => {
    const inputValue = Number(event.target.value);
    if (inputValue < getMinValue()) {
      event.target.value = getMinValue().toString();
    }
  };

  const iconClassName =
    "h-3 w-3 group-increment-hover:text-black group-decrement-hover:text-black transition-colors";
  const stepperClassName = " w-5 border-l-[1px]";
  const incrementStepperClassName =
    " border-b-[1px] group-increment shadow-button bg-silver";
  const decrementStepperClassName =
    "group-decrement shadow-button bg-silver";
  const inputRef = useRef(null);

  return (
    <div className="w-full">
      <NumberInput
        id={id}
        step={getStepValue()}
        min={getMinValue()}
        max={getMaxValue()}
        onChange={handleNumberChange}
        value={value ?? ""}
      >
        <NumberInputField
          className={getInputClassName()}
          onChange={handleChangeInput}
          onKeyDown={(event) => handleKeyDown(event, value, "")}
          onInput={handleInputChange}
          disabled={disabled}
          placeholder={editNode ? "Integer number" : "Type an integer number"}
          data-testid={id}
          ref={inputRef}
        />
        <NumberInputStepper className={stepperClassName}>
          <NumberIncrementStepper className={incrementStepperClassName}>
            <PlusIcon
              className={iconClassName}
              strokeWidth={ICON_STROKE_WIDTH}
            />
          </NumberIncrementStepper>
          <NumberDecrementStepper className={decrementStepperClassName}>
            <MinusIcon
              className={iconClassName}
              strokeWidth={ICON_STROKE_WIDTH}
            />
          </NumberDecrementStepper>
        </NumberInputStepper>
      </NumberInput>
    </div>
  );
}
