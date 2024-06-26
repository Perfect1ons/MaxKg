import { useRouter } from 'next/navigation';
import styles from './style.module.scss';

interface BrandCardProps {
  name: string;
  link: number;
}

const BrandCard: React.FC<BrandCardProps> = ({ name, link }) => {
    const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/brands/${name}-${link}`)}
      className={styles.brand__card}
    >
      <h3 className={styles.brand__card_title}>{name}</h3>
    </div>
  );
};

export default BrandCard;
