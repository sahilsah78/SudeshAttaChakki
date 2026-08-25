import { SpriteIcon } from "./SpriteIcon";

export function IconBtn({
  className,
  iconName,
  iconClassName,
  children = null,
  ...btnProps
}) {
  //! later when got time search and ensure all button icon combo are powered by this component,
  return (
    <button className={className} {...btnProps}>
      {children}
      <SpriteIcon iconName={iconName} className={iconClassName} />
    </button>
  );
}
