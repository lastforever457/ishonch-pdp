import { CSSProperties } from 'react';
import RingLoader from 'react-spinners/RingLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export const CustomLoader = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center lg:h-[calc(100vh-100px)]">
      <span>
        <RingLoader
          color={'var(--theme-color)'}
          cssOverride={override}
          size={80}
          className="text-primary-blue"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </span>
    </div>
  );
};
