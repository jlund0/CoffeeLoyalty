import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

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
export function CoffeeIconSVG(props) {
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 1024 1024"
    width={24}
    height={24}
    {...props}
  >
    <Path d="M57 526c0-102.83-.01-205.159.006-307.488.003-23.845 14.378-42.295 37.296-47.958 4.398-1.086 8.91-1.157 13.402-1.158 254.657-.014 509.314.08 763.971-.146 27.495-.024 45.466 17.827 49.792 37.696.898 4.122.73 8.288.752 12.44.068 12.665.217 25.336-.084 37.995-.102 4.29 1.283 5.205 5.302 5.103 8.822-.224 17.686-.323 26.481.281 24.14 1.66 43.127 21.75 43.152 45.94.12 119.496.076 238.991.087 358.487.004 33.165-.69 66.35.222 99.49.706 25.683-20.345 49.428-49.564 49.41-255.49-.158-510.98-.08-766.47-.108-28.684-.003-49.335-20.838-49.347-49.53-.005-13.167-.127-26.335.087-39.498.055-3.372-1-4-4.147-4.045-10.31-.147-20.671 1.02-30.93-.732-23.343-3.986-39.942-23.467-39.983-47.188C56.941 625.494 57 575.997 57 526z" />
    <Path
      fill="#FEFEFE"
      d="M136 663c-5.665 0-10.834-.117-15.995.053-2.382.078-3.396-.612-3.045-3.045.118-.816.019-1.663.019-2.497 0-140.805.037-281.61-.145-422.415-.007-5.323 1.592-6.033 6.328-6.031 244.45.115 488.902.118 733.353-.017 5.002-.003 6.269 1.106 6.263 6.206a196203.21 196203.21 0 0 0-.009 421.915c.005 4.787-1.066 5.954-5.913 5.95-240.118-.135-480.237-.118-720.855-.118z"
    />
    <Path
      fill="#FCFCFC"
      d="M922.637 321.86c4.965.355 11.322-1.341 13.833 1.032 3.19 3.016 1.033 9.442 1.035 14.38.058 137.638.019 275.276.164 412.913.005 4.796-1.084 5.941-5.918 5.938-244.782-.135-489.563-.133-734.345-.006-4.611.002-5.787-1.202-5.576-5.667.377-7.98.238-15.995.036-23.988-.073-2.903.87-3.876 3.628-3.488.98.137 1.997.022 2.996.022 224.453 0 448.906.003 673.358-.004 25.24-.001 44.117-14.411 49.625-37.834 1.041-4.426.743-8.949.744-13.434.022-114.142.017-228.285.019-342.427 0-2 .022-4 .06-6.44.025-.708.024-.975.34-.997z"
    />
    <Path
      fill="#404040"
      d="M922.926 321.629c.027.475-.195.82-.4.803-.205-19.108-.205-38.2-.205-57.292l.578-.003c0 18.672 0 37.345.027 56.492z"
    />
    <Path
      fill="#010101"
      d="M432.936 276.927c15.938 7.385 27.417 19.264 37.048 33.096 14.794 21.25 24.34 44.871 31.006 69.755.375 1.398.815 2.778 1.345 4.575 7.409-6.464 14.595-12.623 22.26-18.178 27.002-19.57 56.601-33.454 89.442-39.715 18.54-3.534 37.091-3.916 54.758 4.528 9.867 4.717 17.47 11.974 23.575 20.978 1.595 2.351 1.641 4.266.572 6.858-18.493 44.827-48.796 78.307-93.457 98.313-24.03 10.765-47.193 23.056-67.087 40.721-24.371 21.64-42.771 47.734-57.157 76.758-2.091 4.218-3.762 4.963-7.314 2.04-2.79-2.297-5.82-6.128-8.65-6.047-2.915.083-5.668 4.145-8.58 6.35-15.345 11.622-32.213 17.535-51.763 14.422-3.779-.602-4.84-2.581-5.9-5.516-19.46-53.846-20.632-107.573.383-161.38 7.325-18.753 13.106-37.977 14.809-58.26 2.514-29.945-2.46-58.687-13.484-86.435-1.859-4.679-.634-5.862 3.617-6.64 11.794-2.162 23.181-1.049 34.577 3.777z"
    />
    <Path
      fill="#010101"
      d="M282.34 518.608c-15.944-38.75-17.959-78.47-11.628-119.027 4.864-31.154 15.757-60.013 33.018-86.366 10.739-16.394 23.776-30.444 42.735-37.594 10.061-3.795 20.419-4.359 30.966-2.557 3.3.564 5.39 1.972 6.813 5.42 12.365 29.945 17.823 60.845 13.86 93.206-2.243 18.31-8.299 35.575-14.573 52.73-10.997 30.062-16.755 60.851-14.582 92.954 1.57 23.209 6.124 45.797 13.993 67.67 1.453 4.038.657 5.311-3.449 6.063-22.556 4.13-41.609-3.133-58.507-17.589-17.442-14.92-29.394-33.738-38.647-54.91zM538.91 504.897c19.073-17.075 41.02-28.82 63.878-38.942 31.99-14.165 58.107-35.312 77.835-64.241 7.598-11.142 14.12-22.91 19.26-35.379 1.329-3.224 2.428-3.257 5.103-1.535 19.074 12.278 26.967 30.519 27.888 52.349.967 22.921-5.181 44.47-13.893 65.313-22.455 53.721-58.534 95.16-111.432 120.649-25.784 12.423-53.164 18.23-81.893 13.982-17.994-2.66-32.875-11.155-43.836-26.03-1.762-2.392-2.136-4.335-.797-7.17 14.158-29.964 32.588-56.77 57.887-78.996z"
    />
  </Svg>;
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
