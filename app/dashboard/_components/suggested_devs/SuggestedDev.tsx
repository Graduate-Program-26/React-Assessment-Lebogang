import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export interface SuggestedDevProp {
  username: string
  avatar_url: string
  bio?: string
  url: string
}

export default function SuggestedDev({ data }: { data: SuggestedDevProp }) {
  function handleViewProfile() {
    window.open(data.url, "_blank");
  }

  return (
    <Item>
      <ItemMedia>
        <Avatar className="w-10 h-10">
          <AvatarImage src={data.avatar_url} alt={data.username} />
          <AvatarFallback>{data.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </ItemMedia>

      <ItemContent>
        <ItemTitle>{data.username}</ItemTitle>
        {data.bio && (
          <ItemDescription className="line-clamp-1">
            {data.bio}
          </ItemDescription>
        )}
      </ItemContent>

      <ItemActions>
        <Button variant="outline" size="sm" onClick={handleViewProfile}>
          View Profile
        </Button>
      </ItemActions>
    </Item>
  )
}