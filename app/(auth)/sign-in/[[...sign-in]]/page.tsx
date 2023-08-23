import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <>
      <div className="w-full mt-20 flex items-center justify-center">
        <SignIn
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: "#000000",
              colorPrimary: "#0095F6",
              colorText: "white",
            },
          }}
        />
      </div>
      ;
    </>
  );
}
