import { ProfileHeaderSkeleton, ProfileFeedSkeleton } from "../_components/ProfileSkeletons";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <ProfileHeaderSkeleton />

          <ProfileFeedSkeleton />
    
    </div>
  );
}