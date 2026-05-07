import Admonition from '@theme/Admonition';
import { LocationCard } from './LocationCard';
import styles from './TrustRankRequirement.module.css';

export const TrustRankRequirement = () => (
  <div className={styles.row}>
    <div className={styles.content}>
      <Admonition type="warning">
        Your VRChat account needs to have a <a href="https://docs.vrchat.com/docs/vrchat-safety-and-trust-system"><strong>trust rank</strong></a> of <strong>New User</strong> or above in order to be able to upload avatars! <br />
        If you just made your VRChat account you will need to play the game or <abbr title="away from keyboard">afk</abbr> in order to increase it from Visitor. Positive interactions with people (such as not getting blocked or getting friend requests) will allow you to gain trust rank faster, alternatively you can pay for VRC+ and gain New User rank immediately!
      </Admonition>
    </div>
    <div className={styles.media}>
      <LocationCard
        src="https://files.readme.io/c8af264-TrustLevels_4.png"
        title="Trust Ranks"
        topSpacing="none"
      />
    </div>
  </div>
);
