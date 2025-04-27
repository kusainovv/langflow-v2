import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import remove from "../../../public/assets/icons/actions/remove.png"

export default function DeleteConfirmationModal({
  onConfirm,
  description,
  asChild,
  open,
  setOpen,
  note = "",
}: {
  onConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  description?: string;
  asChild?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  note?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild={asChild} tabIndex={-1}>
        {children}
      </DialogTrigger> */}
      <DialogContent title="Delete Alert" asChild onInteractOutside={(e) => {
        e.preventDefault()
      }}>
        <div className="p-4">
        {/* <DialogHeader> */}
          {/* <DialogTitle> */}
            {/* <div className="flex items-center">
              <span className="pr-2">Delete</span>
              <Trash2
                className="h-6 w-6 pl-1 text-foreground"
                strokeWidth={1.5}
              />
            </div> */}
          {/* </DialogTitle> */}
        {/* </DialogHeader> */}
        <div className="flex mb-4">
          <img className="mr-4" src={remove} />
          <span className="text-sm">
            Are you sure you want to delete the selected{" "}
            {description ?? "component"}?<br></br>
            {note && (
              <>
                {note}
                <br></br>
              </>
            )}
          </span>
          
        </div>
        <DialogFooter>
          <div className="flex justify-end gap-x-1">
          <DialogClose asChild>
            <Button
              className="w-[75px]"
              onClick={(e) => e.stopPropagation()}
              // className="mr-1"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-[75px]"
              type="submit"
              // variant=""
              onClick={(e) => {
                onConfirm(e);
              }}
            >
              Delete
            </Button>
          </DialogClose>
          </div>
        
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
