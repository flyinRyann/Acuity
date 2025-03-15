import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateEntryButton2 = () => {
  return (
    <div>
      <Link href="/page1-name">
        <Button className="bg-zinc-800 hover:bg-zinc-700 cursor-pointer">Add New Entry</Button>
      </Link>
    </div>
  );
}

export default CreateEntryButton2;
