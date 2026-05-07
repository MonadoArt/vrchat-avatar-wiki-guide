import {type ComponentType, type SVGProps} from 'react';
// @ts-ignore
import HomeSvg from '@site/static/img/sidebar-icons/home.svg';
// @ts-ignore
import PaletteSvg from '@site/static/img/sidebar-icons/palette.svg';
// @ts-ignore
import TroubleshootSvg from '@site/static/img/sidebar-icons/troubleshoot.svg';
// @ts-ignore
import UpdateSvg from '@site/static/img/sidebar-icons/update.svg';
// @ts-ignore
import UploadSvg from '@site/static/img/sidebar-icons/upload.svg';

export const svgIconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  '/img/sidebar-icons/home.svg': HomeSvg,
  '/img/sidebar-icons/palette.svg': PaletteSvg,
  '/img/sidebar-icons/troubleshoot.svg': TroubleshootSvg,
  '/img/sidebar-icons/update.svg': UpdateSvg,
  '/img/sidebar-icons/upload.svg': UploadSvg,
};
