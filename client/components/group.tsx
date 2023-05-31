import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Group() {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">My Union</p>
        <p className="text-sm text-muted-foreground">
          this is a quick union description.
        </p>
      </div>
      <Button className="ml-auto font-medium">Enter</Button>
    </div>
  );
}
