export const VCC_PACKAGE_GROUPS = {
  mandatory: [
    {
      id: 'vrcfury',
      name: 'VRCFury',
      description: "Automatically sets up complex avatar features so you don't have to do it manually.",
      url: 'vcc://vpm/addRepo?url=https%3A%2F%2Fvcc.vrcfury.com',
      fallback: 'https://vcc.vrcfury.com',
      iconPath: '/img/vpm/vrcf.png',
      installTagline: '(Required) - Used to put the avatar together.',
      installNote: null,
    },
    {
      id: 'poiyomi',
      name: 'Poiyomi Toon',
      description: "The shader used for the avatar's materials. Without it, the avatar will appear completely pink.",
      url: 'vcc://vpm/addRepo?url=https%3A%2F%2Fpoiyomi.github.io/vpm/index.json',
      fallback: 'https://poiyomi.github.io/vpm/index.json',
      iconPath: '/img/vpm/poiyomi.png',
      installTagline: '(Required) - Used for shaders',
      installNote: "Make sure you pick Toon, not Pro! - Pro is paid and won't work if you don't own it!",
    },
  ],
  optional: [
    {
      id: 'facetracking',
      name: "ADJerry's Face Tracking Templates",
      installName: "VRCFT - Jerry's Templates",
      description: 'Adds face tracking support to the avatar.',
      url: 'vcc://vpm/addRepo?url=https://Adjerry91.github.io/VRCFaceTracking-Templates/index.json',
      fallback: 'https://Adjerry91.github.io/VRCFaceTracking-Templates/index.json',
      iconPath: '/img/vpm/facetracking.png',
      installTagline: '(Optional) - Used for Face Tracking',
      installNote: null,
    },
    {
      id: 'gogoloco',
      name: 'GoGoLoco',
      description: 'Adds movement options like sitting and laying down anywhere in VRChat.',
      url: 'vcc://vpm/addRepo?url=https://Spokeek.github.io/goloco/index.json',
      fallback: 'https://Spokeek.github.io/goloco/index.json',
      iconPath: '/img/vpm/gogoloco.png',
      installTagline: '(Optional) - Used for flight and body poses without FullBody Tracking',
      installNote: null,
    },
  ],
};

export const VCC_PACKAGES = [
  ...VCC_PACKAGE_GROUPS.mandatory,
  ...VCC_PACKAGE_GROUPS.optional,
];
