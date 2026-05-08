import MDXComponents from '@theme-original/MDXComponents';
import { LocationCard } from '@site/src/components/LocationCard';
import {
  GaugeHeader,
  SectionBanner,
  SectionTab,
  SubSectionBanner,
} from '@site/src/components/XenoMarkers';

export default {
  ...MDXComponents,
  LocationCard,
  SectionTab,
  SectionBanner,
  SubSectionBanner,
  SubsectionBanner: SubSectionBanner,
  GaugeHeader,
};
