import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function CustomSkeleton({ variant = "text" }) {
  const skeletonProps = {
    text: { variant: "text", sx: { fontSize: '1rem' } },
    circular: { variant: "circular", width: 40, height: 40 },
    rectangular: { variant: "rectangular", width: 210, height: 60 },
    rounded: { variant: "rounded", width: 210, height: 60 },
  };

  const props = skeletonProps[variant];

  return (
    <Stack spacing={1}>
      {props && <Skeleton {...props} />}
    </Stack>
  );
}
