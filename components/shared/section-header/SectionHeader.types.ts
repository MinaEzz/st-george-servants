import { Href } from "expo-router";
import React from "react";

export default interface ISectionHeaderProps {
  icon?: React.ReactElement<{ size?: number; color?: string }>;
  title: string;
  viewAllHref?: Href;
}
