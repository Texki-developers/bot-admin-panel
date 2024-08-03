import { Button, Heading, VStack } from "@chakra-ui/react";
import PrimaryInput from "../../InputFields/PrimaryInput/PrimaryInput";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../../../types/components/Forms/loginForm.types";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useMemo } from "react";
import useCustomToast from "../../../hooks/useCustomToast/useCustomToast";
import { adminLogin } from "../../../features/manageAuth/manageAuthAction";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: "onChange" });

  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.auth.loading);
  const message = useAppSelector((state) => state.auth.message);
  const error = useAppSelector((state) => state.auth.error);

  const onFormSubmit = async (data: ILoginForm) => {
    await dispatch(adminLogin({ body: data }));
    if (!error) {
      navigate("/secret-code");
    }
  };

  useMemo(() => {
    if (error) {
      toast("Error", message?.toString(), "error");
    }
  }, [error]);

  return (
    <VStack
      bg="white"
      p={{ base: 4, md: 8 }}
      rounded="xl"
      w={{ base: "90%", sm: "30rem" }}
      gap={4}
      alignItems="left"
    >
      <Heading variant="formHeading" textAlign="left">
        Login Account
      </Heading>
      <VStack w="100%">
        <PrimaryInput
          errorMessage={errors?.username?.message}
          label="Username"
          register={register("username", {
            required: "This field is required",
          })}
          required
        />
        <PrimaryInput
          errorMessage={errors?.password?.message}
          label="Password"
          register={register("password", {
            required: "This field is required",
          })}
          required
          type="password"
        />
        <Button
          variant="primary"
          width="100%"
          onClick={handleSubmit(onFormSubmit)}
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    </VStack>
  );
}
