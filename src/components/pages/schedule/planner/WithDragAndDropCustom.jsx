import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";

import { accessor } from "react-big-calendar/lib/utils/propTypes";
import EventWrapper from "react-big-calendar/lib/addons/dragAndDrop/EventWrapper";
import EventContainerWrapper from "react-big-calendar/lib/addons/dragAndDrop/EventContainerWrapper";
import WeekWrapper from "react-big-calendar/lib/addons/dragAndDrop/WeekWrapper";
import { mergeComponents } from "react-big-calendar/lib/addons/dragAndDrop/common";
import { DnDContext } from "react-big-calendar/lib/addons/dragAndDrop/DnDContext";

export default function withDragAndDrop(Calendar) {
  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      ...Calendar.propTypes,

      onEventDrop: PropTypes.func,
      onEventResize: PropTypes.func,
      onDragStart: PropTypes.func,
      onDragOver: PropTypes.func,
      onDropFromOutside: PropTypes.func,

      dragFromOutsideItem: PropTypes.func,

      draggableAccessor: accessor,
      resizableAccessor: accessor,

      selectable: PropTypes.oneOf([true, false, "ignoreEvents"]),
      resizable: PropTypes.bool
    };

    static defaultProps = {
      ...Calendar.defaultProps,
      draggableAccessor: null,
      resizableAccessor: null,
      resizable: true
    };

    constructor(...args) {
      super(...args);

      this.state = { interacting: false };
    }

    getDnDContextValue() {
      return {
        draggable: {
          onStart: this.handleInteractionStart,
          onEnd: this.handleInteractionEnd,
          onBeginAction: this.handleBeginAction,
          onDropFromOutside: this.props.onDropFromOutside,
          dragFromOutsideItem: this.props.dragFromOutsideItem,
          draggableAccessor: this.props.draggableAccessor,
          resizableAccessor: this.props.resizableAccessor,
          dragAndDropAction: this.state
        }
      };
    }

    defaultOnDragOver = (event) => {
      event.preventDefault();
    };

    handleBeginAction = (event, action, direction) => {
      this.setState({ event, action, direction });
      const { onDragStart } = this.props;
      if (onDragStart) onDragStart({ event, action, direction });
    };

    handleInteractionStart = () => {
      if (this.state.interacting === false)
        this.setState({ interacting: true });
    };

    handleInteractionEnd = (interactionInfo) => {
      const { action, event } = this.state;
      if (!action) return;

      this.setState({
        action: null,
        event: null,
        interacting: false,
        direction: null
      });

      if (interactionInfo == null) return;

      interactionInfo.event = event;
      const { onEventDrop, onEventResize } = this.props;
      if (action === "move" && onEventDrop) onEventDrop(interactionInfo);
      if (action === "resize" && onEventResize) onEventResize(interactionInfo);
    };

    render() {
      const { selectable, elementProps, components, ...props } = this.props;
      const { interacting } = this.state;

      const defaultComponents = mergeComponents(components, {
        eventWrapper: EventWrapper,
        eventContainerWrapper: EventContainerWrapper,
        weekWrapper: WeekWrapper
      });

      delete props.onEventDrop;
      delete props.onEventResize;
      props.selectable = selectable ? "ignoreEvents" : false;

      const elementPropsWithDropFromOutside = this.props.onDropFromOutside
        ? {
            ...elementProps,
            onDragOver: this.props.onDragOver || this.defaultOnDragOver
          }
        : elementProps;

      props.className = clsx(
        props.className,
        "rbc-addons-dnd",
        !!interacting && "rbc-addons-dnd-is-dragging"
      );

      const context = this.getDnDContextValue();
      return (
        <DnDContext.Provider value={context}>
          <Calendar
            {...props}
            elementProps={elementPropsWithDropFromOutside}
            components={defaultComponents}
          />
        </DnDContext.Provider>
      );
    }
  }

  return DragAndDropCalendar;
}
