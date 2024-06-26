import * as React from "react";
import Svg, {
  Path,
  Rect,
  LinearGradient,
  Stop,
  G,
  Circle,
  Ellipse,
  Defs,
  RadialGradient,
  Text,
  TSpan,
} from "react-native-svg";

export function FacebookSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Ebene 1"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <Path
        fill="#1877f2"
        d="M1024 512C1024 229.23 794.77 0 512 0S0 229.23 0 512c0 255.554 187.231 467.37 432 505.778V660H302V512h130V399.2C432 270.88 508.439 200 625.39 200 681.407 200 740 210 740 210v126h-64.563C611.835 336 592 375.467 592 415.957V512h142l-22.7 148H592v357.778C836.769 979.37 1024 767.554 1024 512z"
      />
      <Path
        fill="#fff"
        d="M711.3 660L734 512H592v-96.043c0-40.49 19.835-79.957 83.437-79.957H740V210s-58.592-10-114.61-10C508.438 200 432 270.88 432 399.2V512H302v148h130v357.778a517.396 517.396 0 00160 0V660z"
      />
    </Svg>
  );
}

export function TwitterSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 112.197 112.197"
      {...props}
    >
      <Circle cx={56.099} cy={56.098} r={56.098} fill="#55acee" />
      <Path
        fill="#f1f2f2"
        d="M90.461 40.316a26.753 26.753 0 01-7.702 2.109 13.445 13.445 0 005.897-7.417 26.843 26.843 0 01-8.515 3.253 13.396 13.396 0 00-9.79-4.233c-7.404 0-13.409 6.005-13.409 13.409 0 1.051.119 2.074.349 3.056-11.144-.559-21.025-5.897-27.639-14.012a13.351 13.351 0 00-1.816 6.742c0 4.651 2.369 8.757 5.965 11.161a13.314 13.314 0 01-6.073-1.679l-.001.17c0 6.497 4.624 11.916 10.757 13.147a13.362 13.362 0 01-3.532.471c-.866 0-1.705-.083-2.523-.239 1.706 5.326 6.657 9.203 12.526 9.312a26.904 26.904 0 01-16.655 5.74c-1.08 0-2.15-.063-3.197-.188a37.929 37.929 0 0020.553 6.025c24.664 0 38.152-20.432 38.152-38.153 0-.581-.013-1.16-.039-1.734a27.192 27.192 0 006.692-6.94z"
      />
    </Svg>
  );
}
export function GoogleSVG(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fill="#4285F4"
        d="M-3.264 51.509c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
        transform="translate(27.009 -39.239)"
      />
      <Path
        fill="#34A853"
        d="M-14.754 63.239c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z"
        transform="translate(27.009 -39.239)"
      />
      <Path
        fill="#FBBC05"
        d="M-21.484 53.529c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
        transform="translate(27.009 -39.239)"
      />
      <Path
        fill="#EA4335"
        d="M-14.754 43.989c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
        transform="translate(27.009 -39.239)"
      />
    </Svg>
  );
}

export function BlackCoffeeCardIconSVG(props) {
  return (
    <Svg
      width={672}
      height={447}
      viewBox="0 0 672 447"
      fill="#cdb891"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M152 67.5h419c48.325 0 87.5 39.175 87.5 87.5v191c0 48.325-39.175 87.5-87.5 87.5H152c-48.325 0-87.5-39.175-87.5-87.5V155c0-48.325 39.175-87.5 87.5-87.5z"
        fill="#cdb891"
        stroke="#000"
        strokeWidth={27}
      />
      <Path
        d="M101 13.5h419c48.325 0 87.5 39.175 87.5 87.5v191c0 48.325-39.175 87.5-87.5 87.5H101c-48.325 0-87.5-39.175-87.5-87.5V101c0-48.325 39.175-87.5 87.5-87.5z"
        fill="#cdb891"
        stroke="#000"
        strokeWidth={27}
      />
      <Path
        d="M125.9 307.284h111.976c5.576 0 10.302-4.068 11.085-9.536l21.018-146.063h12.687v-22.228h-15.475l-19.305-38.31C245.994 87.377 242.12 85 237.876 85H125.9a11.22 11.22 0 00-10.022 6.146l-19.293 38.311H81.11v22.228h12.687l21.018 146.063c.783 5.468 5.509 9.536 11.085 9.536zm116.656-122.256H121.22l-4.804-33.343h130.933l-4.793 33.343zM135.609 285.056l-4.804-33.343H232.96l-4.804 33.343h-92.547zm-2.789-177.828h98.136l11.197 22.229h-120.53l11.197-22.229z"
        fill="#000"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M502.726 108.379c4.487 1.248 7.591 5.298 7.61 9.92.117.295.119.47.119.47s-.05 39.587-47.274 76.029c-17.557 13.545-32.985 34.839-38.834 55.599-1.145 4.013-4.588 6.958-8.751 7.501-4.165.538-8.256-1.43-10.402-5.012-12.068-20.832-22.301-54.846.691-94.419 22.41-38.565 63.331-58.733 96.841-50.088zM441.047 284.086c-4.623-1.263-7.835-5.429-7.855-10.189-.119-.167-.122-.263-.122-.263s.049-39.587 47.274-76.028c17.721-13.674 33.272-35.243 38.994-56.187 1.085-3.908 4.406-6.799 8.455-7.354 4.043-.554 8.032 1.334 10.14 4.805 12.244 20.758 22.942 55.074-.294 95.066-22.355 38.472-63.129 58.634-96.592 50.15zM382.264 283.348c4.618-.058 8.636-3.146 9.851-7.561.202-.305.255-.5.255-.5s10.302-38.31-25.907-85.702c-13.418-17.563-22.77-42.025-23.067-63.561-.08-4.214-2.675-7.976-6.614-9.576a10.724 10.724 0 00-11.491 2.221c-17.075 17.084-35.694 47.291-23.816 91.316 11.629 43.109 46.039 73.158 80.789 73.363zm24.092-23.03c4.113 2.336 7.494 3.315 12.362 2.494-2.054 4.867-5.096 8.466-8.005 11.023a4.204 4.204 0 01-4.628.358 4.121 4.121 0 01-2.107-4.099c.133-2.652.775-5.804 2.378-9.776zm18.311-134.615c-38.332 27.866-38.629 68.77-40.184 66.734-36.209-47.397-26.56-86.859-26.56-86.859l.154-.569c1.215-4.414 5.201-7.53 9.819-7.66 20.589.241 41.071 10.801 56.771 28.354z"
        fill="#000"
      />
    </Svg>
  );
}
export function ColoredCoffeeCardIconSVG(props) {
  return (
    <Svg
      width={672}
      height={447}
      viewBox="0 0 672 447"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M152 67.5h419c48.325 0 87.5 39.175 87.5 87.5v191c0 48.325-39.175 87.5-87.5 87.5H152c-48.325 0-87.5-39.175-87.5-87.5V155c0-48.325 39.175-87.5 87.5-87.5z"
        fill="#FFEBD5"
        stroke="url(#paint0_linear_5_119)"
        strokeWidth={27}
      />
      <Path
        d="M101 13.5h419c48.325 0 87.5 39.175 87.5 87.5v191c0 48.325-39.175 87.5-87.5 87.5H101c-48.325 0-87.5-39.175-87.5-87.5V101c0-48.325 39.175-87.5 87.5-87.5z"
        fill="#F8DFC2"
        stroke="url(#paint1_linear_5_119)"
        strokeWidth={27}
      />
      <Path
        d="M125.9 307.284h111.976c5.576 0 10.302-4.068 11.085-9.536l21.018-146.063h12.687v-22.228h-15.475l-19.305-38.31C245.994 87.377 242.12 85 237.876 85H125.9a11.22 11.22 0 00-10.022 6.146l-19.293 38.311H81.11v22.228h12.687l21.018 146.063c.783 5.468 5.509 9.536 11.085 9.536zm116.656-122.256H121.22l-4.804-33.343h130.933l-4.793 33.343zM135.609 285.056l-4.804-33.343H232.96l-4.804 33.343h-92.547zm-2.789-177.828h98.136l11.197 22.229h-120.53l11.197-22.229z"
        fill="#2E1E07"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M502.726 108.379c4.487 1.248 7.591 5.298 7.61 9.92.117.295.119.47.119.47s-.05 39.587-47.274 76.029c-17.557 13.545-32.985 34.839-38.834 55.599-1.145 4.013-4.588 6.958-8.751 7.501-4.165.538-8.256-1.43-10.402-5.012-12.068-20.832-22.301-54.846.691-94.419 22.41-38.565 63.331-58.733 96.841-50.088zM441.047 284.086c-4.623-1.263-7.835-5.429-7.855-10.189-.119-.167-.122-.263-.122-.263s.049-39.587 47.274-76.028c17.721-13.674 33.272-35.243 38.994-56.187 1.085-3.908 4.406-6.799 8.455-7.354 4.043-.554 8.032 1.334 10.14 4.805 12.244 20.758 22.942 55.074-.294 95.066-22.355 38.472-63.129 58.634-96.592 50.15z"
        fill="#2E1E07"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M382.264 283.348c4.618-.058 8.636-3.146 9.851-7.561.202-.305.255-.5.255-.5s10.302-38.31-25.907-85.702c-13.418-17.563-22.77-42.025-23.067-63.561-.08-4.214-2.675-7.976-6.614-9.576a10.724 10.724 0 00-11.491 2.221c-17.075 17.084-35.694 47.291-23.816 91.316 11.629 43.109 46.039 73.158 80.789 73.363zm24.092-23.03c4.113 2.336 7.494 3.315 12.362 2.494-2.054 4.867-5.096 8.466-8.005 11.023a4.204 4.204 0 01-4.628.358 4.121 4.121 0 01-2.107-4.099c.133-2.652.775-5.804 2.378-9.776zm18.311-134.615c-38.332 27.866-38.629 68.77-40.184 66.734-36.209-47.397-26.56-86.859-26.56-86.859l.154-.569c1.215-4.414 5.201-7.53 9.819-7.66 20.589.241 41.071 10.801 56.771 28.354z"
        fill="#80592C"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_5_119"
          x1={361.5}
          y1={54}
          x2={361.5}
          y2={447}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.106966} stopColor="#322107" />
          <Stop offset={1} stopColor="#D1A26B" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_5_119"
          x1={310.5}
          y1={0}
          x2={310.5}
          y2={393}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.106966} stopColor="#322107" />
          <Stop offset={1} stopColor="#D1A26B" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export function CoffeeCupIcon(props) {
  return (
    <Svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        id="Vector"
        d="M4 20h6.943m0 0h.114m-.114 0h.114m-.114 0A7 7 0 014 13V8.923c0-.51.413-.923.923-.923h12.154c.51 0 .923.413.923.923V9m-6.943 11H18m-6.943 0A7 7 0 0018 13m0-4h1.5a2.5 2.5 0 010 5H18v-1m0-4v4M15 3l-1 2m-2-2l-1 2M9 3L8 5"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Background(props) {
  <Svg
    viewBox="0 0 450 900"
    width={450}
    height={900}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="#6a320e" d="M0 0H450V900H0z" />
    <Defs>
      <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="30%" stopColor="#daa45a" />
        <Stop offset="70%" stopColor="#daa45a" />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="30%" stopColor="#daa45a" />
        <Stop offset="70%" stopColor="#6a320e" />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="30%" stopColor="#daa45a" />
        <Stop offset="70%" stopColor="#daa45a" />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="30%" stopColor="#6a320e" />
        <Stop offset="70%" stopColor="#daa45a" />
      </LinearGradient>
    </Defs>
    <Path
      d="M0 360c-28.9-14.8-57.7-29.6-85.7-40.3-27.9-10.7-54.9-17.3-83.8-26.1s-59.6-19.8-85.1-39c-25.4-19.3-45.5-46.9-52.8-77.1-7.3-30.2-1.8-62.9-8.5-92.9-6.6-30-25.3-57.3-44.1-84.6H0z"
      fill="#a26832"
      transform="translate(450)"
    />
    <Path
      d="M0 180c-14.4-7.4-28.9-14.8-42.8-20.1-14-5.4-27.5-8.7-41.9-13.1-14.5-4.4-29.9-9.9-42.6-19.5-12.7-9.7-22.8-23.5-26.4-38.5-3.7-15.1-.9-31.5-4.2-46.5-3.3-15-12.7-28.6-22.1-42.3H0z"
      fill="#daa45a"
      transform="translate(450)"
    />
    <G>
      <Path
        d="M0-360c30.8 5.9 61.5 11.9 90.6 21.9 29.1 10.1 56.4 24.2 81.4 40.2 25 16 47.5 33.9 73.4 52.5 25.8 18.7 55 38.1 66.4 65.4 11.3 27.3 4.8 62.5 9.9 93.8 5 31.3 21.7 58.8 38.3 86.2H0z"
        fill="#a26832"
        transform="translate(0 900)"
      />
      <Path
        d="M0-180c15.4 3 30.8 5.9 45.3 11 14.5 5 28.2 12 40.7 20 12.5 8 23.7 17 36.7 26.3 12.9 9.3 27.5 19 33.2 32.7 5.7 13.7 2.4 31.2 4.9 46.9C163.4-27.4 171.7-13.7 180 0H0z"
        fill="#daa45a"
        transform="translate(0 900)"
      />
    </G>
  </Svg>;
}

export function ColoredHome(props) {
  return (
    <Svg
      width={524}
      height={465}
      viewBox="0 0 524 465"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M242.553 27.178l.004-.004a29.777 29.777 0 0138.771 0l.005.005 157.698 135.148.256.219.263.211 61.899 49.529a4.887 4.887 0 011.807 3.283 4.893 4.893 0 01-2.505 4.829 4.908 4.908 0 01-3.725.413 4.903 4.903 0 01-1.696-.879l-.002-.002-21.778-17.423-32.494-25.995v238.71A29.78 29.78 0 01411.277 445h-79.556V340.554a69.778 69.778 0 00-139.557 0V445h-79.556a29.777 29.777 0 01-29.779-29.778V176.487l-32.494 25.995-21.778 17.423-.25.2-.243.208a4.884 4.884 0 01-3.635 1.149 4.897 4.897 0 01-3.355-1.81 4.884 4.884 0 01-.413-5.512 4.876 4.876 0 011.292-1.454l.244-.184.238-.191 61.9-49.529.264-.211.256-.22L242.553 27.178z"
        fill="#F8DFC2"
        stroke="url(#paint0_linear_9_18)"
        strokeWidth={40}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_9_18"
          x1={261.643}
          y1={0}
          x2={261.643}
          y2={465}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#322107" />
          <Stop offset={0.9999} stopColor="#D1A26B" />
          <Stop offset={1} stopColor="#322107" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export const CupTop = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="150mm"
    height="150mm"
    viewBox="0 0 150 150"
    {...props}
  >
    <ellipse
      cx={70.652}
      cy={80.281}
      rx={70.652}
      ry={69.719}
      style={{
        fill: "#faebdc",
        fillOpacity: 1,
        strokeWidth: 4.80901,
        strokeLinecap: "square",
        paintOrder: "stroke fill markers",
      }}
    />
    <ellipse
      cx={68.176}
      cy={80.281}
      rx={56.553}
      ry={55.806}
      style={{
        fill: "#392400",
        fillOpacity: 1,
        strokeWidth: 3.84937,
        strokeLinecap: "square",
        paintOrder: "stroke fill markers",
      }}
    />
    <ellipse
      cx={70.652}
      cy={84.707}
      rx={53.899}
      ry={50.831}
      style={{
        fill: "#513200",
        fillOpacity: 1,
        strokeWidth: 3.58652,
        strokeLinecap: "square",
        paintOrder: "stroke fill markers",
      }}
    />
    <path
      d="M122.779 16.557a15.997 15.997 45.38 0 1 15.89 16.103v12.115h-31.993V32.66a16.102 16.102 135 0 1 16.103-16.103z"
      style={{
        fill: "#faebdc",
        fillOpacity: 1,
        strokeWidth: 3,
        strokeLinecap: "square",
        paintOrder: "stroke fill markers",
      }}
      transform="matrix(.90342 .81073 -1.09498 1.12928 52.113 -114.037)"
    />
  </svg>
);

export function Bean(props) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 12.7 12.7"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
    >
      <Ellipse
        cx={-1.0828692}
        cy={8.977788}
        rx={6.7433648}
        ry={4.6524749}
        transform="matrix(.66213 -.7494 .78709 .61684 0 0)"
        fill={props.fill}
        fillOpacity={1}
        stroke="#000"
        strokeWidth={1.11564}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="none"
        strokeOpacity={1}
        paintOrder="stroke fill markers"
      />
      <Path
        d="M9.62 3.037c-1.606.58-2.922 1.453-3.27 3.303C6 8.19 3.09 9.643 3.09 9.643"
        fill="none"
        fillOpacity={1}
        stroke="#000"
        strokeWidth={0.891539}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="none"
        strokeOpacity={1}
        paintOrder="stroke fill markers"
      />
    </Svg>
  );
}

// export function FrontLogo(props) {
//   return (
//     <Svg
//       width="135mm"
//       height="134mm"
//       viewBox="0 0 135 134"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <Defs>
//         <LinearGradient id="b">
//           <Stop offset={0.78438032} stopColor="#784421" stopOpacity={1} />
//           <Stop offset={1} stopColor="#784421" stopOpacity={0} />
//         </LinearGradient>
//         <LinearGradient id="a">
//           <Stop offset={0} stopColor="#fafafa" stopOpacity={1} />
//           <Stop offset={1} stopColor="#fafafa" stopOpacity={0} />
//         </LinearGradient>
//         <Path
//           id="d"
//           d="M146.01881 408.07047H710.5379800000001V850.03815H146.01881z"
//         />
//         <RadialGradient
//           xlinkHref="#a"
//           cx={69.508705}
//           cy={51.468655}
//           fx={69.508705}
//           fy={51.468655}
//           r={37.040024}
//           gradientUnits="userSpaceOnUse"
//           gradientTransform="translate(-1.907 14.598)"
//         />
//         <RadialGradient
//           xlinkHref="#b"
//           id="c"
//           cx={69.508705}
//           cy={51.468655}
//           fx={69.508705}
//           fy={51.468655}
//           r={37.459053}
//           gradientUnits="userSpaceOnUse"
//           gradientTransform="translate(-1.907 14.598)"
//         />
//       </Defs>
//       <Path
//         d="M40.88 143.843h12.618v18.848H40.88a9.834 9.834 45 01-9.834-9.834 9.433 9.433 137.493 019.834-9.014z"
//         transform="matrix(.79662 .59144 -.59144 .79662 75.483 -114.295)"
//         display="inline"
//         fill="#f9f9f9"
//         strokeWidth={1.159}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         paintOrder="stroke fill markers"
//       />
//       <Circle
//         cx={67.602097}
//         cy={66.067101}
//         r={51.224739}
//         display="inline"
//         fill="#f9f9f9"
//         strokeWidth={1.159}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         paintOrder="stroke fill markers"
//       />
//       <Circle
//         cx={67.602097}
//         cy={66.067101}
//         r={42.952999}
//         display="inline"
//         fill="#502d16"
//         strokeWidth={0.971845}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         paintOrder="stroke fill markers"
//       />
//       <Circle
//         cx={67.602097}
//         cy={66.067101}
//         r={37.040024}
//         display="inline"
//         fill="url(#c)"
//         stroke="url(#radialGradient4)"
//         strokeWidth={0.838059}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         paintOrder="stroke fill markers"
//       />
//       <Text
//         xmlSpace="preserve"
//         transform="matrix(.5391 0 0 .52775 -164.71 -184.248)"
//         style={{
//           lineHeight: 1,
//           InkscapeFontSpecification: "'Inter Heavy'",
//           textAlign: "center",
//           whiteSpace: "pre",
//           shapeInside: "url(#d)",
//         }}
//         fontWeight={900}
//         fontSize="133.333px"
//         fontFamily="Inter"
//         letterSpacing={0}
//         wordSpacing={0}
//         display="inline"
//         fill="#e9c6af"
//         stroke="none"
//         strokeWidth={4.38047}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeOpacity={1}
//         paintOrder="stroke fill markers"
//       >
//         <TSpan x={360.27846} y={514.7993}>
//           <TSpan
//             style={{
//               InkscapeFontSpecification: "Lobster",
//             }}
//             fontWeight={400}
//             fontFamily="Lobster"
//           >
//             {"LB"}
//           </TSpan>
//         </TSpan>
//       </Text>
//     </Svg>
//   );
// }

// export function BackLogo(props) {
//   return (
//     <Svg
//       width="135mm"
//       height="134mm"
//       viewBox="0 0 135 134"
//       id="svg1"
//       inkscape:export-filename="frontlogo.svg"
//       inkscape:export-xdpi={96}
//       inkscape:export-ydpi={96}
//       inkscape:version="1.3.1 (91b66b0783, 2023-11-16)"
//       sodipodi:docname="frontlogo.svg"
//       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
//       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
//       xmlns="http://www.w3.org/2000/svg"
//       xmlns:svg="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <Defs id="defs1" />
//       <G inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
//         <Path
//           sodipodi:type="star"
//           id="path6"
//           inkscape:flatsided="false"
//           sodipodi:sides={22}
//           sodipodi:cx={-46.831657}
//           sodipodi:cy={-48.295147}
//           sodipodi:r1={77.713036}
//           sodipodi:r2={65.278954}
//           sodipodi:arg1={0.87961724}
//           sodipodi:arg2={1.0224169}
//           inkscape:rounded={0.09}
//           inkscape:randomized={0}
//           transform="matrix(0.85562766,-0.01359348,0.01346922,0.86352072,108.22096,108.06725)"
//           display="inline"
//           fill="#89cff0"
//           fillOpacity={1}
//           stroke="none"
//           strokeWidth={6.51499}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeDasharray="none"
//           strokeOpacity={1}
//           paintOrder="stroke fill markers"
//         />
//       </G>
//     </Svg>
//   );
// }
