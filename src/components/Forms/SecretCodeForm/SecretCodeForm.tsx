import { Button, VStack } from "@chakra-ui/react";
import PrimaryInput from "../../InputFields/PrimaryInput/PrimaryInput";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect } from "react";
import useCustomToast from "../../../hooks/useCustomToast/useCustomToast";
import { ISecretCodeBody } from "../../../types/components/Forms/form.type";
import { createSecretCode } from "../../../features/manageSecretCode/manageSecretCode.action";
import { resetSecret } from "../../../features/manageSecretCode/manageSecretCode.slice";

export default function SecretCodeForm({ onClose }: { onClose: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISecretCodeBody>({ mode: "onChange" });

  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const { status, message } = useAppSelector((state) => state.secret);

  const onFormSubmission = async (data: ISecretCodeBody) => {
    let response = await dispatch(createSecretCode({ body: data }));
    if (response?.meta?.requestStatus === "fulfilled") {
      onClose();
    }
  };

  useEffect(() => {
    if ((status === "error" || status === "success") && message) {
      toast(status === "error" ? "Ugh No!" : "Great!", message, status);
      dispatch(resetSecret());
    }
  }, [status, message]);

  return (
    <VStack w="100%">
      <PrimaryInput
        label="Secret Code"
        register={register("secretToken", {
          required: "This field is required",
        })}
        errorMessage={errors?.secretToken?.message}
        required
      />
      <PrimaryInput
        label="Points"
        register={register("points", { required: "This field is required" })}
        errorMessage={errors?.points?.message}
        required
      />
      <PrimaryInput
        label="Redeem Count"
        register={register("userLimit", { required: "This field is required" })}
        errorMessage={errors?.userLimit?.message}
        required
      />
      <PrimaryInput
        label="Validity"
        register={register("expiryTime", {
          required: "This field is required",
        })}
        errorMessage={errors?.expiryTime?.message}
        type="datetime-local"
        required
      />
      <Button
        isLoading={status === "loading"}
        onClick={handleSubmit(onFormSubmission)}
      >
        Submit
      </Button>
    </VStack>
  );
}
