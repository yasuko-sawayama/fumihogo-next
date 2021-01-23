import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
`;

const color = "#faaeb9";

interface SpinnerProps {
  loading: boolean;
}

export default function Spinner({ loading }: SpinnerProps) {
  return (
    <FadeLoader
      color={color}
      loading={loading}
      css={override}
      height={40}
      width={6}
      radius={1}
      margin={20}
    />
  );
}
