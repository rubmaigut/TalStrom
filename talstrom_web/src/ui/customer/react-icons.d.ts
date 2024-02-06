declare module 'react-icons' {
  type IconType = React.ElementType<{ size?: number; className?: string }>;

  interface IconBase {
    size?: number;
    className?: string;
  }

  export const AiOutlineApi: IconType;
  export const FaReact: IconType;
}
