import * as cx from 'classnames';
import * as React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import DraggableHandle from './DraggableHandle';

interface Props {
  id: string;
  index: number;
  label: string;
}

const DraggableListItem: React.SFC<Props> = (props: Props) => (
  <Draggable draggableId={props.id} index={props.index}>
    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
      <div
        className={cx('listItem', { 'isDragging': snapshot.isDragging })}
        key={props.id}
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <DraggableHandle {...provided.dragHandleProps} />
        {props.label}
      </div>
    )}
  </Draggable>
);

export default DraggableListItem