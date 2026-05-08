import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Home',
      customProps: { svgIcon: '/img/sidebar-icons/home.svg' },
    },
    {
      type: 'category',
      label: 'How to Upload',
      className: 'no-frame',
      collapsible: true,
      collapsed: false,
      customProps: { svgIcon: '/img/sidebar-icons/upload.svg' },
      items: [
        'upload/installation',
        'upload/unity-basics',
        'upload/importing',
        'upload/uploading',
      ],
    },
    {
      type: 'category',
      label: 'Customizing',
      className: 'no-frame',
      collapsible: true,
      collapsed: true,
      customProps: { svgIcon: '/img/sidebar-icons/palette.svg' },
      items: ['customizing/index'],
    },
    // {
    //   type: 'category',
    //   label: 'Updating',
    //   collapsible: true,
    //   collapsed: true,
    //   customProps: { svgIcon: '/img/sidebar-icons/update.svg' },
    //   items: ['updating'],
    // },
    // {
    //   type: 'category',
    //   label: 'Troubleshooting',
    //   collapsible: true,
    //   collapsed: true,
    //   customProps: { svgIcon: '/img/sidebar-icons/troubleshoot.svg' },
    //   items: ['troubleshooting'],
    // },
    {
      type: 'doc',
      label: 'Updating',
      id: 'updating',
      customProps: { svgIcon: '/img/sidebar-icons/update.svg' },
    },
    {
      type: 'doc',
      label: 'Troubleshooting',
      id: 'troubleshooting',
      customProps: { svgIcon: '/img/sidebar-icons/troubleshoot.svg' },
    },
    {
      type: 'category',
      label: 'Info',
      collapsible: false,
      items: [
        {
          type: 'link',
          label: 'Blog',
          href: '/blog',
        },
        'style_reference',
      ],
    },
  ],
};

export default sidebars;
