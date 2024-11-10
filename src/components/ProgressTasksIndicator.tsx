import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Step {
  id: string;
  title: string;
  completed: boolean;
  route?: string;
}

export default function TasksProgress() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "welcome",
      title: "Welcome Step",
      completed: false,
      route: "/welcome",
    },
    {
      id: "credit-score",
      title: "Signup for Credit Hero Score and Share Login Details",
      completed: false,
      route: "/credit-score",
    },
    {
      id: "signature",
      title: "Setup Digital Signature",
      completed: false,
      route: "/signature",
    },
    {
      id: "photo-id",
      title: "Upload Photo ID",
      completed: false,
    },
    {
      id: "address-proof",
      title: "Upload Proof of Address",
      completed: false,
    },
  ]);

  const [photoIdOpen, setPhotoIdOpen] = useState(false);
  const [addressProofOpen, setAddressProofOpen] = useState(false);

  const calculateProgress = () => {
    const completedSteps = steps.filter((step) => step.completed).length;
    return (completedSteps / steps.length) * 100;
  };

  const handleStepComplete = (stepId: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };

  const handleFileUpload = (stepId: string, file: File) => {
    console.log(`Uploading file for ${stepId}:`, file);
    // Here you would typically handle the file upload to your server
    handleStepComplete(stepId);
    if (stepId === "photo-id") {
      setPhotoIdOpen(false);
    } else if (stepId === "address-proof") {
      setAddressProofOpen(false);
    }
  };

  const handleStepClick = (step: Step) => {
    if (step.id === "signature") {
      navigate("/settings");
    } else if (step.id === "photo-id") {
      setPhotoIdOpen(true);
    } else if (step.id === "address-proof") {
      setAddressProofOpen(true);
    }
  };

  return (
    <div className="w-full mx-auto py-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Welcome Sample Client!</h1>
        <p className="text-muted-foreground">
          Here are a few things we need you to complete.
        </p>
      </div>

      <div className="space-y-2">
        <Progress value={calculateProgress()} className="h-2" />
        <p className="text-sm text-muted-foreground text-right">
          {Math.round(calculateProgress())}%
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex items-center space-x-4 p-4 border rounded-lg"
          >
            <div className="h-5 w-5 border rounded-sm flex items-center justify-center">
              {step.completed && <Check className="h-4 w-4 text-primary" />}
            </div>
            <span className="flex-grow">{step.title}</span>
            <Button
              variant={step.completed ? "secondary" : "default"}
              onClick={() => handleStepClick(step)}
              disabled={step.completed}
            >
              {step.completed ? "Completed" : "Complete Now"}
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={photoIdOpen} onOpenChange={setPhotoIdOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Photo ID</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="photo-id">Photo ID</Label>
              <Input
                id="photo-id"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload("photo-id", file);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={addressProofOpen} onOpenChange={setAddressProofOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Proof of Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="address-proof">Proof of Address</Label>
              <Input
                id="address-proof"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload("address-proof", file);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
