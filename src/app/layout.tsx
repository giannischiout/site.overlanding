import React from "react";
import "./styles.css";
import "simplebar-react/dist/simplebar.min.css";
import { satoshi } from "src/app/fonts/satoshi";
import { Nav } from "@/components/nav";

export const metadata = {
  description: "Rent 4x4s, campervans and overland vehicles for your trip around Iceland.",
  title: "Aurora Campers",
  // Icons come from favicon.ico, icon.svg and apple-icon.png in this folder
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body className={satoshi.variable}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
