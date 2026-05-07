import useBaseUrl from '@docusaurus/useBaseUrl';

const UnityIcon = ({ src, alt, size = 16, className = '', style }) => (
  <img
    src={useBaseUrl(src)}
    alt={alt}
    className={className || undefined}
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      verticalAlign: 'text-bottom',
      margin: '0 2px',
      flexShrink: 0,
      ...style,
    }}
  />
);

export const SceneIcon = (props) => <UnityIcon src="/img/unity-icons/scene.png" alt="Scene" {...props} />;
export const PrefabIcon = (props) => <UnityIcon src="/img/unity-icons/prefab.png" alt="Prefab" {...props} />;
export const ModelIcon = (props) => <UnityIcon src="/img/unity-icons/model.png" alt="Model" {...props} />;
export const PrefabModelIcon = (props) => <UnityIcon src="/img/unity-icons/prefab-model.png" alt="Prefab Model" {...props} />;
export const PrefabVariantIcon = (props) => <UnityIcon src="/img/unity-icons/prefab-variant.png" alt="Prefab Variant" {...props} />;
export const UnityPackageIcon = (props) => <UnityIcon src="/img/unity-icons/unitypackage.png" alt=".unitypackage" {...props} />;

/**
 * <UnityPackage /> — inline ".unitypackage" badge with icon.
 * Styled like an inline code element (monospace, dark background).
 *
 * Usage:  Save the <UnityPackage /> file to your Downloads folder.
 */
export const UnityPackage = ({ className = '', style, iconSize = '1.2em' }) => (
  <code
    className={className || undefined}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.2em',
      verticalAlign: 'middle',
      padding: '0em 0.1em',
      ...style,
    }}
  >
    .unitypackage
    <UnityPackageIcon size={iconSize} />
  </code>
);
