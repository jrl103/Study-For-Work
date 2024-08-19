import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

export default function SignInContainer() {
  const methods = useForm<ILoginForm>({
    resolver: yupResolver(schema.loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
    try {
      await Login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <SignIn onSubmit={onSubmit} />
      </FormProvider>
    </>
  );
}
