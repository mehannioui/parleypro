'use client';

import { useRouter } from 'next/router';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!router.isReady) return; // Add this line

    const { error } = trpc.authCallback.useQuery(undefined, {
      retry: true,
      retryDelay: 500,
    });

    // Handle error cases in the component body
    if (error?.data?.code === 'UNAUTHORIZED') {
      router.push('/sign-in');
    }
  }, [router.isReady]); // Modify this line

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
