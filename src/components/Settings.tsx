import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    reportProvider: "",
    username: "",
    password: "",
    phoneNumber: "",
    securityWord: "",
  });
  const [signature, setSignature] = useState({
    name: "Sample Client",
    style: "style1",
  });

  const handleLoginUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the login details
    console.log("Updating login details:", loginForm);
  };

  const handleSignatureUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the signature
    console.log("Updating signature:", signature);
  };

  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 p-8">
      <Card>
        <CardHeader>
          <CardTitle>Login Details for Credit Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reportProvider">Report provider</Label>
              <Select
                value={loginForm.reportProvider}
                onValueChange={(value) =>
                  setLoginForm({ ...loginForm, reportProvider: value })
                }
              >
                <SelectTrigger id="reportProvider">
                  <SelectValue placeholder="Select report provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="provider1">Report Provider 1</SelectItem>
                  <SelectItem value="provider2">Report Provider 2</SelectItem>
                  <SelectItem value="provider3">Report Provider 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={loginForm.phoneNumber}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, phoneNumber: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityWord">
                Security Word (if you created one)
              </Label>
              <Input
                id="securityWord"
                value={loginForm.securityWord}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, securityWord: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-full">
              Update
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Choose a Signature Style</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignatureUpdate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="signatureName">
                Enter your full name as it should appear in your signature
              </Label>
              <Input
                id="signatureName"
                value={signature.name}
                onChange={(e) =>
                  setSignature({ ...signature, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Preview of your signature</Label>
              <div className=" rounded-md border p-2 text-2xl">
                <span className={`font-${signature.style}`}>
                  {signature.name}
                </span>
              </div>
            </div>

            <RadioGroup
              value={signature.style}
              onValueChange={(value) =>
                setSignature({ ...signature, style: value })
              }
              className="space-y-2 "
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="updock" id="updock" />
                <Label htmlFor="updock" className="font-updock text-3xl italic">
                  {signature.name}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dancing" id="dancing" />
                <Label htmlFor="dancing" className="font-dancing text-2xl">
                  {signature.name}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shadows" id="shadows" />
                <Label htmlFor="shadows" className="font-shadows text-2xl">
                  {signature.name}
                </Label>
              </div>
            </RadioGroup>

            <Button type="submit" className="w-full ">
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
