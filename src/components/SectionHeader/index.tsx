import React from 'react';

type Props = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
};

export default function SectionHeader({ children, level = 2 }: Props) {
  const Tag = `h${level}` as const;
  return <Tag className="section-header">{children}</Tag>;
}
