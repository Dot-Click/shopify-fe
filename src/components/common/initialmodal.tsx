import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import eComProtectLogo from "/images/logo.png";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-blue-400 rounded-2xl p-8 text-center shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold text-gray-800">
            Welcome to
          </DialogTitle>
          <img
            src={eComProtectLogo}
            alt="eComProtect Logo"
            className="w-40 mx-auto mb-4"
          />
          {/* This empty description is useful for accessibility */}
          <DialogDescription className="sr-only">
            Welcome to eComProtect. This is your simplified dashboard to manage
            everything efficiently.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm  leading-relaxed">
          This is your simplified dashboard to manage refund claims, retailers,
          analytics and platform settings efficiently.
        </p>

        <Button
          onClick={onClose}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-xl"
        >
          Get Start
        </Button>
      </DialogContent>
    </Dialog>
  );
}
