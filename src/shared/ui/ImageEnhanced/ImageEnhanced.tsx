import React, { FC, ReactNode } from 'react';
import questionMark from '../../../../public/static/img/no-data/question-mark.png';
import * as Styled from './ImageEnhanced.styled';
import { StaticImageData } from "next/image";

interface IProps {
  width: string;
  height?: string;
  src?: string | StaticImageData | null;
  borderRadius: string;
  placeholderSrc?: string | StaticImageData;
  children: ReactNode;
}
const ImageEnhanced: FC<IProps> = ({
  width,
  height,
  src,
  placeholderSrc = questionMark,
  borderRadius= '50%',
  children,
}) => {
  return (
    <Styled.ImageNContainer height={height || width} width={width}>
      <Styled.ImageN
        alt="image"
        layout="fill"
        objectFit="contain"
        borderRadius={borderRadius}
        src={src || placeholderSrc}
      />
      {children}
    </Styled.ImageNContainer>
  );
};

export default ImageEnhanced;
