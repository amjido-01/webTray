"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useWaitlist } from "@/hooks/use-wait-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import alert from "@/public/alert.png";
const waitlistSchema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  business: yup.string().required("Business name is required"),
  product: yup.string().required("Product is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email().required("Valid email is required"),
  location: yup.string().required("Location is required"),
  sellingMethod: yup.string().required("Select one option"),
});

type WaitlistFormData = yup.InferType<typeof waitlistSchema>;

export default function WaitlistForm() {
  const { joinWaitlist, isJoiningWaitlist, joinWaitlistSuccess } =
    useWaitlist();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<WaitlistFormData>({
    resolver: yupResolver(waitlistSchema),
    mode: "onChange",
  });

const onSubmit = async (data: WaitlistFormData) => {
  try {
    await joinWaitlist({
      fullName: data.fullname,
      businessName: data.business,
      businessType: data.product,
      phone: data.phone,
      email: data.email,
      location: data.location,
      how: data.sellingMethod,
    });

    // Show success dialog AFTER API success
    setOpen(true);

    // reset();
  } catch (error) {
    // error toast is automatically handled in the hook
  }
};

  const handleDialogClose = () => {
    setOpen(false);
    // Reset form when dialog closes
    reset();
  };

  return (
    <div className="w-full flex justify-center py-20 mt-[112px] bg-white">
      <div className="max-w-md md:max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-[#4D4D4D] md:text-[32px]">
          Join the Waitlist for Early Access
        </h1>

        <p className="text-[#676767] mt-2 text-sm leading-[22px]">
          Sign up to build your online store, manage your inventory, and start
          accepting orders — without juggling five different tools.
        </p>

        <form
          className="mt-10 space-y-5 text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Full Name */}
          <div className="space-y-1">
            <Label className="text-[#1A1A1A] text-[16px] font-normal leading-[100%] mb-2">
              Full Name
            </Label>
            <Input
              {...register("fullname")}
              placeholder="Enter your full name"
              className="h-11 placeholder:text-[#676767] text-[14px] font-normal border-2"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-[#1A1A1A] text-[16px] font-normal leading-[100%] mb-2">
              Business Name
            </Label>
            <Input
              {...register("business")}
              placeholder="Enter your business name"
              className="h-11 placeholder:text-[#676767] text-[14px] font-normal border-2"
            />
            {errors.business && (
              <p className="text-red-500 text-sm">{errors.business.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-[#1A1A1A] text-[16px] font-normal leading-[100%] mb-2">
              What do you sell?
            </Label>
            <Input
              {...register("product")}
              placeholder="e.g. Clothes"
              className="h-11 placeholder:text-[#676767] text-[14px] font-normal border-2"
            />
            {errors.product && (
              <p className="text-red-500 text-sm">{errors.product.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-[#1A1A1A] text-[16px] font-normal leading-[100%] mb-2">
              Phone Number
            </Label>
            <Input
              {...register("phone")}
              placeholder="Enter your WhatsApp number"
              className="h-11 placeholder:text-[#676767] text-[14px] font-normal border-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-[#1A1A1A] text-[16px] font-normal leading-[100%] mb-2">
              Email Address
            </Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="h-11 placeholder:text-[#676767] text-[14px] font-normal border-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-[#1A1A1A] text-[16px] font-normal leading-[100%] mb-2">
              Location
            </Label>
            <Input
              {...register("location")}
              placeholder="Enter your location"
              className="h-11 placeholder:text-[#676767] text-[14px] font-normal border-2"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-[#1A1A1A] text-[16px] font-normal leading-[100%] mb-2">
              How do you currently sell your products?
            </Label>

            <Select
              onValueChange={(value) =>
                setValue("sellingMethod", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="store">Physical Store</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {errors.sellingMethod && (
              <p className="text-red-500 text-sm">
                {errors.sellingMethod.message}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mt-[50px]">
            <Button
              type="submit"
              disabled={!isValid || isJoiningWaitlist}
              className="w-1/2 h-11 bg-gray-800 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isJoiningWaitlist ? "Submitting..." : "Join the Waitlist"}
            </Button>
          </div>
        </form>

        <Dialog open={open} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-md text-center py-10">
            <DialogHeader>
              <div className="text-5xl mb4">
                <Image
                  src={alert}
                  alt="alert"
                  className="w-[104px] h-[120px] mx-auto"
                />
              </div>
              <DialogTitle className="text-[24px] text-center font-extrabold leading-[34px] text-[#1A1A1A]">
                🎉 Thank you for joining the WebTray waitlist!
              </DialogTitle>
            </DialogHeader>

            <p className="text-[#343434] mt-2 text-[16px] text-center font-medium leading-[24px] px-4">
              We'll keep you updated as we prepare for launch — and you'll be
              among the first to get access when we go live in your area.
            </p>

            <DialogFooter className="flex mt-6">
              <Button
                onClick={handleDialogClose}
                className="rounded-full mx-auto px-6 h-10"
              >
                Great, Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
