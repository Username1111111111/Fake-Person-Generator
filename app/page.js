import styles from "./page.module.css";
import Table from "./ui/table";

export default function Home() {
    return (
        <main className={styles.main}>
            <Table></Table>
        </main>
    );
}
