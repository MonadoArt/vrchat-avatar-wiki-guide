import {
  ModelIcon,
  PrefabIcon,
  PrefabModelIcon,
  PrefabVariantIcon,
  SceneIcon,
  UnityPackage,
  UnityPackageIcon,
} from './UnityIcon';
import styles from './UnityIconReference.module.css';

const ICONS = [
  { label: 'SceneIcon', element: <SceneIcon /> },
  { label: 'PrefabIcon', element: <PrefabIcon /> },
  { label: 'ModelIcon', element: <ModelIcon /> },
  { label: 'PrefabModelIcon', element: <PrefabModelIcon /> },
  { label: 'PrefabVariantIcon', element: <PrefabVariantIcon /> },
  { label: 'UnityPackageIcon', element: <UnityPackageIcon /> },
];

export const UnityIconReference = () => (
  <>
    <div className={styles.list}>
      {ICONS.map(({ label, element }) => (
        <div key={label} className={styles.item}>
          {element}
          <code className={styles.code}>{`<${label} />`}</code>
        </div>
      ))}
    </div>

    <div className={styles.packageExample}>
      Save your <UnityPackage /> file somewhere you can find it.
    </div>
  </>
);
