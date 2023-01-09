import Head from 'next/head'
import styles from '@/styles/home.module.css'

const PageWrapper = ({ title, children }) => (
  <div className={styles.main}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className={styles.header}>
      <h2>Blank Header</h2>
    </header>
    {children}
    <footer className={styles.footer}>
      <h2>Blank Footer</h2>
    </footer>
  </div>
)

PageWrapper.defaultProps = {
  wrapperClassName: 'bg-gray-900 text-gray-200',
  liteHeader: false,
}

export default PageWrapper
