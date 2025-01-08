import Skeleton from "../common/Skeleton";

const HeroSkeleton = () => {
  return (
    <section className='bg-gray-100 dark:bg-gray-900 min-h-fit p-20'>
      <div className='container mx-auto flex flex-col text-center items-center justify-center md:flex-row md:space-x-4 md:text-left'>
        <div className='md:mt-2 md:w-1/2'>
          <Skeleton
            className='rounded-full mx-auto'
            width='325px'
            height='325px'
          />
        </div>
        <div className='md:mt-2 md:w-3/5'>
          <Skeleton className='mt-6 md:mt-0' height='60px' width='80%' />
          <Skeleton className='mt-4' height='100px' width='90%' />
          <div className='mt-4'>
            <Skeleton className='inline-block' width='150px' height='45px' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
