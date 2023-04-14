import Image from 'next/image';
import styled from "styled-components";

export const ImageNContainer = styled.div<{ width: string; height: string }>`
  position: relative;
  display: inline-flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-height: ${(props) => props.height};
  max-width: ${(props) => props.width};
`;

export const ImageN = styled(Image)<{ borderRadius: string; }>`
  border-radius: ${(props) => props.borderRadius};
  img {
    border-radius: ${(props) => props.borderRadius};
  }
`;
