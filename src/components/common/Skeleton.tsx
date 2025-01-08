interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton = ({
  className = "",
  width = "100%",
  height = "20px",
}: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
