import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header(): React.JSX.Element {
  return (
    <header>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
