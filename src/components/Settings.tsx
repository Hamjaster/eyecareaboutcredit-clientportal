import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Mail,
  Upload,
  User2Icon,
  X,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  deleteAvatar,
  updateAvatar,
} from "@/store/features/profileFeature/profileSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useNavigate } from "react-router-dom";

const emailPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

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
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const navigate = useNavigate();
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

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = reader.result as string;
        dispatch(updateAvatar(img));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarDelete = () => {
    dispatch(deleteAvatar());
  };

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, you would implement logout logic here
    navigate("/");
    console.log("Logging out...");
  };

  const emailPasswordForm = useForm({
    resolver: zodResolver(emailPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const changePasswordForm = useForm({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  return (
    <>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 p-8">
        <Card className="col-span-2">
          <CardHeader className="text-xl font-semibold">
            Profile Settings
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row items-center ">
            {/* Upload Photo */}
            <div className="w-full flex items-center space-x-4 ">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile?.avatar || ""} alt="Company Logo" />
                <AvatarFallback>
                  {" "}
                  <User2Icon />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-4">
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-4 text-xs text-blue-600 hover:text-blue-800">
                    <Upload size={16} />
                    <span>{profile ? "Change Photo" : "Upload Photo"}</span>
                  </div>
                </Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                {profile && (
                  <div
                    onClick={handleAvatarDelete}
                    className="flex items-center space-x-4 text-xs text-red-600 mt-3 cursor-pointer hover:text-red-800"
                  >
                    <X size={16} />
                    <span>Remove Photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Change email/password */}
            <div className="w-full px-3 my-9">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>Email</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEmailDialogOpen(true)}
                  >
                    Change Email
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <span>Password</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsPasswordDialogOpen(true)}
                  >
                    Change Password
                  </Button>
                </div>
                <div className="pt-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
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
                  <Label
                    htmlFor="updock"
                    className="font-updock text-3xl italic"
                  >
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
      {/* Update email pass dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Email </DialogTitle>
            <DialogDescription>Enter your new details below</DialogDescription>
          </DialogHeader>
          <Form {...emailPasswordForm}>
            <form className="space-y-4">
              <FormField
                control={emailPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="new.email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={emailPasswordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Your New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEmailDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Update email pass dialog */}
      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Email </DialogTitle>
            <DialogDescription>Enter your new details below</DialogDescription>
          </DialogHeader>
          <Form {...changePasswordForm}>
            <form className="space-y-4">
              <FormField
                control={changePasswordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Current Password here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={emailPasswordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Your Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEmailDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
