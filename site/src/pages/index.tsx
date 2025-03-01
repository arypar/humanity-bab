import type { NextPage } from 'next';
import Head from 'next/head';
import Dashboard from '@/components/ui/Dashboard';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>give.fun - Crypto Donations</title>
        <meta
          content="Tax-deductible crypto donations platform"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <Dashboard />
      </main>
    </>
  );
};

export default Home;
