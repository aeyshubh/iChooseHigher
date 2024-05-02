import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'link',
      label: 'Add Higher Balance Checker',
      target:
        `https://warpcast.com/~/add-cast-action?postUrl=https://i-choose-higher.vercel.app/api/action&name=⬆️stats by @heyshubh&icon=graph&actionType=post`,

    },
    {
      action: 'link',
      label: 'Follow me 🏄',
      target:
        'https://warpcast.com/heyshubh',

    }
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/higher.webp`,
    aspectRatio: '1.91:1',
  } 
});

export const metadata: Metadata = {
  title: 'Higher Balance Checker build with ❤️ by @heyshubh',
  description: 'A based Higher Balance Checker for the based OGs',
  openGraph: {
    title: 'Higher Balance Checker',
    description: 'A based Higher Balance Checker for the based OGs',
    images: `${NEXT_PUBLIC_URL}/higher.webp`,
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>A based Voyagers Checker for the based OGs</h1>
      <h2>I Choose Higher !</h2>
      <h2>Build with ❤️ by @heyshubh</h2>
    </>
  );
}


