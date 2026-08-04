type DesignPlaceholderProps = {
  className?: string;
  label: string;
};

export function DesignPlaceholder({ className = "", label }: DesignPlaceholderProps) {
  return (
    <div className={`design-placeholder${className ? ` ${className}` : ""}`} role="img" aria-label={`${label} image placeholder`}>
      <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 24 24" width="28">
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <strong>{label}</strong>
      <span>Image placeholder</span>
    </div>
  );
}
