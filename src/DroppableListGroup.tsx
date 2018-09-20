import * as cx from 'classnames';
import * as React from 'react';
import { DraggableProvidedDragHandleProps, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';

interface Props {
  children: React.ReactNode;
  handleProps: DraggableProvidedDragHandleProps | null;
  id: string;
  title: string;
}

const DroppableListGroup: React.SFC<Props> = (props: Props) => {
  return (
    <Droppable droppableId={props.id} type="listGroupItem">
      {
        (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            className={cx('listGroup', { 'isDraggingOver': snapshot.isDraggingOver })}
          >
            <h1 {...props.handleProps}>{props.title}</h1>
            <div
              className="droppable-area"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.children}
              {provided.placeholder}
            </div>
          </div>
        )
      }
    </Droppable>
  );
}

export default DroppableListGroup;
