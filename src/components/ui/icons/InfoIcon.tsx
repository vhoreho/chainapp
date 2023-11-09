import { SVGProps } from 'react';

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="current"
    stroke="curent"
    viewBox="0 0 24 24"
    {...props}
  >
    <g strokeLinejoin="round" clipPath="url(#a)">
      <circle cx={12} cy={12} r={9} strokeLinecap="round" strokeWidth={2.5} />
      <path strokeWidth={3.75} d="M12 8h.01v.01H12z" />
      <path strokeLinecap="round" strokeWidth={2.5} d="M12 12v4" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
