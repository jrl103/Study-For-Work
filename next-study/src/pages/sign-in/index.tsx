import SignInContainer from "@/container/signInContainer";

export default function SignInPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const localePath = props.locale === "ko" ? "" : `${props.locale}/`;
  const langUrl = `https://wala-land.com/${localePath}sign-in`;

  return (
    <>
      <SignInContainer />
    </>
  );
}
