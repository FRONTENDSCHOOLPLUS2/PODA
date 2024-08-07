import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"

export function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* //! 드롭다운 focus 적용 안되는 문제 있음 */}
        <Button variant="ghost" className="focus:outline-none">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 mr-12 bg-[#616161] border-none">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-primary">수정</DropdownMenuItem>
          <DropdownMenuItem className="text-red-500">삭제</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
