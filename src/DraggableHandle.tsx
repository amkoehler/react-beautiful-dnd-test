import * as React from 'react';

type Props = any;

const DraggableHandle: React.SFC<Props> = (props: Props) => (
  <div
    className="handle"
    {...props}
  />
);

export default DraggableHandle;
