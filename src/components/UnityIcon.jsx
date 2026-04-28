import useBaseUrl from '@docusaurus/useBaseUrl';

const UnityIcon = ({ src, alt, size = 16 }) => (
  <img
    src={useBaseUrl(src)}
    alt={alt}
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      verticalAlign: 'text-bottom',
      margin: '0 2px',
      flexShrink: 0,
    }}
  />
);

export const SceneIcon    = ({ size }) => <UnityIcon src="/img/unity-icons/scene.png"         alt="Scene"          size={size} />;
export const PrefabIcon   = ({ size }) => <UnityIcon src="/img/unity-icons/prefab.png"        alt="Prefab"         size={size} />;
export const ModelIcon    = ({ size }) => <UnityIcon src="/img/unity-icons/model.png"         alt="Model"          size={size} />;
export const PrefabModelIcon   = ({ size }) => <UnityIcon src="/img/unity-icons/prefab-model.png"  alt="Prefab Model"   size={size} />;
export const PrefabVariantIcon   = ({ size }) => <UnityIcon src="/img/unity-icons/prefab-variant.png"  alt="Prefab Variant"  size={size} />;
export const UnityPackageIcon    = ({ size }) => <UnityIcon src="/img/unity-icons/unitypackage.png"   alt=".unitypackage"   size={size} />;
