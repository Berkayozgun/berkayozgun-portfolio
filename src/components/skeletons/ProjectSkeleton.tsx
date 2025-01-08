import Skeleton from "../common/Skeleton";

const ProjectCardSkeleton = () => {
  return (
    <div className='flex flex-col md:flex-row gap-4 items-center p-4'>
      <Skeleton className='rounded-xl aspect-video w-full' />
      <div className='w-full space-y-4'>
        <Skeleton height='32px' width='60%' />
        <Skeleton height='60px' width='90%' />
        <div className='flex gap-2'>
          <Skeleton width='100px' height='36px' />
          <Skeleton width='100px' height='36px' />
        </div>
      </div>
    </div>
  );
};

const ProjectsSkeleton = () => {
  return (
    <section className='py-20 px-4 md:px-20'>
      <Skeleton className='mx-auto' width='200px' height='40px' />
      <Skeleton className='mx-auto mt-4' width='50px' height='4px' />

      <div className='mt-10 space-y-12'>
        {[1, 2, 3].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSkeleton;
