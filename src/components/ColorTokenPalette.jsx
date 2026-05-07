import React, { useEffect, useState } from 'react';

const TOKENS = [
  '--xeno-brown-dark',
  '--xeno-beige-light',
  '--xeno-beige-mid',
  '--xeno-green-monado',
  '--xeno-dark-green-monado',
  '--xeno-orange-header',
  '--xeno-brown-menu',
  '--xeno-metallic-yellow',
  '--xeno-frame-dark',
  '--xeno-scrollbar-track',
  '--xeno-rivet-bright',
  '--xeno-rivet-dark',
];

function readTokens() {
  const styles = getComputedStyle(document.body);
  return TOKENS.map((name) => ({
    name,
    value: styles.getPropertyValue(name).trim(),
  }));
}

export default function ColorTokenPalette() {
  const [tokens, setTokens] = useState(() =>
    TOKENS.map((name) => ({ name, value: '' })),
  );

  useEffect(() => {
    setTokens(readTokens());
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1rem 0' }}>
      {tokens.map((token) => (
        <div
          key={token.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0,0,0,0.25)',
            padding: '0.4rem 0.75rem',
            borderRadius: '0.4rem',
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '0.25rem',
              background: token.value || 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--xeno-green-monado)' }}>
              {token.name}
            </div>
            <div style={{ fontSize: '0.7rem', opacity: 0.6, fontFamily: 'monospace' }}>
              {token.value || 'loading...'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
