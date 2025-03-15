import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateEntryButton = () => {
    return ( 
        <div>
            <Link href="/dashboard/routes/entry">
                <Button className="bg-zinc-800 hover:bg-zinc-700">Create Entry</Button>
            </Link>
        </div>
     );
}
 
export default CreateEntryButton;