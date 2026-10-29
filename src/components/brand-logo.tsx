type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <svg
      aria-label="WEDTEC EVENTS"
      className={className}
      role="img"
      viewBox="0 0 3334.98 1080"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href="/logo/logo.svg#Layer_1" />
    </svg>
  );
}
