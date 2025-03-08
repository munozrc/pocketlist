import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export function scale(size: number): number {
  return PixelRatio.roundToNearestPixel(
    (shortDimension / guidelineBaseWidth) * size,
  );
}

export function verticalScale(size: number): number {
  return PixelRatio.roundToNearestPixel(
    (longDimension / guidelineBaseHeight) * size,
  );
}
