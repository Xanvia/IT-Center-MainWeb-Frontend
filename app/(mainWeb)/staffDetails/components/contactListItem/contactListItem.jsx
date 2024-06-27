import Link from "next/link";
import Image from "next/image";
import styles from './contactListItem.module.css';

export default function ContactListItem(props) {
  return (
    <div className="flex flex-col items-center space-y-2 p-4">
      <h2 className="text-lg font-semibold">{props.post}</h2>
      <div className={`${styles.circleContainer}`}>
        <Link href={props.infoLink}>
          <Image 
            src={props.path} 
            alt={`${props.name}'s avatar`} 
            width={112} 
            height={112} 
            className={styles.circleImage} 
          />
        </Link>
      </div>
      <div className="flex flex-col items-start space-y-1">
        <h3 className="text-black hover:text-gray-300 m-0">{props.name}</h3>
        <h3 className="text-black hover:text-gray-300 m-0">{props.degree}</h3>
        <h3 className="text-black hover:text-gray-300 m-0">{props.contactNo}</h3>
      </div>
    </div>
  );
}
