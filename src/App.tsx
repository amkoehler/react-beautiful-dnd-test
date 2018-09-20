import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { v4 } from 'uuid';

import './App.css';
import DraggableListItem from './DraggableListItem';
import DroppableListGroup from './DroppableListGroup';

interface ListGroup {
  title: string;
  listItemIds: string[];
}

// tslint:disable-next-line no-empty-interface
interface Props {}

interface State {
  listGroupOrder: string[];
  listGroups: { [key: string]: ListGroup };
}

const listItems = {
  [v4()]: { label: 'Item 1' },
  [v4()]: { label: 'Item 2' },
  [v4()]: { label: 'Item 3' },
  [v4()]: { label: 'Item 4' },
}

const listGroups: { [key: string]: ListGroup } = {
  [v4()]: {
    listItemIds: Object.keys(listItems),
    title: 'Group 1',
  },
  [v4()]: {
    listItemIds: [],
    title: 'Group 2',
  },
  [v4()]: {
    listItemIds: [],
    title: 'Group 3',
  },
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      listGroupOrder: Object.keys(listGroups),
      listGroups,
    };
  }

  public onDragEnd = (dropResult: DropResult) => {
    if (dropResult.type === 'listGroup') {
      return this.onListGroupDragEnd(dropResult);
    }

    return this.onListGroupItemDragEnd(dropResult);
  }

  public onListGroupDragEnd = (dropResult: DropResult) => {
    const { destination, source, draggableId } = dropResult;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newListGroupOrder = [...this.state.listGroupOrder];
    newListGroupOrder.splice(source.index, 1);
    newListGroupOrder.splice(destination.index, 0, draggableId);

    this.setState({
      listGroupOrder: newListGroupOrder,
    });
  }

  public onListGroupItemDragEnd = (dropResult: DropResult) => {
    const { destination, source, draggableId } = dropResult;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const newListGroup = { ...this.state.listGroups[destination.droppableId] };
      newListGroup.listItemIds.splice(source.index, 1);
      newListGroup.listItemIds.splice(destination.index, 0, draggableId);

      this.setState((prevState: State) => ({
        listGroups: {
          ...prevState.listGroups,
          [source.droppableId]: newListGroup,
        },
      }));
    } else {
      // Draggable is being moved between droppables
      const newSourceListGroup = { ...this.state.listGroups[source.droppableId] };
      const newDestinationListGroup = { ...this.state.listGroups[destination.droppableId] };
      newSourceListGroup.listItemIds.splice(source.index, 1);
      newDestinationListGroup.listItemIds.splice(destination.index, 0, draggableId);

      this.setState((prevState: State) => ({
        listGroups: {
          ...prevState.listGroups,
          [source.droppableId]: newSourceListGroup,
          [destination.droppableId]: newDestinationListGroup,
        },
      }));
    }
  }

  public render() {
    return (
      <div className="App">
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Droppable droppableId="all-listGroups" direction="horizontal" type="listGroup">
            {(provided: DroppableProvided) => (
              <div
                className="listGroups"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  this.state.listGroupOrder.map((id: string, i: number) => {
                    const listGroup = this.state.listGroups[id];
                    return (
                      <Draggable draggableId={id} index={i} key={id}>
                        {(providedDraggable: DraggableProvided) => (
                          <div
                            className="listGroupDraggable"
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                          >
                            <DroppableListGroup
                              id={id}
                              title={listGroup.title}
                              handleProps={providedDraggable.dragHandleProps}
                            >
                              {
                                listGroup.listItemIds.map((listItemId: string, j: number) => (
                                  <DraggableListItem
                                    id={listItemId}
                                    index={j}
                                    key={listItemId}
                                    label={listItems[listItemId].label}
                                  />
                                ))
                              }
                            </DroppableListGroup>
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                }
              </div>
            )}
          </Droppable>

        </DragDropContext>
      </div>
    );
  }
}

export default App;
