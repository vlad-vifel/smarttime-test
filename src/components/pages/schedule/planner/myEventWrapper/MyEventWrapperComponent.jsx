import { useContext } from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import { DnDContext } from 'react-big-calendar/lib/addons/dragAndDrop/DnDContext';
import { accessor as getAccessor } from 'react-big-calendar/lib/utils/accessors';
import "./MyEventWrapperComponent.css";


const Directions = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
};


const MyEventWrapperComponent = (props) => {
  const { style, onClick, event, resource, type, continuesPrior, continuesAfter, resizable, className } = props;

  const context = useContext(DnDContext);

  const handleResizeUp = (e) => {
    if (e.button !== 0) {
      return;
    }

    context.draggable.onBeginAction(event, 'resize', 'UP');
  };

  const handleResizeDown = (e) => {
    if (e.button !== 0) {
      return;
    }

    context.draggable.onBeginAction(event, 'resize', 'DOWN');
  };

  const handleResizeLeft = (e) => {
    if (e.button !== 0) {
      return;
    }

    context.draggable.onBeginAction(event, 'resize', 'LEFT');
  };

  const handleResizeRight = (e) => {
    if (e.button !== 0) {
      return;
    }

    context.draggable.onBeginAction(event, 'resize', 'RIGHT');
  };

  const renderAnchor = (direction) => {
    const cls = direction === Directions.up || direction === Directions.down ? 'ns' : 'ew';

    const selectHandler = (direction) => {
      switch (direction) {
        case Directions.up:
          return handleResizeUp;
        case Directions.down:
          return handleResizeDown;
        case Directions.left:
          return handleResizeLeft;
        case Directions.right:
          return handleResizeRight;
        default:
          return null;
      }
    }

    return (
      <div
        className={`rbc-addons-dnd-resize-${cls}-anchor`}
        onMouseDown={selectHandler(direction)}
      >
        {/* можно вставить любую иконку в зависимости от переменной cls */}
        <div className={`rbc-addons-dnd-resize-${cls}-icon`} />
      </div>
    )
  };

  const render = (wrapperProps = {}, anchors) => {
    return (
      <div
        role="button"
        style={{
          height: `${style.height}%`,
          width: `${style.width}%`,
          top: `${style.top}%`,
        }}
        onClick={onClick}
        // onClick={(e) => console.log(props.onClick)}
        // onDoubleClick={(e) => props.onDoubleClick && props.onDoubleClick(e)}
        // onKeyPress={(e) => props.onKeyPress && props.onKeyPress(event, e)}
        {...wrapperProps}
        className={classNames('rbc-event', 'my-event-wrapper', wrapperProps.className)}
      >
        {anchors && anchors.startAnchor}
        <props.components.event {...props} />
        {anchors && anchors.endAnchor}
      </div>
    );
  };

  const handleStartDragging = (e) => {
    if (e.button !== 0) {
      return;
    }

    const isResizeHandle = e.target.getAttribute('class')?.includes('rbc-addons-dnd-resize');
    if (!isResizeHandle) {
      let extendedEvent = { ...event };
      extendedEvent.sourceResource = resource;
      context.draggable.onBeginAction(event, 'move');
    }
  };

  if (className === 'rbc-addons-dnd-drag-preview') {
    const newProps = {
      className,
    }
    return render(newProps);
  }
  
  const { draggable } = context;
  const { draggableAccessor, resizableAccessor } = draggable;

  const isDraggable = draggableAccessor ? !!getAccessor(event, draggableAccessor) : true;

  if (!isDraggable) {
    return render();
  }

  const isResizable = resizable && (resizableAccessor ? !!getAccessor(event, resizableAccessor) : true);

  const newProps = {};
  const anchors = {};

  if (isResizable || isDraggable) {
    newProps.onMouseDown = handleStartDragging;
    newProps.onTouchStart = handleStartDragging;

    if (isResizable) {
      let StartAnchor = null;
      let EndAnchor = null;

      if (type === 'date') {
        StartAnchor = !continuesPrior && renderAnchor(Directions.left);
        EndAnchor = !continuesAfter && renderAnchor(Directions.right);
      } else {
        StartAnchor = !continuesPrior && renderAnchor(Directions.up);
        EndAnchor = !continuesAfter && renderAnchor(Directions.down);
      }

      anchors.startAnchor = StartAnchor;
      anchors.endAnchor = EndAnchor;
    }

    if (draggable.dragAndDropAction.interacting && draggable.dragAndDropAction.event === event) {
      newProps.className = 'rbc-addons-dnd-dragged-event';
    }
  }

  return render(newProps, anchors);
}

MyEventWrapperComponent.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    top: PropTypes.number,
  }),
  onClick: PropTypes.func,

  // прописать тип ивента в отдельном файле и импортировать где-то (например еще в MyEventComponent)
  event: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,

  // остальные типы взяты из react-big-calendar/lib/addons/dragAndDrop
  type: PropTypes.oneOf(['date', 'time']),
  draggable: PropTypes.bool,
  allDay: PropTypes.bool,
  isRow: PropTypes.bool,
  continuesPrior: PropTypes.bool,
  continuesAfter: PropTypes.bool,
  isDragging: PropTypes.bool,
  isResizing: PropTypes.bool,
  resource: PropTypes.number,
  resizable: PropTypes.bool,
}

export default MyEventWrapperComponent;