import { IconProps, iconSizeVariants } from "./IconTypes"

export const CancelIcon = (props : IconProps) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={iconSizeVariants[props.size]}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

}