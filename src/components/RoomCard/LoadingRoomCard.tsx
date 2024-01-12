import {
  Card
} from "../ui/card";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";


const LoadingRoomCard: FC = () => {
  return (
    <Card className="w-full">
      <Skeleton className="h-[200px] w-full" />
      <div className="p-3 flex flex-col gap-4">
        <Skeleton className="h-6 w-full max-w-[150px]" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-5 w-full max-w-[100px]" />

        <div className="flex justify-between gap-4">
          <Skeleton className="h-9 w-full max-w-[100px]" />
          <Skeleton className="h-9 w-full max-w-[100px]" />
        </div>
      </div>
    </Card>
  )
}

export { LoadingRoomCard };
