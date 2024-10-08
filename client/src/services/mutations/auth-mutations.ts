import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SigninApi, SignoutUserApi, SignupApi } from "../apis/auth-api";
import { toast } from "sonner";

export function SignUpMutation() {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: SignupApi,
    onSuccess: async (data) => {
      toast.success(data.message);
    },
  });
}

export function SignInMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: SigninApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["verify-user"] });
    },
  });
}

export function SignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sign-out"],
    mutationFn: SignoutUserApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["verify-user"] });
    },
  });
}
