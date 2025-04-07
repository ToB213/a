import GrommetIconsGithub from "../Icons/GrommetIconsGithub";
import Link from "next/link";
import GrommetIconsX from "../Icons/GrommetIconsX";

export default function Header() {

  return (
    <div className="flex justify-end">
        <Link href={"https://x.com/just_for_ToB"}>
          <GrommetIconsX/>
        </Link>
        <Link className="px-2" href={"https://github.com/ToB213"}>
          <GrommetIconsGithub/>
        </Link>
    </div>
  );
}
