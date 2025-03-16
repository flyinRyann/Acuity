import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

const CreateEntryButton = () => {
    return ( 
        <div>
            <Link href="/page1-name">
                <Button className="bg-zinc-800 hover:bg-zinc-700">
                    <CirclePlus className="mr-1 h-4 w-4" />
                    Create Entry
                </Button>
            </Link>
        </div>
     );
}
 
export default CreateEntryButton;