export interface IButtonFactoryProps {
  name: string;
  background?: string;
  backgroundHovered?: string;
  width?: string;
  height?: string;
  onClick: () => void;
}
